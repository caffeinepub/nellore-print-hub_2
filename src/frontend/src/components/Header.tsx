import { useState } from 'react';
import { Link } from '@tanstack/react-router';
import { Printer, Menu, X, Languages } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '../contexts/LanguageContext';

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { language, toggleLanguage, t } = useLanguage();

  const navLinks = [
    { labelKey: 'nav.home', to: '/' },
    { labelKey: 'nav.quote', to: '/quote-request' },
  ];

  return (
    <header className="bg-brand-dark text-white shadow-lg sticky top-0 z-40">
      <div className="container mx-auto px-4 py-0">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="bg-brand-amber rounded-md p-1.5 group-hover:bg-brand-amber-light transition-colors">
              <Printer className="w-5 h-5 text-brand-dark" />
            </div>
            <div className="flex flex-col leading-tight">
              <span className="font-bold text-lg tracking-tight text-white">Nellore</span>
              <span className="text-xs text-brand-amber font-medium tracking-widest uppercase -mt-1">Print Hub</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="px-4 py-2 rounded-md text-sm font-medium text-white/80 hover:text-white hover:bg-white/10 transition-colors"
                activeProps={{ className: 'px-4 py-2 rounded-md text-sm font-medium text-brand-amber bg-white/10' }}
              >
                {t(link.labelKey)}
              </Link>
            ))}

            {/* Language Toggle - Desktop */}
            <button
              type="button"
              onClick={toggleLanguage}
              className="ml-2 flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium border border-white/20 text-white/80 hover:text-white hover:bg-white/10 hover:border-white/40 transition-all"
              aria-label="Toggle language"
            >
              <Languages className="w-3.5 h-3.5" />
              <span>{language === 'en' ? 'తెలుగు' : 'EN'}</span>
            </button>
          </nav>

          {/* Mobile: Language toggle + menu button */}
          <div className="md:hidden flex items-center gap-2">
            <button
              type="button"
              onClick={toggleLanguage}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-md text-xs font-medium border border-white/20 text-white/80 hover:text-white hover:bg-white/10 transition-all"
              aria-label="Toggle language"
            >
              <Languages className="w-3 h-3" />
              <span>{language === 'en' ? 'తెలుగు' : 'EN'}</span>
            </button>
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/10"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Nav */}
        {mobileOpen && (
          <nav className="md:hidden pb-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="px-4 py-2 rounded-md text-sm font-medium text-white/80 hover:text-white hover:bg-white/10 transition-colors"
                activeProps={{ className: 'px-4 py-2 rounded-md text-sm font-medium text-brand-amber bg-white/10' }}
                onClick={() => setMobileOpen(false)}
              >
                {t(link.labelKey)}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}
