
import { useState } from 'react';
import { ChevronRightIcon, ChevronLeftIcon } from 'lucide-react';

const TestimonialsSection = () => {
  const testimonials = [
    {
      id: 1,
      text: "فريق Mosaic Team أنجز لنا متجر إلكتروني متكامل خلال أسبوعين فقط وبجودة عالية!",
      name: "أحمد محمود",
      position: "مدير التطوير - شركة أفق للتجارة",
      image: "https://randomuser.me/api/portraits/men/41.jpg"
    },
    {
      id: 2,
      text: "احترافية لا مثيل لها في تصميم تطبيقنا؛ شكراً على الإبداع والسرعة.",
      name: "سارة الأحمد",
      position: "مؤسس - تطبيق سلّة",
      image: "https://randomuser.me/api/portraits/women/44.jpg"
    },
    {
      id: 3,
      text: "التصاميم الرقمية كانت مذهلة وأسهمت في رفع مبيعاتنا بنحو 40%.",
      name: "محمد العلي",
      position: "مدير التسويق - مكتبة وعلوم",
      image: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    {
      id: 4,
      text: "تميزوا بالاحترافية وسرعة الاستجابة. موقعنا الجديد أصبح يستقطب زوار أكثر بنسبة 70%.",
      name: "فاطمة الزهراء",
      position: "مديرة العلامة التجارية - شركة الخليج",
      image: "https://randomuser.me/api/portraits/women/68.jpg"
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const displayCount = 3; // Number of testimonials to show at once

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + 1 >= testimonials.length ? 0 : prevIndex + 1
    );
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex - 1 < 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  // Get testimonials to display based on current index
  const getVisibleTestimonials = () => {
    const visibleTestimonials = [];
    for (let i = 0; i < displayCount; i++) {
      const index = (currentIndex + i) % testimonials.length;
      visibleTestimonials.push(testimonials[index]);
    }
    return visibleTestimonials;
  };

  return (
    <section id="testimonials" className="bg-mosaic-dark py-20">
      <div className="container-section">
        <h2 className="section-title">شهادات العملاء</h2>
        
        <div className="mt-12">
          {/* Desktop Testimonials Grid */}
          <div className="hidden md:grid grid-cols-1 md:grid-cols-3 gap-6">
            {getVisibleTestimonials().map((testimonial) => (
              <div key={testimonial.id} className="testimonial-card animate-fade-in">
                <div className="flex flex-col h-full">
                  {/* Quote Icon */}
                  <div className="text-mosaic-blue/30 mb-4">
                    <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M10,7L8,11H11V17H5V11L7,7H10M18,7L16,11H19V17H13V11L15,7H18Z" />
                    </svg>
                  </div>
                  
                  {/* Testimonial Text */}
                  <p className="text-mosaic-gray italic mb-6 flex-grow">{testimonial.text}</p>
                  
                  {/* Client Info */}
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-full overflow-hidden">
                      <img src={testimonial.image} alt={testimonial.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="mr-4">
                      <p className="font-semibold">{testimonial.name}</p>
                      <p className="text-mosaic-blue text-sm">{testimonial.position}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Mobile Single Testimonial */}
          <div className="md:hidden relative">
            <div className="testimonial-card animate-fade-in">
              <div className="flex flex-col h-full">
                {/* Quote Icon */}
                <div className="text-mosaic-blue/30 mb-4">
                  <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M10,7L8,11H11V17H5V11L7,7H10M18,7L16,11H19V17H13V11L15,7H18Z" />
                  </svg>
                </div>
                
                {/* Testimonial Text */}
                <p className="text-mosaic-gray italic mb-6 flex-grow">{testimonials[currentIndex].text}</p>
                
                {/* Client Info */}
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full overflow-hidden">
                    <img 
                      src={testimonials[currentIndex].image} 
                      alt={testimonials[currentIndex].name} 
                      className="w-full h-full object-cover" 
                    />
                  </div>
                  <div className="mr-4">
                    <p className="font-semibold">{testimonials[currentIndex].name}</p>
                    <p className="text-mosaic-blue text-sm">{testimonials[currentIndex].position}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Navigation Controls */}
          <div className="flex justify-center items-center mt-8 space-x-4 space-x-reverse">
            <button 
              onClick={prevTestimonial}
              className="w-10 h-10 rounded-full flex items-center justify-center bg-mosaic-blue/10 text-mosaic-blue hover:bg-mosaic-blue hover:text-white transition-colors"
            >
              <ChevronRightIcon size={20} />
            </button>
            
            <div className="flex space-x-2 space-x-reverse">
              {testimonials.map((_, index) => (
                <span
                  key={index}
                  className={`block w-2 h-2 rounded-full ${
                    currentIndex === index ? 'bg-mosaic-blue' : 'bg-mosaic-blue/30'
                  }`}
                ></span>
              ))}
            </div>
            
            <button 
              onClick={nextTestimonial}
              className="w-10 h-10 rounded-full flex items-center justify-center bg-mosaic-blue/10 text-mosaic-blue hover:bg-mosaic-blue hover:text-white transition-colors"
            >
              <ChevronLeftIcon size={20} />
            </button>
          </div>
        </div>
        
        {/* Client Logos */}
        <div className="mt-16">
          <h3 className="text-xl font-semibold text-center mb-8">نثق بهم</h3>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16">
            {[1, 2, 3, 4].map((index) => (
              <div key={index} className="w-32 h-16 bg-mosaic-dark/50 rounded-lg border border-mosaic-blue/10 flex items-center justify-center">
                <div className="text-mosaic-gray/50 font-semibold">Client {index}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
