import { Link } from '@tanstack/react-router';
import { Printer, FileText, Image, BookOpen, Award, Clock, Phone, ArrowRight, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '../contexts/LanguageContext';

export default function HomePage() {
  const { t } = useLanguage();

  const services = [
    {
      icon: Printer,
      titleKey: 'home.service.digital.title',
      descKey: 'home.service.digital.desc',
    },
    {
      icon: FileText,
      titleKey: 'home.service.document.title',
      descKey: 'home.service.document.desc',
    },
    {
      icon: Image,
      titleKey: 'home.service.photo.title',
      descKey: 'home.service.photo.desc',
    },
    {
      icon: BookOpen,
      titleKey: 'home.service.book.title',
      descKey: 'home.service.book.desc',
    },
  ];

  const featureKeys = [
    'home.feature.sameday',
    'home.feature.bulk',
    'home.feature.paper',
    'home.feature.design',
    'home.feature.pricing',
    'home.feature.trusted',
  ];

  const whyPointKeys = [
    'home.why.point1',
    'home.why.point2',
    'home.why.point3',
    'home.why.point4',
  ];

  const stats = [
    { value: '500+', labelKey: 'home.stat.clients' },
    { value: '10K+', labelKey: 'home.stat.orders' },
    { value: '5+', labelKey: 'home.stat.years' },
    { value: '24h', labelKey: 'home.stat.turnaround' },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-brand-dark via-brand-teal to-brand-dark text-white py-20 px-4">
        <div className="container mx-auto text-center max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-brand-amber/20 border border-brand-amber/30 rounded-full px-4 py-1.5 mb-6">
            <Award className="w-4 h-4 text-brand-amber" />
            <span className="text-brand-amber text-sm font-medium">{t('home.badge')}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight">
            {t('home.hero.heading1')} <br />
            <span className="text-brand-amber">{t('home.hero.heading2')}</span>
          </h1>
          <p className="text-white/70 text-lg mb-8 max-w-xl mx-auto">
            {t('home.hero.subheading')}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/quote-request">
              <Button size="lg" className="bg-brand-amber hover:bg-brand-amber-light text-brand-dark font-bold px-8 rounded-full">
                {t('home.hero.cta.quote')}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <a href="tel:+919876543210">
              <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 rounded-full px-8">
                <Phone className="w-4 h-4 mr-2" />
                {t('home.hero.cta.call')}
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Features Strip */}
      <section className="bg-brand-amber py-4 px-4">
        <div className="container mx-auto">
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-2">
            {featureKeys.map((key) => (
              <div key={key} className="flex items-center gap-1.5 text-brand-dark text-sm font-medium">
                <CheckCircle className="w-4 h-4" />
                {t(key)}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 px-4 bg-background">
        <div className="container mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-foreground mb-2">{t('home.services.heading')}</h2>
            <p className="text-muted-foreground max-w-md mx-auto">
              {t('home.services.subheading')}
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service) => (
              <Card key={service.titleKey} className="border-border hover:shadow-md transition-shadow group">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-brand-amber/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-brand-amber/20 transition-colors">
                    <service.icon className="w-6 h-6 text-brand-amber" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{t(service.titleKey)}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{t(service.descKey)}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-4">
                {t('home.why.heading1')} <span className="text-brand-teal">{t('home.why.heading2')}</span>
              </h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                {t('home.why.desc')}
              </p>
              <ul className="space-y-3">
                {whyPointKeys.map((key) => (
                  <li key={key} className="flex items-center gap-3 text-foreground">
                    <div className="w-5 h-5 rounded-full bg-brand-teal/20 flex items-center justify-center shrink-0">
                      <CheckCircle className="w-3.5 h-3.5 text-brand-teal" />
                    </div>
                    <span className="text-sm">{t(key)}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat) => (
                <div key={stat.labelKey} className="bg-card border border-border rounded-2xl p-6 text-center">
                  <div className="text-3xl font-extrabold text-brand-teal mb-1">{stat.value}</div>
                  <div className="text-muted-foreground text-sm">{t(stat.labelKey)}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-brand-dark text-white text-center">
        <div className="container mx-auto max-w-2xl">
          <Clock className="w-10 h-10 text-brand-amber mx-auto mb-4" />
          <h2 className="text-3xl font-bold mb-3">{t('home.cta.heading')}</h2>
          <p className="text-white/60 mb-6">
            {t('home.cta.desc')}
          </p>
          <Link to="/quote-request">
            <Button size="lg" className="bg-brand-amber hover:bg-brand-amber-light text-brand-dark font-bold px-10 rounded-full">
              {t('home.cta.button')}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
