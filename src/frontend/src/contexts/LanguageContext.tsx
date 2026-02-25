import React, { createContext, useContext, useState, useCallback } from 'react';

export type Language = 'en' | 'te';

interface LanguageContextValue {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

// Translations object
const translations: Record<Language, Record<string, string>> = {
  en: {
    // Header
    'nav.home': 'Home',
    'nav.quote': 'Request Quote',

    // Footer
    'footer.tagline': "Your trusted partner for all printing needs in Nellore. Quality prints, fast delivery.",
    'footer.quickLinks': 'Quick Links',
    'footer.contact': 'Contact',
    'footer.address': 'Nellore, Andhra Pradesh, India',
    'footer.rights': 'All rights reserved.',
    'footer.admin': 'Admin',

    // WhatsApp
    'whatsapp.tooltip': 'Chat with us on WhatsApp!',

    // HomePage - Hero
    'home.badge': "Nellore's #1 Print Shop",
    'home.hero.heading1': 'Professional Printing',
    'home.hero.heading2': 'Made Simple',
    'home.hero.subheading': 'From business cards to large banners — we deliver crisp, vibrant prints on time, every time.',
    'home.hero.cta.quote': 'Get a Quote',
    'home.hero.cta.call': 'Call Us Now',

    // HomePage - Features
    'home.feature.sameday': 'Same-day printing available',
    'home.feature.bulk': 'Bulk order discounts',
    'home.feature.paper': 'Premium quality paper',
    'home.feature.design': 'Expert design assistance',
    'home.feature.pricing': 'Competitive pricing',
    'home.feature.trusted': 'Trusted by 500+ businesses',

    // HomePage - Services
    'home.services.heading': 'Our Services',
    'home.services.subheading': 'Everything you need for professional printing, all under one roof.',
    'home.service.digital.title': 'Digital Printing',
    'home.service.digital.desc': 'High-quality digital prints for flyers, brochures, posters, and more.',
    'home.service.document.title': 'Document Printing',
    'home.service.document.desc': 'Fast and affordable document printing with binding options.',
    'home.service.photo.title': 'Photo Printing',
    'home.service.photo.desc': 'Vivid photo prints in all sizes with premium paper options.',
    'home.service.book.title': 'Book & Catalog Printing',
    'home.service.book.desc': 'Professional book printing with softcover and hardcover options.',

    // HomePage - Why Choose Us
    'home.why.heading1': 'Why Choose',
    'home.why.heading2': 'Nellore Print Hub?',
    'home.why.desc': 'We combine cutting-edge printing technology with years of expertise to deliver exceptional results for every project, big or small.',
    'home.why.point1': 'State-of-the-art printing equipment',
    'home.why.point2': 'Experienced and friendly staff',
    'home.why.point3': 'Quick turnaround times',
    'home.why.point4': 'Affordable pricing for all budgets',
    'home.stat.clients': 'Happy Clients',
    'home.stat.orders': 'Orders Completed',
    'home.stat.years': 'Years Experience',
    'home.stat.turnaround': 'Fast Turnaround',

    // HomePage - CTA
    'home.cta.heading': 'Ready to Print?',
    'home.cta.desc': "Contact us today and get your order started. We're here to help!",
    'home.cta.button': 'Contact Us Now',

    // ContactPage
    'contact.badge': 'Get in Touch',
    'contact.heading': 'Contact Us',
    'contact.subheading': "Have a printing project in mind? Send us a message and we'll get back to you shortly.",
    'contact.info.heading': 'Contact Information',
    'contact.info.address.label': 'Address',
    'contact.info.address.value': 'Nellore, Andhra Pradesh, India',
    'contact.info.phone.label': 'Phone',
    'contact.info.email.label': 'Email',
    'contact.whatsapp': 'Chat on WhatsApp',
    'contact.form.heading': 'Send us a Message',
    'contact.form.subheading': "Fill in the form below and we'll respond within 24 hours.",
    'contact.form.name.label': 'Full Name',
    'contact.form.name.placeholder': 'Your full name',
    'contact.form.phone.label': 'Phone Number',
    'contact.form.phone.placeholder': '+91 XXXXX XXXXX',
    'contact.form.message.label': 'Message',
    'contact.form.message.placeholder': 'Tell us about your printing requirements...',
    'contact.form.submit': 'Send Message',
    'contact.form.sending': 'Sending...',
    'contact.form.success': "Thank you! Your message has been sent. We'll get back to you soon.",
    'contact.form.error': 'Something went wrong. Please try again or contact us directly.',

    // Quote Request Page
    'quote.request.badge': 'Request a Quote',
    'quote.request.heading': 'Request a Quote',
    'quote.request.subheading': 'Fill in the details and we will provide you with a customized quotation.',
    'quote.request.info.heading': 'Contact Information',
    'quote.request.info.address.label': 'Address',
    'quote.request.info.address.value': 'Nellore, Andhra Pradesh, India',
    'quote.request.info.phone.label': 'Phone',
    'quote.request.info.email.label': 'Email',
    'quote.request.whatsapp': 'Chat on WhatsApp',
    'quote.request.form.heading': 'Quote Request Form',
    'quote.request.form.subheading': 'Provide your project details and we will send you a quotation.',
    'quote.request.form.name.label': 'Full Name',
    'quote.request.form.name.placeholder': 'Your full name',
    'quote.request.form.email.label': 'Email Address',
    'quote.request.form.email.placeholder': 'your@email.com',
    'quote.request.form.phone.label': 'Phone Number',
    'quote.request.form.phone.placeholder': '+91 XXXXX XXXXX',
    'quote.request.form.services.label': 'Services Needed',
    'quote.request.form.services.placeholder': 'Describe what you need printed...',
    'quote.request.form.deadline.label': 'Deadline Date',
    'quote.request.form.message.label': 'Additional Information',
    'quote.request.form.message.placeholder': 'Any special requirements...',
    'quote.request.form.submit': 'Submit Request',
    'quote.request.form.sending': 'Submitting...',
    'quote.request.form.success': 'Quote request submitted successfully! Your request ID:',
    'quote.request.form.copied': 'Request ID copied!',
    'quote.request.form.error': 'Something went wrong. Please try again.',

    // AdminPage
    'admin.panel.title': 'Admin Panel',
    'admin.panel.signin.desc': 'Sign in with your identity to access the admin dashboard.',
    'admin.panel.signin.button': 'Sign In',
    'admin.panel.signing.in': 'Signing in...',
    'admin.panel.access.denied.title': 'Access Denied',
    'admin.panel.access.denied.desc': "You don't have admin privileges to access this panel.",
    'admin.panel.signout': 'Sign Out',
    'admin.dashboard.title': 'Admin Dashboard',
    'admin.dashboard.welcome': 'Welcome back,',
    'admin.stats.inquiries': 'Total Inquiries',
    'admin.stats.admin': 'Admin',
    'admin.stats.status': 'Status',
    'admin.stats.active': 'Active',
    'admin.table.title': 'Customer Inquiries',
    'admin.table.desc': 'All contact form submissions from your website.',
    'admin.table.refresh': 'Refresh',
    'admin.table.col.id': '#',
    'admin.table.col.name': 'Name',
    'admin.table.col.phone': 'Phone',
    'admin.table.col.message': 'Message',
    'admin.table.empty': 'No inquiries yet.',
    'admin.table.error': 'Failed to load messages.',
    'admin.profile.title': 'Set Up Your Profile',
    'admin.profile.desc': 'Enter your name to continue to the admin panel.',
    'admin.profile.name.label': 'Your Name',
    'admin.profile.name.placeholder': 'Enter your name',
    'admin.profile.save': 'Continue',
    'admin.profile.saving': 'Saving...',
  },
  te: {
    // Header
    'nav.home': 'హోమ్',
    'nav.quote': 'కోటేషన్ అభ్యర్థన',

    // Footer
    'footer.tagline': 'నెల్లూరులో మీ అన్ని ప్రింటింగ్ అవసరాలకు విశ్వసనీయ భాగస్వామి. నాణ్యమైన ప్రింట్లు, వేగవంతమైన డెలివరీ.',
    'footer.quickLinks': 'త్వరిత లింకులు',
    'footer.contact': 'సంప్రదింపు',
    'footer.address': 'నెల్లూరు, ఆంధ్రప్రదేశ్, భారతదేశం',
    'footer.rights': 'అన్ని హక్కులు రిజర్వ్ చేయబడ్డాయి.',
    'footer.admin': 'అడ్మిన్',

    // WhatsApp
    'whatsapp.tooltip': 'వాట్సాప్‌లో మాతో చాట్ చేయండి!',

    // HomePage - Hero
    'home.badge': 'నెల్లూరు నంబర్ 1 ప్రింట్ షాప్',
    'home.hero.heading1': 'వృత్తిపరమైన ప్రింటింగ్',
    'home.hero.heading2': 'సులభంగా చేయబడింది',
    'home.hero.subheading': 'బిజినెస్ కార్డుల నుండి పెద్ద బ్యానర్ల వరకు — మేము ప్రతిసారీ సమయానికి స్పష్టమైన, రంగురంగుల ప్రింట్లు అందిస్తాము.',
    'home.hero.cta.quote': 'కోటేషన్ పొందండి',
    'home.hero.cta.call': 'ఇప్పుడు కాల్ చేయండి',

    // HomePage - Features
    'home.feature.sameday': 'అదే రోజు ప్రింటింగ్ అందుబాటులో ఉంది',
    'home.feature.bulk': 'బల్క్ ఆర్డర్ తగ్గింపులు',
    'home.feature.paper': 'ప్రీమియం నాణ్యత కాగితం',
    'home.feature.design': 'నిపుణుల డిజైన్ సహాయం',
    'home.feature.pricing': 'పోటీ ధరలు',
    'home.feature.trusted': '500+ వ్యాపారాలు నమ్మిన సేవ',

    // HomePage - Services
    'home.services.heading': 'మా సేవలు',
    'home.services.subheading': 'వృత్తిపరమైన ప్రింటింగ్ కోసం మీకు అవసరమైన అన్నీ ఒకే చోట.',
    'home.service.digital.title': 'డిజిటల్ ప్రింటింగ్',
    'home.service.digital.desc': 'ఫ్లయర్లు, బ్రోచర్లు, పోస్టర్లు మరియు మరిన్నింటికి అధిక నాణ్యత గల డిజిటల్ ప్రింట్లు.',
    'home.service.document.title': 'డాక్యుమెంట్ ప్రింటింగ్',
    'home.service.document.desc': 'బైండింగ్ ఆప్షన్లతో వేగవంతమైన మరియు సరసమైన డాక్యుమెంట్ ప్రింటింగ్.',
    'home.service.photo.title': 'ఫోటో ప్రింటింగ్',
    'home.service.photo.desc': 'ప్రీమియం పేపర్ ఆప్షన్లతో అన్ని సైజులలో స్పష్టమైన ఫోటో ప్రింట్లు.',
    'home.service.book.title': 'పుస్తకం & కేటలాగ్ ప్రింటింగ్',
    'home.service.book.desc': 'సాఫ్ట్‌కవర్ మరియు హార్డ్‌కవర్ ఆప్షన్లతో వృత్తిపరమైన పుస్తక ప్రింటింగ్.',

    // HomePage - Why Choose Us
    'home.why.heading1': 'ఎందుకు ఎంచుకోవాలి',
    'home.why.heading2': 'నెల్లూరు ప్రింట్ హబ్?',
    'home.why.desc': 'మేము అత్యాధునిక ప్రింటింగ్ సాంకేతికతను సంవత్సరాల అనుభవంతో కలిపి ప్రతి ప్రాజెక్ట్‌కు అసాధారణ ఫలితాలు అందిస్తాము.',
    'home.why.point1': 'అత్యాధునిక ప్రింటింగ్ పరికరాలు',
    'home.why.point2': 'అనుభవజ్ఞులైన మరియు స్నేహపూర్వక సిబ్బంది',
    'home.why.point3': 'వేగవంతమైన పూర్తి సమయాలు',
    'home.why.point4': 'అన్ని బడ్జెట్లకు సరసమైన ధరలు',
    'home.stat.clients': 'సంతోషకరమైన క్లయింట్లు',
    'home.stat.orders': 'పూర్తయిన ఆర్డర్లు',
    'home.stat.years': 'సంవత్సరాల అనుభవం',
    'home.stat.turnaround': 'వేగవంతమైన డెలివరీ',

    // HomePage - CTA
    'home.cta.heading': 'ప్రింట్ చేయడానికి సిద్ధంగా ఉన్నారా?',
    'home.cta.desc': 'ఈరోజే మాకు సంప్రదించండి మరియు మీ ఆర్డర్ ప్రారంభించండి. మేము సహాయం చేయడానికి ఇక్కడ ఉన్నాము!',
    'home.cta.button': 'ఇప్పుడు సంప్రదించండి',

    // ContactPage
    'contact.badge': 'సంప్రదించండి',
    'contact.heading': 'సంప్రదించండి',
    'contact.subheading': 'ప్రింటింగ్ ప్రాజెక్ట్ మనసులో ఉందా? మాకు సందేశం పంపండి, మేము త్వరలో మీకు తిరిగి వస్తాము.',
    'contact.info.heading': 'సంప్రదింపు సమాచారం',
    'contact.info.address.label': 'చిరునామా',
    'contact.info.address.value': 'నెల్లూరు, ఆంధ్రప్రదేశ్, భారతదేశం',
    'contact.info.phone.label': 'ఫోన్',
    'contact.info.email.label': 'ఇమెయిల్',
    'contact.whatsapp': 'వాట్సాప్‌లో చాట్ చేయండి',
    'contact.form.heading': 'మాకు సందేశం పంపండి',
    'contact.form.subheading': 'దిగువ ఫారమ్ నింపండి, మేము 24 గంటల్లో స్పందిస్తాము.',
    'contact.form.name.label': 'పూర్తి పేరు',
    'contact.form.name.placeholder': 'మీ పూర్తి పేరు',
    'contact.form.phone.label': 'ఫోన్ నంబర్',
    'contact.form.phone.placeholder': '+91 XXXXX XXXXX',
    'contact.form.message.label': 'సందేశం',
    'contact.form.message.placeholder': 'మీ ప్రింటింగ్ అవసరాల గురించి చెప్పండి...',
    'contact.form.submit': 'సందేశం పంపండి',
    'contact.form.sending': 'పంపుతోంది...',
    'contact.form.success': 'ధన్యవాదాలు! మీ సందేశం పంపబడింది. మేము త్వరలో మీకు తిరిగి వస్తాము.',
    'contact.form.error': 'ఏదో తప్పు జరిగింది. దయచేసి మళ్ళీ ప్రయత్నించండి లేదా నేరుగా సంప్రదించండి.',

    // Quote Request Page
    'quote.request.badge': 'కోటేషన్ అభ్యర్థన',
    'quote.request.heading': 'కోటేషన్ అభ్యర్థన',
    'quote.request.subheading': 'వివరాలు నింపండి, మేము మీకు అనుకూల కోటేషన్ అందిస్తాము.',
    'quote.request.info.heading': 'సంప్రదింపు సమాచారం',
    'quote.request.info.address.label': 'చిరునామా',
    'quote.request.info.address.value': 'నెల్లూరు, ఆంధ్రప్రదేశ్, భారతదేశం',
    'quote.request.info.phone.label': 'ఫోన్',
    'quote.request.info.email.label': 'ఇమెయిల్',
    'quote.request.whatsapp': 'వాట్సాప్‌లో చాట్ చేయండి',
    'quote.request.form.heading': 'కోటేషన్ అభ్యర్థన ఫారమ్',
    'quote.request.form.subheading': 'మీ ప్రాజెక్ట్ వివరాలు ఇవ్వండి, మేము మీకు కోటేషన్ పంపుతాము.',
    'quote.request.form.name.label': 'పూర్తి పేరు',
    'quote.request.form.name.placeholder': 'మీ పూర్తి పేరు',
    'quote.request.form.email.label': 'ఇమెయిల్ చిరునామా',
    'quote.request.form.email.placeholder': 'your@email.com',
    'quote.request.form.phone.label': 'ఫోన్ నంబర్',
    'quote.request.form.phone.placeholder': '+91 XXXXX XXXXX',
    'quote.request.form.services.label': 'అవసరమైన సేవలు',
    'quote.request.form.services.placeholder': 'మీకు ఏమి ప్రింట్ చేయాలో వివరించండి...',
    'quote.request.form.deadline.label': 'గడువు తేదీ',
    'quote.request.form.message.label': 'అదనపు సమాచారం',
    'quote.request.form.message.placeholder': 'ఏవైనా ప్రత్యేక అవసరాలు...',
    'quote.request.form.submit': 'అభ్యర్థన సమర్పించండి',
    'quote.request.form.sending': 'సమర్పిస్తోంది...',
    'quote.request.form.success': 'కోటేషన్ అభ్యర్థన విజయవంతంగా సమర్పించబడింది! మీ అభ్యర్థన ID:',
    'quote.request.form.copied': 'అభ్యర్థన ID కాపీ చేయబడింది!',
    'quote.request.form.error': 'ఏదో తప్పు జరిగింది. దయచేసి మళ్ళీ ప్రయత్నించండి.',

    // AdminPage
    'admin.panel.title': 'అడ్మిన్ పానెల్',
    'admin.panel.signin.desc': 'అడ్మిన్ డాష్‌బోర్డ్ యాక్సెస్ చేయడానికి సైన్ ఇన్ చేయండి.',
    'admin.panel.signin.button': 'సైన్ ఇన్',
    'admin.panel.signing.in': 'సైన్ ఇన్ అవుతోంది...',
    'admin.panel.access.denied.title': 'యాక్సెస్ నిరాకరించబడింది',
    'admin.panel.access.denied.desc': 'ఈ పానెల్ యాక్సెస్ చేయడానికి మీకు అడ్మిన్ అధికారాలు లేవు.',
    'admin.panel.signout': 'సైన్ అవుట్',
    'admin.dashboard.title': 'అడ్మిన్ డాష్‌బోర్డ్',
    'admin.dashboard.welcome': 'స్వాగతం,',
    'admin.stats.inquiries': 'మొత్తం విచారణలు',
    'admin.stats.admin': 'అడ్మిన్',
    'admin.stats.status': 'స్థితి',
    'admin.stats.active': 'యాక్టివ్',
    'admin.table.title': 'కస్టమర్ విచారణలు',
    'admin.table.desc': 'మీ వెబ్‌సైట్ నుండి అన్ని కాంటాక్ట్ ఫారమ్ సమర్పణలు.',
    'admin.table.refresh': 'రిఫ్రెష్',
    'admin.table.col.id': '#',
    'admin.table.col.name': 'పేరు',
    'admin.table.col.phone': 'ఫోన్',
    'admin.table.col.message': 'సందేశం',
    'admin.table.empty': 'ఇంకా విచారణలు లేవు.',
    'admin.table.error': 'సందేశాలు లోడ్ చేయడం విఫలమైంది.',
    'admin.profile.title': 'మీ ప్రొఫైల్ సెటప్ చేయండి',
    'admin.profile.desc': 'అడ్మిన్ పానెల్‌కు కొనసాగడానికి మీ పేరు నమోదు చేయండి.',
    'admin.profile.name.label': 'మీ పేరు',
    'admin.profile.name.placeholder': 'మీ పేరు నమోదు చేయండి',
    'admin.profile.save': 'కొనసాగించు',
    'admin.profile.saving': 'సేవ్ అవుతోంది...',
  },
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    const stored = localStorage.getItem('preferred-language');
    return (stored === 'te' ? 'te' : 'en') as Language;
  });

  const toggleLanguage = useCallback(() => {
    setLanguage((prev) => {
      const next: Language = prev === 'en' ? 'te' : 'en';
      localStorage.setItem('preferred-language', next);
      return next;
    });
  }, []);

  const t = useCallback(
    (key: string): string => {
      return translations[language][key] ?? translations['en'][key] ?? key;
    },
    [language]
  );

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within a LanguageProvider');
  return ctx;
}
