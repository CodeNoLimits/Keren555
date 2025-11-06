import { useState } from 'react';
import { Link } from 'wouter';
import { Header } from '../components/Header';
import { useLanguage } from '../contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Plane,
  Gift,
  Heart,
  Check,
  Sparkles,
  Users,
  Trophy,
  ArrowRight,
  CreditCard
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function RafflePage() {
  const { currentLanguage, setLanguage } = useLanguage();
  const { toast } = useToast();
  const isHebrew = currentLanguage === 'he';

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    amount: '35'
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Create PayPal order
      const response = await fetch('/api/create-paypal-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: parseFloat(formData.amount),
          currency: 'ILS',
          description: `Donation for Uman Raffle - ${formData.name}`,
          ...formData
        })
      });

      const data = await response.json();

      if (data.approvalUrl) {
        // Redirect to PayPal
        window.location.href = data.approvalUrl;
      } else {
        throw new Error('Failed to create PayPal order');
      }
    } catch (error) {
      console.error('Payment error:', error);
      toast({
        title: isHebrew ? 'שגיאה' : 'Error',
        description: isHebrew ? 'אירעה שגיאה בתשלום. אנא נסו שוב.' : 'Payment error occurred. Please try again.',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const donationAmounts = [35, 50, 100, 180, 360, 500];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50" style={{ direction: isHebrew ? 'rtl' : 'ltr' }}>
      <Header currentLanguage={currentLanguage} onLanguageChange={setLanguage} />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 text-white py-20">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDEzNEgxNHYxNEgzNnYtMTR6bS0yLTJoMnYtMmgtMnYyem0yIDR2Mmgydi0yaC0yem0wIDR2Mmgydi0yaC0yem0yIDJoMnYtMmgtMnYyem0wIDRoMnYtMmgtMnYyem0tMiAwaC0ydjJoMnYtMnptLTQgMGgtMnYyaDJ2LTJ6bS00IDBoLTJ2Mmgydi0yem0tNCAwSDE0djJoMnYtMnptLTItMmgydi0yaC0ydjJ6bTAtNGgydi0yaC0ydjJ6bS0yLTJoLTJ2Mmgydi0yem0wLTRoLTJ2Mmgydi0yem0yLTJoMnYtMmgtMnYyem00IDBoMnYtMmgtMnYyem00IDBoMnYtMmgtMnYyem00IDBoMnYtMmgtMnYyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center space-y-6">
            <div className="inline-flex items-center gap-2 bg-yellow-400 text-blue-900 px-6 py-3 rounded-full text-sm font-bold shadow-lg">
              <Gift className="w-5 h-5" />
              {isHebrew ? 'הגרלה מיוחדת' : 'Special Raffle'}
            </div>

            <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
              {isHebrew ? 'זכו בטיסה לאומן!' : 'Win a Flight to Uman!'}
            </h1>

            <p className="text-xl lg:text-2xl text-blue-100 max-w-3xl mx-auto">
              {isHebrew
                ? 'תרמו מעל 35 ₪ והיכנסו אוטומטית להגרלה הגדולה על כרטיס טיסה לציונו הקדוש של רבי נחמן באומן'
                : 'Donate over 35 ₪ and automatically enter the grand raffle for a flight ticket to the holy tomb of Rabbi Nachman in Uman'}
            </p>

            <div className="flex items-center justify-center gap-8 pt-6">
              {[
                { icon: Users, text: isHebrew ? '1,000+ משתתפים' : '1,000+ participants' },
                { icon: Trophy, text: isHebrew ? '1 זוכה מאושר' : '1 lucky winner' },
                { icon: Plane, text: isHebrew ? 'טיסה הלוך-חזור' : 'Round-trip flight' }
              ].map((stat, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <stat.icon className="w-6 h-6 text-yellow-400" />
                  <span className="text-sm font-medium">{stat.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left: Form */}
            <div>
              <Card className="shadow-2xl border-0">
                <CardHeader className="bg-gradient-to-br from-blue-50 to-white">
                  <CardTitle className="text-2xl">
                    {isHebrew ? 'הצטרפו להגרלה עכשיו' : 'Join the Raffle Now'}
                  </CardTitle>
                  <CardDescription>
                    {isHebrew
                      ? 'מלאו את הפרטים ובצעו תרומה מאובטחת דרך PayPal'
                      : 'Fill in your details and make a secure donation via PayPal'}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Name */}
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        {isHebrew ? 'שם מלא *' : 'Full Name *'}
                      </label>
                      <Input
                        required
                        type="text"
                        placeholder={isHebrew ? 'הכניסו את שמכם המלא' : 'Enter your full name'}
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="text-lg"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        {isHebrew ? 'דוא״ל *' : 'Email *'}
                      </label>
                      <Input
                        required
                        type="email"
                        placeholder={isHebrew ? 'your@email.com' : 'your@email.com'}
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="text-lg"
                      />
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        {isHebrew ? 'טלפון *' : 'Phone *'}
                      </label>
                      <Input
                        required
                        type="tel"
                        placeholder={isHebrew ? '050-1234567' : '050-1234567'}
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="text-lg"
                      />
                    </div>

                    {/* Amount */}
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-3">
                        {isHebrew ? 'סכום תרומה (₪) *' : 'Donation Amount (₪) *'}
                      </label>
                      <div className="grid grid-cols-3 gap-3 mb-3">
                        {donationAmounts.map((amount) => (
                          <Button
                            key={amount}
                            type="button"
                            variant={formData.amount === amount.toString() ? 'default' : 'outline'}
                            onClick={() => setFormData({ ...formData, amount: amount.toString() })}
                            className="font-bold"
                          >
                            ₪ {amount}
                          </Button>
                        ))}
                      </div>
                      <Input
                        required
                        type="number"
                        min="35"
                        placeholder={isHebrew ? 'או הכניסו סכום אחר' : 'Or enter custom amount'}
                        value={formData.amount}
                        onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                        className="text-lg"
                      />
                    </div>

                    {/* Submit */}
                    <Button
                      type="submit"
                      disabled={loading || parseFloat(formData.amount) < 35}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white text-lg py-6 rounded-xl font-bold shadow-lg"
                    >
                      {loading ? (
                        <span>{isHebrew ? 'מעבד...' : 'Processing...'}</span>
                      ) : (
                        <>
                          <CreditCard className={`w-5 h-5 ${isHebrew ? 'ml-2' : 'mr-2'}`} />
                          {isHebrew ? `תרמו ₪${formData.amount} והצטרפו להגרלה` : `Donate ₪${formData.amount} & Join Raffle`}
                        </>
                      )}
                    </Button>

                    <p className="text-xs text-center text-slate-500">
                      {isHebrew
                        ? '🔒 תשלום מאובטח דרך PayPal. כל התרומות מגיעות ישירות לקרן רבי ישראל.'
                        : '🔒 Secure payment via PayPal. All donations go directly to Rabbi Israel Foundation.'}
                    </p>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Right: Info */}
            <div className="space-y-8">
              {/* How it works */}
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle>{isHebrew ? 'איך זה עובד?' : 'How It Works?'}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      {
                        icon: Heart,
                        title: isHebrew ? 'תרמו מעל 35 ₪' : 'Donate over 35 ₪',
                        description: isHebrew ? 'כל תרומה מעל 35 ₪ מזכה בכניסה להגרלה' : 'Any donation over 35 ₪ qualifies for entry'
                      },
                      {
                        icon: Check,
                        title: isHebrew ? 'כניסה אוטומטית' : 'Automatic Entry',
                        description: isHebrew ? 'נרשמים אוטומטית להגרלה לאחר אישור התשלום' : 'Automatically registered after payment confirmation'
                      },
                      {
                        icon: Plane,
                        title: isHebrew ? 'זכייה בטיסה!' : 'Win the Flight!',
                        description: isHebrew ? 'המזכה יקבל כרטיס טיסה הלוך-חזור לאומן' : 'Winner receives round-trip flight ticket to Uman'
                      }
                    ].map((step, idx) => (
                      <div key={idx} className="flex gap-4">
                        <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                          <step.icon className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-bold text-slate-900 mb-1">{step.title}</h3>
                          <p className="text-sm text-slate-600">{step.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Prize Details */}
              <Card className="shadow-lg bg-gradient-to-br from-yellow-50 to-orange-50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Trophy className="w-6 h-6 text-yellow-600" />
                    {isHebrew ? 'פרטי הפרס' : 'Prize Details'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {[
                      isHebrew ? 'כרטיס טיסה הלוך-חזור לאומן' : 'Round-trip flight ticket to Uman',
                      isHebrew ? 'מועד לבחירת המזכה' : 'Date chosen by winner',
                      isHebrew ? 'תוקף שנה מיום הזכייה' : 'Valid for one year from winning date',
                      isHebrew ? 'ניתן להעברה למשפחה/חברים' : 'Transferable to family/friends'
                    ].map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span className="text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* CTA Card */}
              <Card className="shadow-lg bg-gradient-to-br from-blue-600 to-blue-700 text-white">
                <CardContent className="pt-6">
                  <div className="text-center space-y-4">
                    <Sparkles className="w-12 h-12 mx-auto text-yellow-400" />
                    <h3 className="text-2xl font-bold">
                      {isHebrew ? 'רוצים לתרום יותר?' : 'Want to Donate More?'}
                    </h3>
                    <p className="text-blue-100">
                      {isHebrew
                        ? 'כל תרומה נוספת של 35 ₪ מזכה בכניסה נוספת להגרלה!'
                        : 'Each additional 35 ₪ donation earns another raffle entry!'}
                    </p>
                    <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-blue-50">
                      {isHebrew ? 'קראו עוד' : 'Learn More'}
                      <ArrowRight className={`w-5 h-5 ${isHebrew ? 'mr-2' : 'ml-2'}`} />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-slate-50 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
          <h2 className="text-3xl font-bold text-slate-900">
            {isHebrew ? 'רוצים לקנות ספרים במקום?' : 'Want to Buy Books Instead?'}
          </h2>
          <p className="text-lg text-slate-600">
            {isHebrew
              ? 'כל רכישה בחנות שלנו מזכה גם היא בכניסה אוטומטית להגרלה!'
              : 'Every purchase in our store also automatically enters you in the raffle!'}
          </p>
          <Link href="/store">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-8 py-6 rounded-xl">
              {isHebrew ? 'לחנות המקוונת' : 'Visit Store'}
              <ArrowRight className={`w-5 h-5 ${isHebrew ? 'mr-2' : 'ml-2'}`} />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
