import { Header } from '../components/Header';
import { useLanguage } from '../contexts/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';
import { Sparkles, Heart, BookOpen } from 'lucide-react';

export default function RabbisGallery() {
  const { currentLanguage, setLanguage } = useLanguage();
  const isHebrew = currentLanguage === 'he';

  const rabbis = [
    {
      name: 'רבי נחמן מברסלב',
      nameEn: 'Rabbi Nachman of Breslov',
      years: '1772-1810',
      description: 'מייסד חסידות ברסלב, צדיק וחסיד גדול, נין של הבעש״ט',
      descriptionEn: 'Founder of Breslov Hasidism, great Tzaddik and Hasid, great-grandson of the Baal Shem Tov',
      teachings: 'ליקוטי מוהר"ן, סיפורי מעשיות, ליקוטי עצות',
      image: 'https://www.haesh-sheli.co.il/wp-content/uploads/2023/07/6.d110a0.webp',
      icon: '👑'
    },
    {
      name: 'רבי ישראל דב אודסר',
      nameEn: 'Rabbi Israel Dov Odesser',
      years: '1888-1994',
      description: 'הסבא מנחל נובע, מגלה הפתק "נ נח נחמ נחמן מאומן"',
      descriptionEn: 'The Saba from Nachal Novea, discoverer of the note "Na Nach Nachma Nachman Meuman"',
      teachings: 'כתבי סבא ישראל, ישראל סבא, פקודת ה\'',
      image: 'https://www.haesh-sheli.co.il/wp-content/uploads/2025/02/%D7%94%D7%92%D7%A8%D7%9C%D7%AA-%D7%98%D7%99%D7%A1%D7%94-%D7%9C%D7%A8%D7%91%D7%A0%D7%95-%D7%94%D7%A7%D7%93%D7%95%D7%A9-%D7%A7%D7%A8%D7%9F-%D7%A8%D7%91%D7%99-%D7%99%D7%A9%D7%A8%D7%90%D7%9C.webp',
      icon: '✨'
    },
    {
      name: 'רבי נתן מברסלב',
      nameEn: 'Rabbi Nathan of Breslov',
      years: '1780-1844',
      description: 'תלמיד מובהק של רבי נחמן, מחבר ליקוטי הלכות וליקוטי תפילות',
      descriptionEn: 'Primary disciple of Rabbi Nachman, author of Likutei Halachos and Likutei Tefilot',
      teachings: 'ליקוטי הלכות, ליקוטי תפילות, חיי מוהר"ן',
      image: 'https://www.haesh-sheli.co.il/wp-content/uploads/2023/07/3.d110a0.webp',
      icon: '📖'
    },
    {
      name: 'רבי אברהם בן רבי נחמן',
      nameEn: 'Rabbi Abraham son of Rabbi Nachman',
      years: '1792-1878',
      description: 'בנו של רבי נחמן, שמר על מורשת אביו הקדוש',
      descriptionEn: 'Son of Rabbi Nachman, preserved his father\'s holy legacy',
      teachings: 'כתבי רבי נחמן, אוצר היראה',
      image: 'https://www.haesh-sheli.co.il/wp-content/uploads/2023/07/2.d110a0.webp',
      icon: '🕊️'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50" style={{ direction: isHebrew ? 'rtl' : 'ltr' }}>
      <Header currentLanguage={currentLanguage} onLanguageChange={setLanguage} />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-yellow-400 text-blue-900 px-6 py-3 rounded-full text-sm font-bold mb-6">
            <Sparkles className="w-5 h-5" />
            {isHebrew ? 'צדיקי ברסלב' : 'Breslov Tzaddikim'}
          </div>

          <h1 className="text-5xl lg:text-7xl font-bold mb-6">
            {isHebrew ? 'גדולי ברסלב' : 'Great Breslov Masters'}
          </h1>

          <p className="text-xl lg:text-2xl text-blue-100 max-w-3xl mx-auto">
            {isHebrew
              ? 'הכירו את הצדיקים שהאירו את דרך ברסלב לאורך הדורות'
              : 'Meet the Tzaddikim who illuminated the Breslov path throughout the generations'}
          </p>
        </div>
      </section>

      {/* Rabbis Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            {rabbis.map((rabbi, idx) => (
              <Card key={idx} className="overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-300 border-0">
                <div className="relative h-64 overflow-hidden bg-gradient-to-br from-blue-100 to-blue-200">
                  <div className="absolute inset-0 flex items-center justify-center text-8xl opacity-20">
                    {rabbi.icon}
                  </div>
                  {rabbi.image && (
                    <img
                      src={rabbi.image}
                      alt={isHebrew ? rabbi.name : rabbi.nameEn}
                      className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity"
                    />
                  )}
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-4 py-2 rounded-full text-sm font-bold text-blue-900">
                    {rabbi.years}
                  </div>
                </div>

                <CardContent className="p-8">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="text-4xl">{rabbi.icon}</div>
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold text-slate-900 mb-2">
                        {isHebrew ? rabbi.name : rabbi.nameEn}
                      </h2>
                      <p className="text-slate-600 leading-relaxed">
                        {isHebrew ? rabbi.description : rabbi.descriptionEn}
                      </p>
                    </div>
                  </div>

                  <div className="border-t border-slate-200 pt-4 mt-4">
                    <div className="flex items-start gap-2 text-sm">
                      <BookOpen className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="font-semibold text-slate-700">
                          {isHebrew ? 'ספרים עיקריים:' : 'Main Works:'}
                        </span>
                        <span className="text-slate-600 mr-2">{rabbi.teachings}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Heart className="w-16 h-16 mx-auto mb-6 text-yellow-400" />
          <blockquote className="text-2xl lg:text-3xl font-bold mb-4">
            {isHebrew
              ? '"מצוה גדולה להיות בשמחה תמיד"'
              : '"It is a great mitzvah to always be joyful"'}
          </blockquote>
          <p className="text-blue-200 text-lg">
            {isHebrew ? 'רבי נחמן מברסלב' : 'Rabbi Nachman of Breslov'}
          </p>
        </div>
      </section>
    </div>
  );
}
