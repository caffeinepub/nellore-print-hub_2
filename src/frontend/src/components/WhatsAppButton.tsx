import { useState } from 'react';
import { X, MessageCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const WHATSAPP_NUMBER = '919390535070';

export default function WhatsAppButton() {
  const [showTooltip, setShowTooltip] = useState(false);
  const { t } = useLanguage();

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Hello! I would like to inquire about your printing services.')}`;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
      {/* Tooltip */}
      {showTooltip && (
        <div className="bg-brand-dark text-white text-sm px-3 py-2 rounded-lg shadow-lg flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2">
          <span>{t('whatsapp.tooltip')}</span>
          <button
            onClick={() => setShowTooltip(false)}
            className="text-white/60 hover:text-white ml-1"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      )}

      {/* WhatsApp Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex items-center justify-center w-14 h-14 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95"
        style={{ backgroundColor: '#25D366' }}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        aria-label="Chat on WhatsApp"
      >
        <img
          src="/assets/generated/whatsapp-btn.dim_64x64.png"
          alt="WhatsApp"
          className="w-8 h-8 object-contain"
          onError={(e) => {
            e.currentTarget.style.display = 'none';
          }}
        />
        {/* Fallback icon rendered behind image */}
        <MessageCircle className="w-7 h-7 text-white absolute" style={{ zIndex: -1 }} />

        {/* Pulse ring */}
        <span className="absolute inset-0 rounded-full animate-ping opacity-30" style={{ backgroundColor: '#25D366' }} />
      </a>
    </div>
  );
}
