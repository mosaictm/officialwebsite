import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import useSmoothScroll from '@/hooks/useSmoothScroll'; // 1. IMPORT THE HOOK
import logoCropped from '@/imgs/logoPNG.webp';

const HeroSection = () => {
  const { ref: textRef, isVisible: textVisible } = useScrollAnimation<HTMLDivElement>();
  const { ref: logoContainerRef, isVisible: logoVisible } = useScrollAnimation<HTMLDivElement>({ threshold: 0.2 });
  const scrollToSection = useSmoothScroll(); // 2. USE THE HOOK

  // State for the dynamic part of the headline
  const [dynamicText, setDynamicText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(10);

  const wordsToRotate = [" مذهلة", " رائعة", " مبتكرة"];
  const period = 1000;

  useEffect(() => {
    if (!textVisible) {
        return;
    }
    let ticker = setInterval(() => {
      tick();
    }, typingSpeed);
    return () => {
      clearInterval(ticker);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dynamicText, textVisible]);

  const tick = () => {
    let i = loopNum % wordsToRotate.length;
    let fullText = wordsToRotate[i];
    let updatedText = isDeleting
      ? fullText.substring(0, dynamicText.length - 1)
      : fullText.substring(0, dynamicText.length + 1);

    setDynamicText(updatedText);

    if (isDeleting) {
      setTypingSpeed(prevSpeed => Math.max(5, prevSpeed / 1.9)); // Ensure speed doesn't become too small
    } else {
        setTypingSpeed(10);
    }

    if (!isDeleting && updatedText === fullText) {
      setIsDeleting(true);
      setTypingSpeed(period);
    } else if (isDeleting && updatedText === '') {
      setIsDeleting(false);
      setLoopNum(loopNum + 1);
      setTypingSpeed(500);
    }
  };

  // 3. CREATE A HANDLER FOR THE BUTTON CLICK
  const handleStartProjectClick = () => {
    scrollToSection('#contact'); // Or whatever the ID of your target section is
  };

  return (
    <section id="home" className="relative min-h-screen bg-transparent flex items-center">
      {/* Background elements (unchanged) */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-mosaic-blue/20 rounded-full blur-[100px] animate-pulse-light parallax-element"></div>
        <div className="absolute bottom-1/3 left-1/3 w-72 h-72 bg-mosaic-blue-light/20 rounded-full blur-[80px] animate-pulse-light"
             style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Hexagon patterns (unchanged) */}
      <div className="absolute inset-0 z-0 opacity-10">
        {/* ... your hexagon SVGs ... */}
      </div>

      <div className="container-section relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div
            ref={textRef}
            className={`relative z-10 order-2 md:order-1 transition-all duration-1000 delay-300 ${
              textVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight h-[3em] md:h-[2.5em]">
              <span className="block">نحوّل رؤيتك إلى</span>
              <span className="text-mosaic-blue-light">تجربة رقمية</span>
              <span className="text-mosaic-blue-light">
                {dynamicText}
                <span className="animate-blink"></span> {/* Make sure animate-blink CSS is defined */}
              </span>
            </h1>
            <p className="text-lg text-mosaic-gray mb-8">
              فريق متخصص في تطوير المواقع الإلكترونية، تطبيقات الجوال، والفن الرقمي المبتكر. نقدم حلولاً مخصصة تناسب احتياجاتك الفريدة.
            </p>
            {/* 4. APPLY THE HANDLER TO THE BUTTON'S onClick */}
            <Button
              className="btn-primary text-lg relative overflow-hidden group mx-auto"
              onClick={handleStartProjectClick} // MODIFIED HERE
            >
                <span className="relative z-10">دعنا نبدأ مشروعك</span>
                <span className="absolute inset-0 bg-mosaic-blue-dark transform scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300"></span>
            </Button>
            <div className="mt-8 mt-15">
              {/* ... (rest of your commented out code remains the same) */}
            </div>
          </div>

          {/* Logo Column (unchanged) */}
          <div
            ref={logoContainerRef}
            className={`relative z-0 order-1 md:order-2 hidden md:flex justify-center items-center transition-all duration-1000 ${
              logoVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-100'
            }`}
          >
            {/* ... your logo and its decorative elements ... */}
            <div className="relative w-80 h-80 md:w-80 md:h-80 animate-float-slow parallax-element z-0">
              <img src={logoCropped} alt="Mosaic Logo" className="w-full h-full object-contain scale-[1.5]" />
              <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-mosaic-blue/20 rounded-full blur-lg animate-pulse-light"></div>
              <div className="absolute bottom-0 right-0 translate-x-1/3 translate-y-1/4 w-24 h-24 bg-mosaic-blue/30 rounded-full blur-xl animate-pulse-light" style={{ animationDelay: '2s' }}></div>
            </div>
            <div className="absolute inset-0 flex justify-center items-center w-full h-full animate-float-slow parallax-element -z-10 pointer-events-none">
              <div className="relative w-80 h-80">
                  <img src={logoCropped} alt="Mosaic Logo Background" className="w-full h-full object-contain scale-[8] opacity-15" />
                  <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-mosaic-blue/20 rounded-full blur-lg animate-pulse-light"></div>
                  <div className="absolute bottom-0 right-0 translate-x-1/3 translate-y-1/4 w-24 h-24 bg-mosaic-blue/30 rounded-full blur-xl animate-pulse-light" style={{ animationDelay: '2s' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;