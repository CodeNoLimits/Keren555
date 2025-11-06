import sharp from 'sharp';
import { readdir, stat, mkdir } from 'fs/promises';
import { join, parse, dirname } from 'path';
import { fileURLToPath } from 'url';
import { existsSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const IMAGES_DIR = join(__dirname, '../attached_assets');
const OUTPUT_DIR = join(__dirname, '../public/images/optimized');
const QUALITY = 85; // WebP quality (0-100)
const MAX_WIDTH = 1920; // Max width for images
const THUMBNAIL_WIDTH = 400; // Width for thumbnails

async function convertToWebP(inputPath, outputPath, width = null, quality = QUALITY) {
  try {
    const image = sharp(inputPath);
    const metadata = await image.metadata();

    let pipeline = image;

    // Resize if width is specified and image is larger
    if (width && metadata.width > width) {
      pipeline = pipeline.resize(width, null, {
        withoutEnlargement: true,
        fit: 'inside'
      });
    }

    // Convert to WebP
    await pipeline
      .webp({ quality })
      .toFile(outputPath);

    const originalStats = await stat(inputPath);
    const newStats = await stat(outputPath);
    const savedPercentage = ((1 - newStats.size / originalStats.size) * 100).toFixed(2);

    return {
      original: (originalStats.size / 1024 / 1024).toFixed(2),
      new: (newStats.size / 1024 / 1024).toFixed(2),
      saved: savedPercentage
    };
  } catch (error) {
    console.error(`Error converting ${inputPath}:`, error.message);
    return null;
  }
}

async function processDirectory(dirPath, outputBase) {
  const items = await readdir(dirPath, { withFileTypes: true });
  const results = {
    processed: 0,
    failed: 0,
    totalOriginalSize: 0,
    totalNewSize: 0
  };

  for (const item of items) {
    const fullPath = join(dirPath, item.name);

    if (item.isDirectory()) {
      const subResults = await processDirectory(fullPath, join(outputBase, item.name));
      results.processed += subResults.processed;
      results.failed += subResults.failed;
      results.totalOriginalSize += subResults.totalOriginalSize;
      results.totalNewSize += subResults.totalNewSize;
      continue;
    }

    // Check if it's an image file
    const ext = parse(item.name).ext.toLowerCase();
    if (!['.jpg', '.jpeg', '.png', '.gif'].includes(ext)) {
      continue;
    }

    // Create output directory if it doesn't exist
    if (!existsSync(outputBase)) {
      await mkdir(outputBase, { recursive: true });
    }

    // Generate output filename
    const baseName = parse(item.name).name;
    const outputPath = join(outputBase, `${baseName}.webp`);
    const thumbnailPath = join(outputBase, `${baseName}-thumb.webp`);

    console.log(`Converting: ${item.name}...`);

    // Convert full-size image
    const stats = await convertToWebP(fullPath, outputPath, MAX_WIDTH);

    if (stats) {
      results.processed++;
      results.totalOriginalSize += parseFloat(stats.original);
      results.totalNewSize += parseFloat(stats.new);

      console.log(`  ✓ Full: ${stats.original}MB → ${stats.new}MB (saved ${stats.saved}%)`);

      // Create thumbnail
      await convertToWebP(fullPath, thumbnailPath, THUMBNAIL_WIDTH, 80);
      console.log(`  ✓ Thumbnail created`);
    } else {
      results.failed++;
    }
  }

  return results;
}

async function main() {
  console.log('🖼️  Starting image conversion to WebP...\n');
  console.log(`Source: ${IMAGES_DIR}`);
  console.log(`Output: ${OUTPUT_DIR}\n`);

  const startTime = Date.now();
  const results = await processDirectory(IMAGES_DIR, OUTPUT_DIR);
  const duration = ((Date.now() - startTime) / 1000).toFixed(2);

  console.log('\n📊 Conversion Summary:');
  console.log(`  ✓ Processed: ${results.processed} images`);
  console.log(`  ✗ Failed: ${results.failed} images`);
  console.log(`  📁 Original size: ${results.totalOriginalSize.toFixed(2)}MB`);
  console.log(`  📁 New size: ${results.totalNewSize.toFixed(2)}MB`);
  console.log(`  💾 Total saved: ${(results.totalOriginalSize - results.totalNewSize).toFixed(2)}MB (${((1 - results.totalNewSize / results.totalOriginalSize) * 100).toFixed(2)}%)`);
  console.log(`  ⏱️  Duration: ${duration}s`);
}

main().catch(console.error);
