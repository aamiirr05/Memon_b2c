import { Phone, Mail, MessageCircle } from 'lucide-react';
import { useState } from 'react';

const FloatingButtons = () => {
  const [hover, setHover] = useState(false);
  const [hoverMsg, setHoverMsg] = useState(false);
  const [hoverPhone, setHoverPhone] = useState(false);
  return (
    <div className="fixed right-4 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-50">
      {/* WhatsApp Button */}
      <a
        href="https://wa.me/8108404376"
        target="_blank"
        rel="noopener noreferrer"
        className={`flex items-center font-jakarta w-40 h-12 bg-green-500 text-white rounded-xl shadow-lg hover:bg-green-600 transition-all ease-in-out duration-500
            ${hover ? 'translate-x-4 justify-center gap-3' : 'translate-x-32 justify-start pl-3 opacity-50'}
            
            `}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <MessageCircle size={24} />
        {hover ? <span className="">Whatsapp</span> : ''}
      </a>

      {/* Email Button */}
      <a
        href="mailto:memonhajumrah@gmail.com"
        className={`flex items-center w-40 h-12 font-jakarta bg-blue-500 text-white rounded-xl shadow-lg hover:bg-blue-600 transition-all ease-in-out duration-500
            ${hoverMsg ? 'translate-x-4 justify-center gap-3' : 'translate-x-32 justify-start pl-3 opacity-50'}
            
            `}
        onMouseEnter={() => setHoverMsg(true)}
        onMouseLeave={() => setHoverMsg(false)}
      >
        <Mail size={24} />
        {hoverMsg ? <span className="">Mail</span> : ''}
      </a>

      {/* Phone Call Button */}
      <a
        href="tel:+918108404376"
        className={`flex items-center font-jakarta w-40 h-12 bg-red-500 text-white rounded-xl shadow-lg hover:bg-red-600 transition-all ease-in-out duration-500
            ${hoverPhone ? 'translate-x-4 justify-center gap-3' : 'translate-x-32 justify-start pl-3 opacity-50'}
            
            `}
        onMouseEnter={() => setHoverPhone(true)}
        onMouseLeave={() => setHoverPhone(false)}
      >
        <Phone size={24} />
        {hoverPhone ? <span className="">Phone</span> : ''}
      </a>
    </div>
  );
};

export default FloatingButtons;
