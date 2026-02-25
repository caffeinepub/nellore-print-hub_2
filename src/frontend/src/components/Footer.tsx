import { Link } from '@tanstack/react-router';
import { Printer, MapPin, Phone, Mail, Heart, Shield } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export default function Footer() {
  const year = new Date().getFullYear();
  const appId = encodeURIComponent(window.location.hostname || 'nellore-print-hub');
  const { t } = useLanguage();

  return (
    <footer className="bg-brand-dark text-white">
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="bg-brand-amber rounded-md p-1.5">
                <Printer className="w-5 h-5 text-brand-dark" />
              </div>
              <div className="flex flex-col leading-tight">
                <span className="font-bold text-lg text-white">Nellore</span>
                <span className="text-xs text-brand-amber font-medium tracking-widest uppercase -mt-1">Print Hub</span>
              </div>
            </div>
            <p className="text-white/60 text-sm leading-relaxed">
              {t('footer.tagline')}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-brand-amber mb-3 text-sm uppercase tracking-wider">{t('footer.quickLinks')}</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-white/60 hover:text-white text-sm transition-colors">{t('nav.home')}</Link>
              </li>
              <li>
                <Link to="/quote-request" className="text-white/60 hover:text-white text-sm transition-colors">{t('nav.quote')}</Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-brand-amber mb-3 text-sm uppercase tracking-wider">{t('footer.contact')}</h3>
            <ul className="space-y-2">
              <li className="flex items-start gap-2 text-white/60 text-sm">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-brand-amber" />
                <a
                  href="https://share.google/wdpTGKfodUsg1sRcu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  {t('footer.address')}
                </a>
              </li>
              <li className="flex items-center gap-2 text-white/60 text-sm">
                <Phone className="w-4 h-4 shrink-0 text-brand-amber" />
                <a href="tel:+919390535070" className="hover:text-white transition-colors">+91 93905 35070</a>
              </li>
              <li className="flex items-center gap-2 text-white/60 text-sm">
                <Mail className="w-4 h-4 shrink-0 text-brand-amber" />
                <a href="mailto:magic.nelloreprinthub@gmail.com" className="hover:text-white transition-colors">magic.nelloreprinthub@gmail.com</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/40 text-xs">
            © {year} Nellore Print Hub. {t('footer.rights')}
          </p>
          <div className="flex items-center gap-4">
            <Link
              to="/admin"
              className="flex items-center gap-1 text-white/30 hover:text-white/60 text-xs transition-colors"
            >
              <Shield className="w-3 h-3" />
              {t('footer.admin')}
            </Link>
            <p className="text-white/40 text-xs flex items-center gap-1">
              Built with <Heart className="w-3 h-3 text-brand-amber fill-brand-amber" /> using{' '}
              <a
                href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${appId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-amber hover:text-brand-amber-light transition-colors"
              >
                caffeine.ai
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
