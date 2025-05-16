import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { MenuIcon, XIcon } from "lucide-react";
import logoDarkTheme from '@/imgs/logoDarkTheme.svg';
import useSmoothScroll from '@/hooks/useSmoothScroll'; // 1. IMPORT THE HOOK

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const scrollToSection = useSmoothScroll(); // 2. USE THE HOOK
 const stylee= 
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { name: 'الرئيسية', href: '#home' },
    { name: 'من نحن', href: '#about' },
    { name: 'خدماتنا', href: '#services' },
    { name: 'أعمالنا', href: '#portfolio' },
    // { name: 'شهادات العملاء', href: '#testimonials' },
  ];

  // 3. CREATE A HANDLER THAT USES THE HOOK AND COMPONENT-SPECIFIC LOGIC
  const handleLinkClick = (href: string) => {
    // Component-specific logic: close mobile menu
    // Then call the scroll function from the hook
    scrollToSection(href, () => {
      setMobileMenuOpen(false);
    });
  };
  
  const handleContactClick = () => {
    scrollToSection('#contact', () => {
      setMobileMenuOpen(false); // Also close menu if contact is clicked from mobile
    });
  }

  return (
    <header
      className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-mosaic-dark/90 backdrop-blur-md shadow-lg' : 'bg-transparent backdrop-blur-sm'
      }`}
    >
      <div className="container mx-auto py-4 px-6">
        <div className="flex justify-between items-center">
          <a 
            href="#home" 
            className="flex items-center gap-2" 
            onClick={(e) => {
              e.preventDefault();
              handleLinkClick("#home"); // 4. USE THE NEW HANDLER
            }}
          >
            <div className="w-10 h-10 rounded-full flex items-center justify-center">
              <img src={logoDarkTheme} alt="logo" />
            </div>
            <span className="text-xl font-bold" style={{
              fontFamily: 'Roboto',
            }}>Mosaic Team </span>
          </a>

          {/* Desktop menu */}
          <nav className="hidden md:flex items-center space-x-6 space-x-reverse">
            {menuItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(item.href); // 4. USE THE NEW HANDLER
                }}
                className="text-mosaic-white hover:text-mosaic-blue transition-colors duration-200 relative after:absolute after:bottom-[-4px] after:right-0 after:h-0.5 after:w-0 after:bg-mosaic-blue after:transition-all hover:after:w-full"
              >
                {item.name}
              </a>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <Button
              className="btn-primary"
              onClick={handleContactClick} // 4. USE THE NEW HANDLER (Button doesn't need e.preventDefault)
            >
              تواصل معنا
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-white p-2"
            >
              {mobileMenuOpen ? <XIcon size={24} /> : <MenuIcon size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 bg-mosaic-dark/95 rounded-lg p-4 animate-fade-in backdrop-blur-md">
            <nav className="flex flex-col space-y-4">
              {menuItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick(item.href); // 4. USE THE NEW HANDLER
                  }}
                  className="text-mosaic-white hover:text-mosaic-blue transition-colors duration-200"
                >
                  {item.name}
                </a>
              ))}
              <Button
                className="btn-primary w-full mt-2"
                onClick={handleContactClick} // 4. USE THE NEW HANDLER
              >
                تواصل معنا
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;