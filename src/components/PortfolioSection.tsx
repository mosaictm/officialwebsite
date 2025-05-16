import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import host from '@/imgs/hospital-insight-nexus and 7 more pages - Personal - Microsoft_ Edge 5_3_2025 6_04_47 PM.webp';
import host2 from '@/imgs/hospital-insight-nexus and 7 more pages - Personal - Microsoft_ Edge 5_3_2025 6_04_54 PM.webp'
import host3 from '@/imgs/hospital-insight-nexus and 7 more pages - Personal - Microsoft_ Edge 5_3_2025 6_06_09 PM.webp'
import estate from '@/imgs/2.jpg';
import estate2 from '@/imgs/land4.webp'
import estate3 from '@/imgs/land7.webp'
import lap from '@/imgs/3.jpg';
import studio from '@/imgs/Studio Vista _ Premium Interior Design and 7 more pages - Personal - Microsoft_ Edge 5_3_2025 7_14_07 PM.webp'
import studio2 from '@/imgs/Studio Vista _ Premium Interior Design and 7 more pages - Personal - Microsoft_ Edge 5_3_2025 7_14_26 PM.webp'
import studio3 from '@/imgs/Studio Vista _ Premium Interior Design and 7 more pages - Personal - Microsoft_ Edge 5_3_2025 7_14_56 PM.webp'
import ProjectModal, { Project } from '@/components/ProjectModal';

const PortfolioSection = () => {
  const categories = ['الكل', 'مواقع ويب', 'تطبيقات جوال', 'فن رقمي'];
  const [activeCategory, setActiveCategory] = useState('الكل');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const projects: Project[] = [
    {
      id: 1,
      title: "إدارة مستشفى",
      category: "مواقع ويب",
      description: "تطوير موقع ويب لإدارة مستشفى بميزات كاملة. يشمل النظام إدارة المرضى، المواعيد، الأطباء، الفواتير، والمخزون الطبي. يوفر لوحة تحكم شاملة للموظفين وتقارير مفصلة للإدارة.",
      image: host, // Use the imported string directly
      screenshots: [host, host2, host3], // Use strings directly
      liveLink: "https://hospital-insight-nexus.vercel.app",
      tags: ["React", "Node.js", "لوحة تحكم"]
      },
      {
      id: 2,
      title: "بيع وشراء العقارات والممتلكات",
      category: "مواقع ويب",
      description: "موقع يمكن المستخدمين من إيجاد العقارات واستئجارها وبيعها وشرائها بسهولة. يتميز بخريطة تفاعلية، بحث متقدم، ونظام إدارة للمستخدمين والوكلاء العقاريين.",
      image: estate, // Use the imported string directly
      screenshots: [estate, estate2, estate3], // Use strings directly
      liveLink: "https://land-canvas-pro.vercel.app",
      tags: ["React", "Firebase", "Interactive Map"]
      },
      {
      id: 3,
      title: "نمذجة وتصميم لابتوب Lenovo Legion",
      category: "فن رقمي",
      description: "تصميم ونمذجة ثلاثية الأبعاد للابتوب Lenovo Legion، مع تحريك إعلاني قصير يبرز تفاصيل التصميم ومميزاته. تم العمل باستخدام Blender.",
      image: lap, // Use the imported string directly
      screenshots: [lap], // Use strings directly
      liveLink: null,
      tags: ["نمذجة 3D", "Blender", "3D Art"]
      },
      {
      id: 4, // Assuming '4' was the last ID in your list, use the next available unique ID
      title: "استوديو فيستا للتصميم الداخلي",
      category: "مواقع ويب", // Or "مواقع تعريفية" if you prefer
      description: "تصميم وتطوير موقع إلكتروني أنيق وعصري لاستوديو 'فيستا' المتخصص في تقديم حلول تصميم داخلي مبتكرة. يعرض الموقع محفظة أعمال الاستوديو بشكل جذاب، ويسلط الضوء على المشاريع السكنية والتجارية المتميزة، مع التركيز على توفير تجربة مستخدم سلسة وغنية بصريًا.",
      image: studio, // Placeholder: Replace with an actual image for Vista Studio, e.g., '/images/projects/vista-main.jpg'
      screenshots: [studio, studio2, studio3],
      liveLink: "https://studio-vista-reveal.vercel.app/",
      tags: ["تصميم داخلي", "واجهات مستخدم", "تجربة مستخدم", "معرض أعمال", "هوية بصرية"]
      }
  ];

  const filteredProjects = activeCategory === 'الكل'
    ? projects.slice(0, 3)
    : projects.filter(project => project.category === activeCategory);

  const handleShowProject = (project: Project) => {
    if(filteredProjects)
    setSelectedProject(project);
    else <h1>Coming Soon..</h1>
  };

  const handleCloseModal = () => {
    setSelectedProject(null);
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleCloseModal();
      }
    };
    if (selectedProject) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedProject]);

  return (
    <>
      <section id="portfolio" className="bg-mosaic-dark py-20">
        <div className="container-section">
          <h2 className="section-title">أعمالنا</h2>
          <div className="flex flex-wrap justify-center gap-4 mb-12 mt-8">
            {categories.map((category, index) => (
              <button
                key={index}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-2 rounded-full transition-all ${
                  activeCategory === category
                    ? 'bg-mosaic-blue text-white'
                    : 'bg-mosaic-dark/50 border border-mosaic-blue/30 hover:border-mosaic-blue/50 text-mosaic-gray'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {filteredProjects.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project) => {
                return (
                  <div
                    key={project.id}
                    className="group relative flex flex-col overflow-hidden rounded-lg bg-mosaic-dark/60 border border-mosaic-blue/10 hover:border-mosaic-blue/40 transition-all animate-fade-in"
                    style={{ animationDelay: `${(project.id % 3) * 150}ms` }}
                  >
                    <div className="aspect-video overflow-hidden flex-shrink-0 relative">
                      <img
                        src={project.image}
                        alt={project.title}
                        loading="lazy"
                        width="1600"
                        height="900"
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 w-full h-full bg-gradient-to-t from-mosaic-dark to-transparent opacity-70 pointer-events-none"></div>
                    </div>
                    <div className="pt-6 px-6 pb-4 relative flex flex-col flex-grow">
                      <div className="flex-grow">
                        <span className="inline-block px-3 py-1 text-xs rounded-full bg-mosaic-blue/20 text-mosaic-blue mb-4">
                          {project.category}
                        </span>
                        <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                        <p className="text-mosaic-gray text-sm mb-4 line-clamp-2">{project.description}</p>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {project.tags.map((tag, idx) => (
                            <span key={idx} className="text-xs px-2 py-1 bg-mosaic-blue/10 text-mosaic-gray rounded">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="mt-auto">
                        <Button
                          onClick={() => handleShowProject(project)}
                          className="w-full bg-mosaic-dark hover:bg-mosaic-blue border border-mosaic-blue/50 text-mosaic-blue hover:text-white transition-all"
                        >
                          عرض المشروع
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            // This block renders if filteredProjects is empty AND it's not the 'الكل' category (or if 'الكل' also happens to be empty)
            // We only want "Coming Soon" if a specific category is chosen and it's empty.
            // The 'الكل' category already has a limit of 3, so if projects array is empty, filteredProjects will be empty.
            // The logic for 'الكل' to show only 3 items implies we don't show "Coming Soon" if 'الكل' is selected and projects has < 3 items but > 0.
            // We only show "Coming Soon" if a specific category is selected AND it has NO projects.
            activeCategory !== 'الكل' && ( // Only show "Coming Soon..." if a specific category is selected and it's empty
              <div className="col-span-1 sm:col-span-2 lg:col-span-3 text-center py-12">
                <p className="text-2xl text-mosaic-gray italic">قريباً...</p>
                <p className="text-mosaic-gray mt-2">نعمل حالياً على إضافة مشاريع جديدة في هذا القسم.</p>
              </div>
            )
          )}
          {/* --- END OF MODIFICATION --- */}

        </div>
      </section>

      {selectedProject && (
        <ProjectModal project={selectedProject} onClose={handleCloseModal} />
      )}
    </>
  );
};

export default PortfolioSection;