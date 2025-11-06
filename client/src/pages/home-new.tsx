import { useState } from 'react';
import { Link } from 'wouter';
import { Header } from '../components/Header';
import { useLanguage } from '../contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import {
  BookOpen,
  Heart,
  Users,
  Plane,
  ShoppingBag,
  Sparkles,
  ArrowRight,
  Gift,
  Star
} from 'lucide-react';

export default function HomeNew() {
  const { currentLanguage, setLanguage } = useLanguage();
  const isHebrew = currentLanguage === 'he';

  // Featured books for magazine-style grid
  const featuredBooks = [
    {
      title: 'ליקוטי מוהרן',
      titleEn: 'Likutei Moharan',
      image: '/images/optimized/ליקוטי מוהרן 1_1757275910545.webp',
      description: 'תורות רבינו הקדוש',
      price: '₪ 120'
    },
    {
      title: 'ליקוטי תפילות',
      titleEn: 'Likutei Tefilot',
      image: '/images/optimized/ליקוטי תפילות 1_1757275910545.webp',
      description: 'תפילות מהלב',
      price: '₪ 95'
    },
    {
      title: 'ליקוטי הלכות',
      titleEn: 'Likutei Halachos',
      image: '/images/optimized/ליקוטי הלכות 1_1757280778288.webp',
      description: 'הלכה ואמונה',
      price: '₪ 150'
    },
    {
      title: 'סיפורי מעשיות',
      titleEn: 'Tales of Ancient Times',
      image: '/images/optimized/מעשיות קטן_1757281252874.webp',
      description: 'סיפורים מופלאים',
      price: '₪ 85'
    }
  ];

  return (
    <div className="min-h-screen bg-white" style={{ direction: isHebrew ? 'rtl' : 'ltr' }}>
      {/* Top Bar */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-2 px-4 text-center text-sm font-medium">
        <div className="flex items-center justify-center gap-2">
          <Sparkles className="w-4 h-4" />
          <span>{isHebrew ? 'משלוח חינם מעל 299 ₪ | הגרלה לאומן לכל רכישה' : 'Free shipping over 299 ₪ | Uman raffle with every purchase'}</span>
          <Sparkles className="w-4 h-4" />
        </div>
      </div>

      <Header currentLanguage={currentLanguage} onLanguageChange={setLanguage} />

      {/* Hero Section - Magazine Style */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-white">
        <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="inline-block">
                <span className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold tracking-wide">
                  {isHebrew ? '🎯 המקום המוביל לספרי ברסלב' : '🎯 Leading Source for Breslov Books'}
                </span>
              </div>

              <h1 className="text-5xl lg:text-7xl font-bold text-slate-900 leading-tight">
                {isHebrew ? (
                  <>
                    ספרי <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800">רבי נחמן</span>
                    <br />
                    מברסלב זצ״ל
                  </>
                ) : (
                  <>
                    Books of <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800">Rabbi Nachman</span>
                    <br />
                    of Breslov
                  </>
                )}
              </h1>

              <p className="text-xl text-slate-600 leading-relaxed max-w-lg">
                {isHebrew
                  ? 'המקור המקורי לתורות רבינו הקדוש. אוסף מקיף של ספרים, שיעורים וחומרים רוחניים להארת הנפש והלב.'
                  : 'The authentic source for the teachings of our holy master. Comprehensive collection of books, lessons and spiritual materials to illuminate the soul and heart.'}
              </p>

              <div className="flex flex-wrap gap-4">
                <Link href="/store">
                  <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-8 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all">
                    {isHebrew ? 'לחנות המקוונת' : 'Visit Store'}
                    <ArrowRight className={`w-5 h-5 ${isHebrew ? 'mr-2' : 'ml-2'}`} />
                  </Button>
                </Link>

                <Link href="/raffle">
                  <Button size="lg" variant="outline" className="text-lg px-8 py-6 rounded-xl border-2 border-blue-600 text-blue-600 hover:bg-blue-50">
                    <Plane className={`w-5 h-5 ${isHebrew ? 'ml-2' : 'mr-2'}`} />
                    {isHebrew ? 'הגרלת אומן' : 'Uman Raffle'}
                  </Button>
                </Link>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 pt-8 border-t border-slate-200">
                <div>
                  <div className="text-3xl font-bold text-blue-600">200+</div>
                  <div className="text-sm text-slate-600">{isHebrew ? 'ספרים' : 'Books'}</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-600">10K+</div>
                  <div className="text-sm text-slate-600">{isHebrew ? 'לקוחות' : 'Customers'}</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-600">24/7</div>
                  <div className="text-sm text-slate-600">{isHebrew ? 'זמינות' : 'Available'}</div>
                </div>
              </div>
            </div>

            {/* Right Image Grid */}
            <div className="grid grid-cols-2 gap-4">
              {featuredBooks.slice(0, 4).map((book, idx) => (
                <div key={idx} className={`group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 ${idx === 0 ? 'col-span-2 row-span-2' : ''}`}>
                  <img
                    src={book.image}
                    alt={isHebrew ? book.title : book.titleEn}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-xl font-bold mb-1">{isHebrew ? book.title : book.titleEn}</h3>
                    <p className="text-sm text-white/80">{book.description}</p>
                    <div className="mt-2 text-lg font-bold text-blue-300">{book.price}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Uman Raffle Section - Highlighted */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 bg-yellow-400 text-blue-900 px-4 py-2 rounded-full text-sm font-bold">
                <Gift className="w-4 h-4" />
                {isHebrew ? 'הזדמנות מיוחדת' : 'Special Opportunity'}
              </div>

              <h2 className="text-4xl lg:text-5xl font-bold leading-tight">
                {isHebrew ? 'זכו בטיסה לאומן!' : 'Win a Flight to Uman!'}
              </h2>

              <p className="text-xl text-blue-100 leading-relaxed">
                {isHebrew
                  ? 'כל רכישה מעל 35 ₪ מזכה אותך באופן אוטומטי בהגרלה הגדולה לכרטיס טיסה לציונו הקדוש של רבי נחמן באומן!'
                  : 'Every purchase over 35 ₪ automatically enters you in the grand raffle for a flight ticket to the holy tomb of Rabbi Nachman in Uman!'}
              </p>

              {/* How it works */}
              <div className="grid sm:grid-cols-3 gap-4 pt-6">
                {[
                  { icon: ShoppingBag, text: isHebrew ? 'רכישה באתר' : 'Shop on site' },
                  { icon: Star, text: isHebrew ? 'כניסה אוטומטית' : 'Auto entry' },
                  { icon: Plane, text: isHebrew ? 'זכייה בטיסה!' : 'Win flight!' }
                ].map((step, idx) => (
                  <div key={idx} className="flex flex-col items-center text-center space-y-2">
                    <div className="w-16 h-16 bg-white/10 backdrop-blur rounded-full flex items-center justify-center">
                      <step.icon className="w-8 h-8 text-yellow-400" />
                    </div>
                    <p className="text-sm font-medium">{step.text}</p>
                  </div>
                ))}
              </div>

              <Link href="/raffle">
                <Button size="lg" className="bg-yellow-400 hover:bg-yellow-500 text-blue-900 text-lg px-8 py-6 rounded-xl font-bold shadow-xl hover:shadow-2xl transition-all">
                  {isHebrew ? 'פרטים מלאים על ההגרלה' : 'Full Raffle Details'}
                  <ArrowRight className={`w-5 h-5 ${isHebrew ? 'mr-2' : 'ml-2'}`} />
                </Button>
              </Link>
            </div>

            <div className="relative">
              <img
                src="https://www.haesh-sheli.co.il/wp-content/uploads/2025/02/%D7%94%D7%92%D7%A8%D7%9C%D7%AA-%D7%98%D7%99%D7%A1%D7%94-%D7%9C%D7%A8%D7%91%D7%A0%D7%95-%D7%94%D7%A7%D7%93%D7%95%D7%A9-%D7%A7%D7%A8%D7%9F-%D7%A8%D7%91%D7%99-%D7%99%D7%A9%D7%A8%D7%90%D7%9C.webp"
                alt="Uman Raffle"
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Books Grid - Magazine Style */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
              {isHebrew ? 'הספרים המובילים' : 'Featured Books'}
            </h2>
            <p className="text-xl text-slate-600">
              {isHebrew ? 'אוסף נבחר מספרי רבינו הקדוש' : 'Curated collection of our master\'s books'}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredBooks.map((book, idx) => (
              <Link key={idx} href="/store">
                <div className="group cursor-pointer">
                  <div className="relative overflow-hidden rounded-2xl mb-4 shadow-lg hover:shadow-2xl transition-all duration-300">
                    <img
                      src={book.image}
                      alt={isHebrew ? book.title : book.titleEn}
                      className="w-full aspect-[3/4] object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-1 group-hover:text-blue-600 transition-colors">
                    {isHebrew ? book.title : book.titleEn}
                  </h3>
                  <p className="text-sm text-slate-600 mb-2">{book.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-blue-600">{book.price}</span>
                    <ArrowRight className="w-5 h-5 text-blue-600 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/store">
              <Button size="lg" variant="outline" className="text-lg px-8 py-6 rounded-xl border-2 border-blue-600 text-blue-600 hover:bg-blue-50">
                {isHebrew ? 'צפייה בכל הספרים' : 'View All Books'}
                <ArrowRight className={`w-5 h-5 ${isHebrew ? 'mr-2' : 'ml-2'}`} />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                icon: BookOpen,
                title: isHebrew ? 'מבחר ענק' : 'Huge Selection',
                description: isHebrew ? 'מעל 200 ספרים' : 'Over 200 books'
              },
              {
                icon: Heart,
                title: isHebrew ? 'משלוח חינם' : 'Free Shipping',
                description: isHebrew ? 'מעל 299 ₪' : 'Over 299 ₪'
              },
              {
                icon: Users,
                title: isHebrew ? 'שירות מעולה' : 'Great Service',
                description: isHebrew ? 'תמיכה 24/7' : '24/7 Support'
              },
              {
                icon: Sparkles,
                title: isHebrew ? 'איכות גבוהה' : 'High Quality',
                description: isHebrew ? 'הדפסה מעולה' : 'Excellent Print'
              }
            ].map((feature, idx) => (
              <div key={idx} className="text-center p-6 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{feature.title}</h3>
                <p className="text-sm text-slate-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <h2 className="text-4xl lg:text-5xl font-bold">
            {isHebrew ? 'הצטרפו למשפחת ברסלב' : 'Join the Breslov Family'}
          </h2>
          <p className="text-xl text-blue-100">
            {isHebrew
              ? 'קבלו עדכונים על ספרים חדשים, שיעורים והגרלות מיוחדות'
              : 'Get updates on new books, lessons and special raffles'}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/join">
              <Button size="lg" className="bg-white hover:bg-slate-100 text-blue-900 text-lg px-8 py-6 rounded-xl font-bold">
                {isHebrew ? 'הצטרפו עכשיו' : 'Join Now'}
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white/10 text-lg px-8 py-6 rounded-xl">
                {isHebrew ? 'צרו קשר' : 'Contact Us'}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-slate-400">
            {isHebrew
              ? 'כל הזכויות שמורות © 2025 קרן רבי ישראל דב אודסר זצ״ל'
              : '© 2025 Rabbi Israel Dov Odesser Foundation. All rights reserved.'}
          </p>
        </div>
      </footer>
    </div>
  );
}
