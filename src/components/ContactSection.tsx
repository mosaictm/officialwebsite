import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/use-toast';
import { PhoneIcon, MailIcon, MapPinIcon } from 'lucide-react';
import emailjs from '@emailjs/browser';
// Import the library (use /min for a smaller bundle size if preferred)
import { parsePhoneNumberFromString } from 'libphonenumber-js'; // if using full metadata
// or import { parsePhoneNumberFromString } from 'libphonenumber-js/min'; // for smaller bundle, less metadata

// Define the type for focusable elements
type FocusableInteractiveElement = HTMLInputElement | HTMLTextAreaElement;

// Define the position change handler factory function outside the component
function createPositionChangeFocusHandler() {
  let lastKnownPosition: { x: number; y: number } | null = null;
  let lastActiveInputElement: FocusableInteractiveElement | null = null;

  const handleHideSuggestionsOnMove = () => {
    const activeElement: Element | null = document.activeElement;

    // 1. Type Guard: Check if the active element is an instance of HTMLInputElement or HTMLTextAreaElement.
    if (
      !(activeElement instanceof HTMLInputElement ||
        activeElement instanceof HTMLTextAreaElement)
    ) {
      // If no relevant input is active, or something else is active, reset our tracking.
      lastActiveInputElement = null;
      lastKnownPosition = null;
      return;
    }

    // TypeScript now knows activeElement is FocusableInteractiveElement
    const activeInput: FocusableInteractiveElement = activeElement;

    // 2. If the focused input has changed since the last check,
    // or if this is the first time we're tracking this specific input.
    if (lastActiveInputElement !== activeInput) {
      lastActiveInputElement = activeInput;
      const rect = activeInput.getBoundingClientRect();
      lastKnownPosition = { x: rect.x, y: rect.y };
      // console.log('Now tracking:', activeInput.id || activeInput.name, 'at', lastKnownPosition);
      return; // Don't do anything else on the first focus of this element
    }

    // 3. If we are here, the same input is still focused. Check its current position.
    const currentRect = activeInput.getBoundingClientRect();

    // 4. Compare current position with the last known position
    if (
      lastKnownPosition &&
      (currentRect.x !== lastKnownPosition.x || currentRect.y !== lastKnownPosition.y)
    ) {
      // console.log(
      //   'Input moved!',
      //   activeInput.id || activeInput.name || activeInput,
      //   'from',
      //   lastKnownPosition,
      //   'to',
      //   { x: currentRect.x, y: currentRect.y }
      // );

      // Preserve cursor position if possible
      let selectionStart: number | null = null;
      let selectionEnd: number | null = null;
      try {
        selectionStart = activeInput.selectionStart;
        selectionEnd = activeInput.selectionEnd;
      } catch (e) {
        // Some input types might not support selectionStart/End or throw errors
      }

      activeInput.blur();

      // Refocus. Using requestAnimationFrame for robustness.
      requestAnimationFrame(() => {
        activeInput.focus({ preventScroll: true }); // <--- FIX: Prevents scrolling on focus

        // Restore cursor position
        if (typeof selectionStart === 'number' && typeof selectionEnd === 'number') {
          try {
            activeInput.setSelectionRange(selectionStart, selectionEnd);
          } catch (e) {
            // Ignore if setting selection range fails
          }
        }
        // console.log('Refocused:', activeInput.id || activeInput.name);
      });

      // Update the last known position to the new one
      lastKnownPosition = { x: currentRect.x, y: currentRect.y };
    }
  };

  return handleHideSuggestionsOnMove;
}


const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Initialize EmailJS with your public key
  useEffect(() => {
    emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "");
  }, []);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    let processedValue = value;

    if (name === 'name') {
      // Allows Unicode letters (incl. Arabic), marks (accents/diacritics),
      // spaces, apostrophes, hyphens, and periods.
      // Strips out numbers and other special characters.
      processedValue = value.replace(/[^\p{L}\p{M}\s'\-]/gu, '');
    } else if (name === 'phone') {
      // Only allow common phone number characters for typing.
      // Validation of the format happens on submit.
      processedValue = value.replace(/[^0-9\s()+\-]/g, '');
    }

    setFormData(prev => ({ ...prev, [name]: processedValue }));
  };
  
  // useEffect to manage the event listeners for the position change handler
  useEffect(() => {
    // Create the handler instance when the component mounts
    const moveHandler = createPositionChangeFocusHandler();

    // Attach the handler to events that might cause element movement
    window.addEventListener('scroll', moveHandler, true);
    window.addEventListener('resize', moveHandler, true);

    // Cleanup function: Remove event listeners when the component unmounts
    return () => {
      window.removeEventListener('scroll', moveHandler, true);
      window.removeEventListener('resize', moveHandler, true);
    };
  }, []); // Empty dependency array ensures this effect runs only once on mount and unmounts on cleanup

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // --- START: Phone Number Validation ---
    // You can provide a default country if most users are from one region, e.g., 'SY' for Syria
    // This helps parsing if the country code '+' is missing.
    const phoneNumberObj = parsePhoneNumberFromString(formData.phone); 

    if (!phoneNumberObj || !phoneNumberObj.isValid()) {
      toast({
        title: "رقم الجوال غير صحيح",
        description: "يرجى إدخال رقم جوال صحيح.", // "Please enter a valid phone number."
        variant: "destructive",
      });
      setIsSubmitting(false);
      return; // Stop submission if the phone number is invalid
    }
    // --- END: Phone Number Validation ---

    // 2. YOUR EMAILJS CREDENTIALS - REPLACE THESE VALUES
    const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;  // From your EmailJS dashboard
    const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID; // From your Email Templates section
    const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;  // Your EmailJS User ID / Public Key

    // This object's keys MUST match the variables in your EmailJS template
    const templateParams = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      phone: phoneNumberObj.format('E.164'), // Send in standardized E.164 format
      message: formData.message.trim(),
      // Add any other variables your template expects
    };

    // 3. SEND THE EMAIL USING EMAILJS
    emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY)
      .then((response) => {
        console.log('EmailJS SUCCESS!', response.status, response.text);
        toast({
          title: "تم إرسال الرسالة بنجاح",
          description: "سنقوم بالرد عليكم في أقرب وقت ممكن.",
          className:"bg-mosaic-blue"
        });
        setFormData({ name: '', email: '', phone: '', message: '' }); // Reset form
      })
      .catch((error) => {
        console.error('EmailJS FAILED...', error);
        let description = "عذراً، لم نتمكن من إرسال رسالتك. يرجى المحاولة مرة أخرى أو التواصل معنا مباشرة.";
        // Ensure error.text is a string before using it to prevent runtime errors
        if (error && typeof error === 'object' && 'text' in error && typeof error.text === 'string') { 
            description = `فشل الإرسال: ${error.text || 'خطأ غير معروف من EmailJS'}`;
        } else if (error instanceof Error) {
            description = `فشل الإرسال: ${error.message}`;
        }
        toast({
          title: "خطأ في الإرسال",
          description: description,
          variant: "destructive",
        });
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };



  return (
    <section id="contact" className="bg-mosaic-dark py-20">
      <div className="container-section">
        <h2 className="section-title">تواصل معنا</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-12">
          {/* Contact Form */}
          <div className="bg-mosaic-dark/50 border border-mosaic-blue/10 rounded-lg p-6 md:p-8 animate-fade-in">
            <h3 className="text-2xl font-bold mb-6">أرسل لنا رسالة</h3>
            
            <form onSubmit={handleSubmit} autoComplete="off">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                 <input
                      type="text"
                      name="prevent_autofill" 
                      id="prevent_autofill_contact" 
                      autoComplete="off" 
                      style={{ display: 'none' }}
                      tabIndex={-1} 
                      aria-hidden="true" 
                      value="" 
                      readOnly 
                      onChange={()=>{}} // React requires onChange for controlled inputs even if readOnly
                      />
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    الاسم الكامل
                  </label>
                  <Input
                    id="name"
                    name="name"
                    minLength={5} // Consider adjusting if too restrictive for some international names
                    maxLength={50} // Increased for broader international names
                    value={formData.name}
                    onChange={handleChange}
                    autoComplete="off"
                    placeholder="أدخل اسمك الكامل"
                    required
                    className="bg-mosaic-dark/70 border-mosaic-blue/20 focus:border-mosaic-blue focus:ring-mosaic-blue"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    البريد الإلكتروني
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="off"
                    minLength={5}
                    maxLength={70}
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="example@gmail.com"
                    required
                    className="bg-mosaic-dark/70 border-mosaic-blue/20 focus:border-mosaic-blue focus:ring-mosaic-blue"
                  />
                </div>
              </div>
             
              <div className="mb-6">
                <label htmlFor="phone" className="block text-sm font-medium mb-2">
                  رقم الجوال
                </label>
                <Input
                  dir='ltr'
                  id="phone"
                  name="phone"
                  type="tel" // Good practice for phone number inputs
                  autoComplete="off"
                  // minLength/maxLength are less critical for validation now libphonenumber-js handles it,
                  // but can provide a basic UI hint.
                  minLength={7}  // Looser minLength
                  maxLength={25} // Increased maxLength to allow varied input formats before libphonenumber-js processes it
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+963 XXX XXX XXX"
                  required
                  className="bg-mosaic-dark/70 border-mosaic-blue/20 focus:border-mosaic-blue text-right focus:ring-mosaic-blue"
                />
              </div>
             
              <div className="mb-6">
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  الرسالة
                </label>
                <Textarea
                  id="message"
                  name="message"
                  autoComplete="off"
                  maxLength={1000}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="اكتب رسالتك هنا..."
                  rows={5}
                  required
                  onInput={(e) => {
                    const target = e.currentTarget;
                    target.style.height = "auto";
                    target.style.height = `${target.scrollHeight}px`;
                  }}
                  className="bg-mosaic-dark/70 border-mosaic-blue/20 focus:border-mosaic-blue focus:ring-mosaic-blue scrollbar-hide resize-none max-h-72 py-4"
                />
              </div>
              
              <Button 
                type="submit" 
                className="btn-primary w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'جاري الإرسال...' : 'إرسال الرسالة'}
              </Button>
            </form>
          </div>
          
          {/* Contact Info */}
          <div className="flex flex-col space-y-8 animate-slide-in">
            <div>
              <h3 className="text-2xl font-bold mb-6">معلومات التواصل</h3>
              <p className="text-mosaic-gray mb-8">
                نحن هنا للإجابة على جميع استفساراتك وتقديم الدعم اللازم. لا تتردد في التواصل معنا من خلال أي من الوسائل التالية:
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-10 h-10 rounded-full bg-mosaic-blue/10 flex items-center justify-center text-mosaic-blue ml-4">
                    <MailIcon size={20} />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">البريد الإلكتروني</h4>
                    <a href="mailto:contact@mosaictm.com" className="text-mosaic-blue hover:underline">
                      contact@mosaictm.com
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-10 h-10 rounded-full bg-mosaic-blue/10 flex items-center justify-center text-mosaic-blue ml-4">
                    <PhoneIcon size={20} />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">رقم الهاتف</h4>
                    <a href="tel:+963968167947" className="text-mosaic-blue hover:underline" dir='ltr'>
                      +963 968 167 947
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-10 h-10 rounded-full bg-mosaic-blue/10 flex items-center justify-center text-mosaic-blue ml-4">
                    <MapPinIcon size={20} />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">العنوان</h4>
                    <p className="text-mosaic-gray">
                      سوريا، دمشق
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Social Media */}
            <div className="pr-10">
              <h3 className="text-xl font-bold mb-4">تابعنا على</h3>
              <div className="flex space-x-4 space-x-reverse">
                <a 
                  href="https://www.facebook.com/mosaictmpage" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-mosaic-blue/10 flex items-center justify-center text-mosaic-blue hover:bg-mosaic-blue hover:text-white transition-colors"
                  aria-label="Facebook"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.04C6.5 2.04 2 6.53 2 12.06C2 17.06 5.66 21.21 10.44 21.96V14.96H7.9V12.06H10.44V9.85C10.44 7.34 11.93 5.96 14.22 5.96C15.31 5.96 16.45 6.15 16.45 6.15V8.62H15.19C13.95 8.62 13.56 9.39 13.56 10.18V12.06H16.34L15.89 14.96H13.56V21.96A10 10 0 0 0 22 12.06C22 6.53 17.5 2.04 12 2.04Z" />
                  </svg>
                </a>
                
                <a 
                  href="https://www.instagram.com/mosaictm_" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-mosaic-blue/10 flex items-center justify-center text-mosaic-blue hover:bg-mosaic-blue hover:text-white transition-colors"
                  aria-label="Instagram"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M7.8,2H16.2C19.4,2 22,4.6 22,7.8V16.2A5.8,5.8 0 0,1 16.2,22H7.8C4.6,22 2,19.4 2,16.2V7.8A5.8,5.8 0 0,1 7.8,2M7.6,4A3.6,3.6 0 0,0 4,7.6V16.4C4,18.39 5.61,20 7.6,20H16.4A3.6,3.6 0 0,0 20,16.4V7.6C20,5.61 18.39,4 16.4,4H7.6M17.25,5.5A1.25,1.25 0 0,1 18.5,6.75A1.25,1.25 0 0,1 17.25,8A1.25,1.25 0 0,1 16,6.75A1.25,1.25 0 0,1 17.25,5.5M12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9Z" />
                  </svg>
                </a>
                
               <a
                  href="https://x.com/Mosaictm" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-mosaic-blue/10 flex items-center justify-center text-mosaic-blue hover:bg-mosaic-blue hover:text-white transition-colors"
                  aria-label="X"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    {/* Path for X logo */}
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>

                {/* LinkedIn Icon */}
                <a
                  href="https://www.linkedin.com/in/yourusername" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-mosaic-blue/10 flex items-center justify-center text-mosaic-blue hover:bg-mosaic-blue hover:text-white transition-colors"
                  aria-label="LinkedIn"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;