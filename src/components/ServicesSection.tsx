import { Button } from '@/components/ui/button';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import useSmoothScroll from '@/hooks/useSmoothScroll'; // 1. IMPORT THE HOOK

const ServicesSection = () => {
  const scrollToSection = useSmoothScroll(); // 2. USE THE HOOK

  const services = [
    {
      title: "تصميم وتطوير مواقع الويب",
      description: "نقدم خدمات تصميم وتطوير مواقع الويب المتجاوبة بأحدث التقنيات لتعزيز تواجدك الرقمي.",
      icon: (
        <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
          <path d="M4,5H20V7H4V5M4,9H20V11H4V9M4,13H20V15H4V13M4,17H14V19H4V17Z" />
        </svg>
      ),
      features: ["تصميم احترافي وعصري", "تجربة مستخدم سلسة", "متوافق مع جميع الأجهزة"]
    },
    {
      title: "تطوير تطبيقات الجوال",
      description: "نطور تطبيقات الجوال المبتكرة لمنصات iOS وAndroid لتلبية احتياجات مستخدميك.",
      icon: (
        <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17,19H7V5H17M17,1H7C5.89,1 5,1.89 5,3V21A2,2 0 0,0 7,23H17A2,2 0 0,0 19,21V3C19,1.89 18.1,1 17,1Z" />
        </svg>
      ),
      features: ["تصميم جذاب وسهل الاستخدام", "أداء عالي وسرعة استجابة", "تكامل مع أنظمة الدفع والإشعارات"]
    },
    {
      title: "الفن الرقمي والإنفوجرافيك",
      description: "نقدم تصاميم فنية رقمية وإنفوجرافيك احترافية لإيصال رسالتك بشكل بصري جذاب.",
      icon: (
        <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.71,4.63L19.37,3.29C19,2.9 18.35,2.9 17.96,3.29L9,12.25L11.75,15L20.71,6.04C21.1,5.65 21.1,5 20.71,4.63M7,14A3,3 0 0,0 4,17C4,18.31 2.84,19 2,19C2.92,20.22 4.5,21 6,21A4,4 0 0,0 10,17A3,3 0 0,0 7,14Z" />
        </svg>
      ),
      features: ["تصميمات إبداعية مخصصة", "رسوم توضيحية عالية الجودة", "تصوير بصري للبيانات والمعلومات"]
    }
  ];

  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation<HTMLHeadingElement>();
  const { ref: ctaRef, isVisible: ctaVisible } = useScrollAnimation<HTMLDivElement>();

  // 3. CREATE A HANDLER
  const handleContactClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    scrollToSection('#contact');
  };

  return (
    <section id="services" className="relative py-20">
      {/* Section-specific background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-full overflow-hidden opacity-5">
          <div className="w-full h-full bg-grid-pattern"></div>
        </div>
        <div className="absolute top-40 right-20 w-72 h-72 bg-mosaic-blue/5 rounded-full blur-[100px] animate-pulse-light parallax-element"></div>
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-mosaic-blue-light/5 rounded-full blur-[120px] animate-pulse-light" style={{ animationDelay: '1.5s' }}></div>
      </div>
      
      <div className="container-section relative z-10">
        <h2 
          ref={titleRef}
          className={`section-title transition-all duration-700 ${
            titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          خدماتنا
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {services.map((service, index) => {
            const { ref, isVisible } = useScrollAnimation<HTMLDivElement>({ threshold: 0.1 });
            return (
              <div 
                key={index} 
                ref={ref}
                className={`card-service flex flex-col h-full transition-all duration-700 ${
                  isVisible 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div className="mb-6 text-mosaic-blue relative">
                  <div className="absolute -inset-2 bg-mosaic-blue/10 rounded-full blur-sm animate-pulse-light opacity-70"></div>
                  <div className="relative shadow-glow">{service.icon}</div>
                </div>
                <h3 className="text-xl font-bold mb-4">{service.title}</h3>
                <p className="text-mosaic-gray mb-6 flex-grow">{service.description}</p>
                
                <div className="bg-mosaic-dark/50 rounded p-4 mb-6 backdrop-blur-sm border border-mosaic-blue/5">
                  <h4 className="text-lg font-medium mb-2">المميزات:</h4>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li 
                        key={idx} 
                        className="flex items-center transition-all duration-500"
                        style={{ 
                          transitionDelay: `${(idx * 100) + 400}ms`,
                          opacity: isVisible ? 1 : 0,
                          transform: isVisible ? 'translateX(0)' : 'translateX(-10px)'
                        }}
                      >
                        <div className="w-2 h-2 bg-mosaic-blue rounded-full mr-2 shadow-glow"></div> {/* Note: In Arabic, mr-2 should be ml-2 for margin on the left */}
                        <span className="text-sm text-mosaic-gray">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                {/*<Button className="w-full bg-mosaic-dark hover:bg-mosaic-blue border border-mosaic-blue/50 text-mosaic-blue hover:text-white transition-all relative overflow-hidden group">
                  <span className="relative z-10">اكتشف المزيد</span>
                  <span className="absolute inset-0 bg-mosaic-blue transform scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300"></span>
                </Button>*/}
              </div>
            );
          })}
        </div>
        
        <div 
          ref={ctaRef}
          className={`mt-12 text-center transition-all duration-700 ${
            ctaVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h3 className="text-2xl font-semibold mb-4">جاهزون لبدء مشروعك المميز</h3>
          <p className="text-mosaic-gray mb-6 max-w-3xl mx-auto">
            تواصل معنا اليوم للحصول على استشارة مجانية ومناقشة تفاصيل مشروعك.
            فريقنا مستعد لتحويل فكرتك إلى واقع رقمي متميز.
          </p>
          {/* 4. APPLY THE HANDLER TO THE onClick OF THE <a> TAG */}
          <a 
            href="#contact" 
            onClick={handleContactClick}
          >
            <Button className="btn-primary text-lg relative overflow-hidden group">
              <span className="relative z-10">تواصل معنا</span>
              <span className="absolute inset-0 bg-mosaic-blue-dark transform scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300"></span>
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;