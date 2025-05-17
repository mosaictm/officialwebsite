
import { Button } from '@/components/ui/button';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const AboutSection = () => {
  const values = [
    {
      title: "الاحترافية",
      description: "نلتزم بأعلى معايير الجودة والاحترافية في كل مشروع نقوم به.",
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12,15.5A3.5,3.5 0 0,1 8.5,12A3.5,3.5 0 0,1 12,8.5A3.5,3.5 0 0,1 15.5,12A3.5,3.5 0 0,1 12,15.5M19.43,12.97C19.47,12.65 19.5,12.33 19.5,12C19.5,11.67 19.47,11.34 19.43,11L21.54,9.37C21.73,9.22 21.78,8.95 21.66,8.73L19.66,5.27C19.54,5.05 19.27,4.96 19.05,5.05L16.56,6.05C16.04,5.66 15.5,5.32 14.87,5.07L14.5,2.42C14.46,2.18 14.25,2 14,2H10C9.75,2 9.54,2.18 9.5,2.42L9.13,5.07C8.5,5.32 7.96,5.66 7.44,6.05L4.95,5.05C4.73,4.96 4.46,5.05 4.34,5.27L2.34,8.73C2.21,8.95 2.27,9.22 2.46,9.37L4.57,11C4.53,11.34 4.5,11.67 4.5,12C4.5,12.33 4.53,12.65 4.57,12.97L2.46,14.63C2.27,14.78 2.21,15.05 2.34,15.27L4.34,18.73C4.46,18.95 4.73,19.03 4.95,18.95L7.44,17.94C7.96,18.34 8.5,18.68 9.13,18.93L9.5,21.58C9.54,21.82 9.75,22 10,22H14C14.25,22 14.46,21.82 14.5,21.58L14.87,18.93C15.5,18.67 16.04,18.34 16.56,17.94L19.05,18.95C19.27,19.03 19.54,18.95 19.66,18.73L21.66,15.27C21.78,15.05 21.73,14.78 21.54,14.63L19.43,12.97Z" />
        </svg>
      )
    },
    {
      title: "الابتكار",
      description: "نسعى دائماً لتقديم حلول مبتكرة تواكب أحدث التقنيات.",
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12,2A7,7 0 0,1 19,9C19,11.38 17.81,13.47 16,14.74V17A1,1 0 0,1 15,18H9A1,1 0 0,1 8,17V14.74C6.19,13.47 5,11.38 5,9A7,7 0 0,1 12,2M9,21V20H15V21A1,1 0 0,1 14,22H10A1,1 0 0,1 9,21M12,4A5,5 0 0,0 7,9C7,11.05 8.23,12.81 10,13.58V16H14V13.58C15.77,12.81 17,11.05 17,9A5,5 0 0,0 12,4Z" />
        </svg>
      )
    },
    {
      title: "الشفافية",
      description: "نؤمن بأهمية الوضوح والشفافية الكاملة مع عملائنا.",
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12,9A3,3 0 0,1 15,12A3,3 0 0,1 12,15A3,3 0 0,1 9,12A3,3 0 0,1 12,9M12,4.5C17,4.5 21.27,7.61 23,12C21.27,16.39 17,19.5 12,19.5C7,19.5 2.73,16.39 1,12C2.73,7.61 7,4.5 12,4.5M3.18,12C4.83,15.36 8.24,17.5 12,17.5C15.76,17.5 19.17,15.36 20.82,12C19.17,8.64 15.76,6.5 12,6.5C8.24,6.5 4.83,8.64 3.18,12Z" />
        </svg>
      )
    }
  ];

  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation<HTMLHeadingElement>();
  const { ref: imageRef, isVisible: imageVisible } = useScrollAnimation<HTMLDivElement>({ threshold: 0.2 });
  const { ref: contentRef, isVisible: contentVisible } = useScrollAnimation<HTMLDivElement>({ threshold: 0.2 });

  return (
    <section id="about" className="relative py-20">
      {/* Section-specific background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-20 left-20 w-60 h-60 bg-mosaic-blue-light/5 rounded-full blur-[80px] animate-pulse-light parallax-element"></div>
        <div className="absolute bottom-40 right-0 w-80 h-80 bg-mosaic-blue/5 rounded-full blur-[100px] animate-pulse-light" style={{ animationDelay: '2s' }}></div>
        
        {/* Pattern overlay */}
        <div className="absolute bottom-0 inset-x-0 h-40 bg-dots-pattern opacity-5"></div>
      </div>
      
      <div className="container-section relative z-10">
        <h2 
          ref={titleRef}
          className={`section-title transition-all duration-700 ${
            titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          من نحن
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mt-12">
          <div 
            ref={imageRef}
            className={`relative transition-all duration-1000 ${
              imageVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'
            }`}
          >
            {/* Team illustration/image placeholder with animation */}
            <div className="relative bg-gradient-to-br from-mosaic-blue/20 to-mosaic-blue-dark/20 rounded-lg p-1.5">
              <div className="aspect-video bg-mosaic-dark/80 rounded-lg overflow-hidden flex items-center justify-center backdrop-blur-sm">
                <div className="grid grid-cols-3 gap-4 p-8 w-full h-full">
                  {[...Array(9)].map((_, index) => (
                    <div 
                      key={index} 
                      className={`rounded-lg ${index % 3 === 1 ? 'bg-mosaic-blue/30' : 'bg-mosaic-blue/10'} flex items-center justify-center transition-all duration-700`}
                      style={{ 
                        transitionDelay: `${index * 100}ms`,
                        opacity: imageVisible ? 1 : 0,
                        transform: imageVisible ? 'scale(1)' : 'scale(0.8)'
                      }}
                    >
                      {index % 3 === 1 && (
                        <svg className="w-12 h-12 text-mosaic-blue animate-pulse-light shadow-glow" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12,5.5A3.5,3.5 0 0,1 15.5,9A3.5,3.5 0 0,1 12,12.5A3.5,3.5 0 0,1 8.5,9A3.5,3.5 0 0,1 12,5.5M5,8C5.56,8 6.08,8.15 6.53,8.42C6.38,9.85 6.8,11.27 7.66,12.38C7.16,13.34 6.16,14 5,14A3,3 0 0,1 2,11A3,3 0 0,1 5,8M19,8A3,3 0 0,1 22,11A3,3 0 0,1 19,14C17.84,14 16.84,13.34 16.34,12.38C17.2,11.27 17.62,9.85 17.47,8.42C17.92,8.15 18.44,8 19,8M5.5,18.25C5.5,16.18 8.41,14.5 12,14.5C15.59,14.5 18.5,16.18 18.5,18.25V20H5.5V18.25M0,20V18.5C0,17.11 1.89,15.94 4.45,15.6C3.86,16.28 3.5,17.22 3.5,18.25V20H0M24,20H20.5V18.25C20.5,17.22 20.14,16.28 19.55,15.6C22.11,15.94 24,17.11 24,18.5V20Z" />
                        </svg>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Decorative elements with animations */}
            <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-mosaic-blue/30 rounded-full blur-xl -z-10 animate-pulse-light"></div>
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-mosaic-blue-light/30 rounded-full blur-xl -z-10 animate-pulse-light" style={{ animationDelay: '1.5s' }}></div>
          </div>
          
          <div 
            ref={contentRef}
            className={`transition-all duration-1000 delay-300 ${
              contentVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-(-20px)'
            }`}
          >
            <p className="text-lg mb-6 text-mosaic-gray">
              نحن فريق من المبدعين والمطورين المتخصصين في إنشاء تجارب رقمية استثنائية. 
              نجمع بين المهارات التقنية المتقدمة والرؤية الإبداعية لتقديم حلول تلبي احتياجات عملائنا.
            </p>
            <p className="text-lg mb-8 text-mosaic-gray">
              هدفنا هو تحويل أفكاركم إلى واقع رقمي يتميز بالجودة والابتكار. نحن نؤمن بأن التكنولوجيا
              يجب أن تكون في خدمة الإبداع، وأن كل مشروع يستحق الاهتمام الكامل والتفاني في التنفيذ.
            </p>
            
            <div className="bg-mosaic-dark/50 backdrop-blur-sm border border-mosaic-blue/10 rounded-lg p-6 mb-8">
              <h4 className="text-xl font-semibold mb-4">قيمنا الأساسية</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {values.map((value, index) => (
                  <div 
                    key={index} 
                    className="flex flex-col items-center text-center transition-all duration-700"
                    style={{ 
                      transitionDelay: `${500 + index * 200}ms`,
                      opacity: contentVisible ? 1 : 0,
                      transform: contentVisible ? 'translateY(0)' : 'translateY(20px)'
                    }}
                  >
                    <div className="w-16 h-16 rounded-full bg-mosaic-blue/10 flex items-center justify-center mb-4 text-mosaic-blue hover-glow shadow-glow">
                      {value.icon}
                    </div>
                    <h5 className="text-lg font-semibold mb-2">{value.title}</h5>
                    <p className="text-mosaic-gray text-sm">{value.description}</p>
                  </div>
                ))}
              </div>
            </div>
            
            {/*<Button className="btn-primary relative overflow-hidden group">
              <span className="relative z-10">تعرف على فريقنا</span>
              <span className="absolute inset-0 bg-mosaic-blue-dark transform scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300"></span>
            </Button>
            */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
