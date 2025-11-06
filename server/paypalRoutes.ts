import { Router, Request, Response } from 'express';
import paypal from '@paypal/checkout-server-sdk';
import { storage } from './storage';

const router = Router();

// PayPal Environment Setup
function getPayPalEnvironment() {
  const clientId = process.env.PAYPAL_CLIENT_ID || '';
  const clientSecret = process.env.PAYPAL_CLIENT_SECRET || '';

  if (!clientId || !clientSecret) {
    console.warn('⚠️  PayPal credentials not configured. Set PAYPAL_CLIENT_ID and PAYPAL_CLIENT_SECRET in .env');
    return null;
  }

  // Use Sandbox for development, Live for production
  return process.env.NODE_ENV === 'production'
    ? new paypal.core.LiveEnvironment(clientId, clientSecret)
    : new paypal.core.SandboxEnvironment(clientId, clientSecret);
}

function getPayPalClient() {
  const environment = getPayPalEnvironment();
  if (!environment) return null;
  return new paypal.core.PayPalHttpClient(environment);
}

/**
 * Create PayPal Order
 * POST /api/create-paypal-order
 */
router.post('/create-paypal-order', async (req: Request, res: Response) => {
  try {
    const { amount, currency = 'ILS', description, name, email, phone } = req.body;

    if (!amount || amount < 35) {
      return res.status(400).json({ error: 'Amount must be at least 35 ILS' });
    }

    const client = getPayPalClient();
    if (!client) {
      return res.status(500).json({ error: 'PayPal not configured. Please contact administrator.' });
    }

    // Create order request
    const request = new paypal.orders.OrdersCreateRequest();
    request.prefer('return=representation');
    request.requestBody({
      intent: 'CAPTURE',
      purchase_units: [{
        amount: {
          currency_code: currency,
          value: amount.toFixed(2)
        },
        description: description || 'Donation for Uman Raffle'
      }],
      application_context: {
        brand_name: 'Keren Rabbi Israel',
        landing_page: 'NO_PREFERENCE',
        user_action: 'PAY_NOW',
        return_url: `${process.env.BASE_URL || 'http://localhost:5000'}/api/paypal-success`,
        cancel_url: `${process.env.BASE_URL || 'http://localhost:5000'}/raffle?cancelled=true`
      }
    });

    // Execute request
    const order = await client.execute(request);

    // Store pending entry in database
    await storage.createLotteryEntry({
      orderId: order.result.id,
      name,
      email,
      phone,
      amount,
      status: 'pending',
      createdAt: new Date()
    });

    // Get approval URL
    const approvalUrl = order.result.links?.find((link: any) => link.rel === 'approve')?.href;

    res.json({
      orderId: order.result.id,
      approvalUrl,
      status: order.result.status
    });
  } catch (error) {
    console.error('PayPal order creation error:', error);
    res.status(500).json({ error: 'Failed to create PayPal order' });
  }
});

/**
 * Capture PayPal Order (Success callback)
 * GET /api/paypal-success
 */
router.get('/paypal-success', async (req: Request, res: Response) => {
  try {
    const { token } = req.query; // token is the order ID

    if (!token) {
      return res.redirect('/raffle?error=missing_token');
    }

    const client = getPayPalClient();
    if (!client) {
      return res.redirect('/raffle?error=paypal_not_configured');
    }

    // Capture the order
    const request = new paypal.orders.OrdersCaptureRequest(token as string);
    request.requestBody({});

    const capture = await client.execute(request);

    if (capture.result.status === 'COMPLETED') {
      // Update lottery entry status
      await storage.updateLotteryEntryStatus(token as string, 'completed');

      // Calculate number of entries (1 entry per 35 ILS)
      const entry = await storage.getLotteryEntryByOrderId(token as string);
      if (entry) {
        const numEntries = Math.floor(entry.amount / 35);
        await storage.updateLotteryEntryCount(token as string, numEntries);
      }

      // Redirect to success page
      return res.redirect(`/raffle?success=true&orderId=${token}`);
    } else {
      return res.redirect('/raffle?error=payment_failed');
    }
  } catch (error) {
    console.error('PayPal capture error:', error);
    res.redirect('/raffle?error=capture_failed');
  }
});

/**
 * Get Lottery Stats
 * GET /api/lottery-stats
 */
router.get('/lottery-stats', async (req: Request, res: Response) => {
  try {
    const stats = await storage.getLotteryStats();
    res.json(stats);
  } catch (error) {
    console.error('Error fetching lottery stats:', error);
    res.status(500).json({ error: 'Failed to fetch lottery stats' });
  }
});

/**
 * Get User's Lottery Entries
 * GET /api/my-lottery-entries
 */
router.get('/my-lottery-entries', async (req: Request, res: Response) => {
  try {
    const { email } = req.query;

    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    const entries = await storage.getLotteryEntriesByEmail(email as string);
    res.json(entries);
  } catch (error) {
    console.error('Error fetching user entries:', error);
    res.status(500).json({ error: 'Failed to fetch entries' });
  }
});

export default router;
