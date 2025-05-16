// src/components/Footer.tsx
import { useState } from 'react'; // Import useState
import { Button } from '@/components/ui/button';
import logo from '@/imgs/logoDarkTheme.svg';
import useSmoothScroll from '@/hooks/useSmoothScroll';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter, // If you need a footer in the dialog
  DialogClose // For a close button
} from "@/components/ui/dialog"; // Assuming you have shadcn/ui Dialog
import PrivacyPolicyContent from '@/components/PrivacyPolicyContent'; // Import the content

const Footer = () => {
  const scrollToSection = useSmoothScroll();
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false); // State for modal

  const quickLinks = [
    { name: 'الرئيسية', id: '#home' },
    { name: 'من نحن', id: '#about' },
    { name: 'خدماتنا', id: '#services' },
    { name: 'أعمالنا', id: '#portfolio' },
    { name: 'تواصل معنا', id: '#contact' }
    ];

  const serviceItems = [
    { name: 'تصميم وتطوير مواقع الويب', id: '#services' },
    { name: 'تطوير تطبيقات الجوال', id: '#services' },
    { name: 'الفن الرقمي والإنفوجرافيك', id: '#services' },
    { name: 'تحسين محركات البحث', id: '#services' },
    { name: 'الهوية البصرية', id: '#services' }
    ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    scrollToSection(href);
  };
  
  // We don't need handleButtonClick for scrolling to privacy policy anymore
  // It will now open a modal

  return (
    <>
      <footer className="bg-mosaic-dark/95 border-t border-mosaic-blue/10 py-12 pt-16 md:pt-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            {/* Logo & About */}
            <div className="col-span-1 md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-full flex items-center justify-center shadow-glow">
                  <img src={logo} alt="Mosaic Team Logo" />
                </div>
                <span className="text-lg font-bold text-white">Mosaic Team</span>
              </div>
              <p className="text-mosaic-gray text-sm mb-6">
                فريق متخصص في تطوير المواقع، تطبيقات الجوال، والفن الرقمي المبتكر.
              </p>
              <div className="tagline-container mb-4">
                <p className="tagline-text">Your Vision, Our Solution</p>
              </div>
            </div>
            
            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold mb-6 text-white">روابط سريعة</h4>
              <ul className="space-y-3">
                {quickLinks.map((item, index) => (
                  <li key={index} className="transition-all duration-200 hover:translate-x-2 group">
                    <a 
                      href={item.id} 
                      onClick={(e) => handleLinkClick(e, item.id)}
                      className="text-mosaic-gray hover:text-mosaic-blue transition-colors duration-200 text-sm flex items-center"
                    >
                      <div className="w-1.5 h-1.5 bg-mosaic-blue rounded-full ml-2 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Services */}
            <div>
              <h4 className="text-lg font-semibold mb-6 text-white">خدماتنا</h4>
              <ul className="space-y-3">
                {serviceItems.map((item, index) => (
                  <li key={index} className="transition-all duration-200 hover:translate-x-2 group">
                    <a 
                      href={item.id}
                      onClick={(e) => handleLinkClick(e, item.id)}
                      className="text-mosaic-gray hover:text-mosaic-blue transition-colors duration-200 text-sm flex items-center"
                    >
                      <div className="w-1.5 h-1.5 bg-mosaic-blue rounded-full ml-2 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Newsletter */}
            <div>
              <h4 className="text-lg font-semibold mb-6 text-white">النشرة البريدية</h4>
              <p className="text-mosaic-gray text-sm mb-4">
                اشترك في نشرتنا البريدية للحصول على آخر الأخبار والعروض.
              </p>
              <form className="flex">
                <input
                  type="email"
                  placeholder="بريدك الإلكتروني"
                  className="bg-mosaic-dark border border-mosaic-blue/20 focus:border-mosaic-blue rounded-r-none rounded-l-none px-4 py-2 w-full text-sm focus:outline-none text-white placeholder-mosaic-gray"
                  style={{ direction: 'rtl' }}
                />
                <Button type='reset' className="rounded-l-md rounded-r-none bg-mosaic-blue hover:bg-mosaic-blue-dark border-mosaic-blue">
                  اشتراك
                </Button>
              </form>
            </div>
          </div>
          
          <div className="border-t border-mosaic-blue/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-mosaic-gray text-sm mb-4 md:mb-0">
              © {new Date().getFullYear()} Mosaic Team. جميع الحقوق محفوظة.
            </p>
            
            <div className="flex space-x-4 space-x-reverse">
              <Button 
                variant="link" 
                className="text-mosaic-gray hover:text-mosaic-blue text-sm p-0"
                onClick={() => setIsPrivacyModalOpen(true)} // Open the modal
              >
                سياسة الخصوصية
              </Button>
              {/* You can add a Terms and Conditions button similarly if needed */}
            </div>
          </div>
        </div>
      </footer>

      {/* Privacy Policy Modal */}
      <Dialog open={isPrivacyModalOpen} onOpenChange={setIsPrivacyModalOpen}>
        <DialogContent className="scrollbar-hide sm:max-w-[800px] max-h-[90vh] overflow-y-auto bg-mosaic-darker border-mosaic-blue/20 text-mosaic-gray">
          <DialogHeader className="text-right"> {/* Ensure header text aligns right for RTL */}
            {/* <DialogTitle className="text-white">سياسة الخصوصية</DialogTitle> */}
            {/* The title is already in PrivacyPolicyContent, so this might be redundant */}
          </DialogHeader>
          
          <PrivacyPolicyContent />
          
          <DialogFooter className="sm:justify-start pt-4"> {/* Justify start for RTL close button */}
            <DialogClose asChild>
              <Button type="button" variant="outline" className="border-mosaic-blue/50 text-mosaic-gray hover:bg-mosaic-blue/10 hover:text-white">
                إغلاق
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Footer;