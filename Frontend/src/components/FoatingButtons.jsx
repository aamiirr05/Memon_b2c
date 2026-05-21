import { Mail, Phone } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { WhatsappLogo, InstagramLogo } from '@phosphor-icons/react';

const FloatingButtons = () => {
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.matchMedia('(hover: none)').matches);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleMobileTap = () => {
    setOpen(true);
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setOpen(false), 4000);
  };

  useEffect(() => () => clearTimeout(timerRef.current), []);

  const btnBase =
    'flex items-center font-jakarta w-44 h-12 text-white rounded-xl shadow-lg transition-all ease-in-out duration-500 pointer-events-auto overflow-hidden';

  const expanded = 'translate-x-0 justify-center gap-3 opacity-100';
  const collapsed = 'translate-x-36 justify-start pl-3 opacity-50';

  const isOpen = isMobile ? open : undefined;

  return (
    <div
      className="fixed right-4 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-50 pointer-events-none"
      onClick={isMobile ? handleMobileTap : undefined}
    >
      {/* WhatsApp */}
      <a
        href="https://wa.me/+918108404376?text=Assalamu%20Alaikum%2C%20I%20am%20interested%20in%20your%20Umrah%20and%20Haj%20Packages."
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className={`${btnBase} bg-green-500 hover:bg-green-600 group`}
        style={{ transform: isMobile ? (open ? 'translateX(0)' : 'translateX(9rem)') : undefined,
                 opacity: isMobile ? (open ? 1 : 0.5) : undefined }}
        onMouseEnter={!isMobile ? (e) => e.currentTarget.style.transform = 'translateX(0.5rem)' : undefined}
        onMouseLeave={!isMobile ? (e) => e.currentTarget.style.transform = '' : undefined}
      >
        <WhatsappLogo size={24} className="flex-shrink-0 ml-3" />
        <span className={`ml-2 ${isMobile && !open ? 'hidden' : ''} group-hover:inline`}>WhatsApp</span>
      </a>

      {/* Email */}
      <a
        href="mailto:memonhajumrah@gmail.com"
        aria-label="Send Email"
        className={`${btnBase} bg-blue-500 hover:bg-blue-600 group`}
        style={{ transform: isMobile ? (open ? 'translateX(0)' : 'translateX(9rem)') : undefined,
                 opacity: isMobile ? (open ? 1 : 0.5) : undefined }}
        onMouseEnter={!isMobile ? (e) => e.currentTarget.style.transform = 'translateX(0.5rem)' : undefined}
        onMouseLeave={!isMobile ? (e) => e.currentTarget.style.transform = '' : undefined}
      >
        <Mail size={24} className="flex-shrink-0 ml-3" />
        <span className={`ml-2 ${isMobile && !open ? 'hidden' : ''} group-hover:inline`}>Email</span>
      </a>

      {/* Instagram */}
      <a
        href="https://www.instagram.com/memonhajumrahtours"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Follow on Instagram"
        className={`${btnBase} bg-gradient-to-br from-pink-500 to-orange-400 hover:from-pink-600 hover:to-orange-500 group`}
        style={{ transform: isMobile ? (open ? 'translateX(0)' : 'translateX(9rem)') : undefined,
                 opacity: isMobile ? (open ? 1 : 0.5) : undefined }}
        onMouseEnter={!isMobile ? (e) => e.currentTarget.style.transform = 'translateX(0.5rem)' : undefined}
        onMouseLeave={!isMobile ? (e) => e.currentTarget.style.transform = '' : undefined}
      >
        <InstagramLogo size={24} className="flex-shrink-0 ml-3" />
        <span className={`ml-2 ${isMobile && !open ? 'hidden' : ''} group-hover:inline`}>Instagram</span>
      </a>

      {/* Mobile tap hint — shown only on mobile when collapsed */}
      {isMobile && !open && (
        <button
          aria-label="Open contact options"
          onClick={handleMobileTap}
          className="pointer-events-auto self-end w-12 h-12 bg-darkgreen text-white rounded-full flex items-center justify-center shadow-lg"
        >
          <Phone size={20} />
        </button>
      )}
    </div>
  );
};

export default FloatingButtons;
