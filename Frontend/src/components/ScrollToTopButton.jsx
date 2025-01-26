import { ArrowUp } from 'lucide-react';
import { useState, useEffect } from 'react';

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 600) {
        setIsVisible(true); // Show button after scrolling down 600px
      } else {
        setIsVisible(false); // Hide button when at the top
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`flex gap-1 items-center fixed z-50 bottom-5 right-5 px-3 py-2 bg-darkgreen text-peach rounded-lg shadow-lg hover:bg-darkgreen/90 transition-all transform ${isVisible ? 'translate-x-0' : 'translate-x-36'}`}
    >
      Go to top <ArrowUp size={20} />
    </button>
  );
};

export default ScrollToTopButton;
