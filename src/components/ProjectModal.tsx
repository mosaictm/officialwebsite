import React, { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

// Define the structure of your project data for TypeScript
export interface Project {
    id: number;
    title: string;
    category: string;
    description: string;
    image: string; // Main image for project card
    screenshots?: string[]; // Array of screenshot URLs for the modal
    liveLink?: string | null;
    tags: string[];
}

// Define the props expected by the ProjectModal component
interface ProjectModalProps {
    project: Project | null;
    onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
    const [currentScreenshotIndex, setCurrentScreenshotIndex] = useState(0);

    // Reset to the first screenshot when the project changes or modal opens
    useEffect(() => {
        setCurrentScreenshotIndex(0);
    }, [project]);

    useEffect(() => {
        // Prevent body scroll when modal is open
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);

    const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    const handleContentClick = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
    };

    if (!project) {
        return null;
    }

    const hasScreenshots = project.screenshots && project.screenshots.length > 0;
    const numScreenshots = hasScreenshots ? project.screenshots!.length : 0;

    const handleNextScreenshot = () => {
        if (numScreenshots > 0) {
            setCurrentScreenshotIndex((prevIndex) => (prevIndex + 1) % numScreenshots);
        }
    };

    const handlePrevScreenshot = () => {
        if (numScreenshots > 0) {
            setCurrentScreenshotIndex((prevIndex) => (prevIndex - 1 + numScreenshots) % numScreenshots);
        }
    };

    const handleThumbnailClick = (index: number) => {
        setCurrentScreenshotIndex(index);
    };
    
    // Determine the current image to display
    // Fallback to project.image if no screenshots or if something is wrong.
    let currentImageSrc = project.image; // Default to main project image
    if (hasScreenshots && project.screenshots![currentScreenshotIndex]) {
        currentImageSrc = project.screenshots![currentScreenshotIndex];
    } else if (hasScreenshots && project.screenshots!.length > 0) {
        // Fallback to the first screenshot if index is somehow out of bounds
        currentImageSrc = project.screenshots![0];
    }


    console.log("Modal Project Data:", project);
    console.log("Modal Screenshots Array:", project?.screenshots);
    console.log("Current Screenshot Index:", currentScreenshotIndex);
    console.log("Current Image SRC:", currentImageSrc);


    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm animate-fade-in"
            onClick={handleOutsideClick}
        >
            {/* Modal Content Box */}
            <div
                className="bg-mosaic-dark w-full max-h-[95vh] sm:h-auto sm:max-h-[90vh] sm:max-w-3xl rounded-lg shadow-xl flex flex-col border border-mosaic-blue/20 overflow-hidden"
                onClick={handleContentClick}
            >
                {/* Close Button Row */}
                <div className="flex justify-start p-2 border-b border-mosaic-blue/10 flex-shrink-0">
                    <button
                        onClick={onClose}
                        className="text-mosaic-gray hover:text-white p-1 rounded-full hover:bg-mosaic-blue/30 transition-colors"
                        aria-label="Close modal"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Main Scrollable Content Area */}
                <div className="flex flex-col flex-grow overflow-y-auto scrollbar-hide">
                    {/* Header */}
                    <div className="p-6 flex-shrink-0">
                        <h2 className="text-2xl font-bold mb-2 text-white">{project.title}</h2>
                        <p className="text-mosaic-gray text-sm">{project.description}</p>
                    </div>

                    {/* Body (Screenshots - Custom Slider) */}
                    <div className="px-6 pt-2 pb-6 flex-grow">
                        <h3 className="text-lg font-semibold mb-4 text-white">لقطات من المشروع</h3>

                        {hasScreenshots ? (
                            <div className="relative">
                                {/* Main Image Display */}
                                <div className="aspect-video bg-black/20 rounded-md border border-mosaic-blue/10 overflow-hidden mb-4">
                                    {currentImageSrc ? (
                                        <img loading="lazy"
                                            // IMPORTANT: Use a key that changes when the src changes to force re-render if needed
                                            key={currentImageSrc} 
                                            src={currentImageSrc}
                                            alt={`${project.title} Screenshot ${currentScreenshotIndex + 1}`}
                                            className="w-full h-full object-contain" // Use object-contain to see the whole image
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-mosaic-gray">
                                            صورة غير متوفرة
                                        </div>
                                    )}
                                </div>

                                {/* Navigation Buttons (only if more than one screenshot) */}
                                {numScreenshots > 1 && (
                                    <div className="flex justify-center items-center gap-4 mb-4">
                                       <button
                                            className="bg-mosaic-blue/30 hover:bg-mosaic-blue/50 text-white p-2 rounded-full transition-colors"
                                            onClick={handlePrevScreenshot}
                                            aria-label="Previous Screenshot"
                                        >
                                            <ChevronRight size={24} />
                                        </button>
                                       
                                        <span className="text-mosaic-gray text-sm">
                                        {numScreenshots} / {currentScreenshotIndex + 1}
                                        </span>
                                        <button
                                            className="bg-mosaic-blue/30 hover:bg-mosaic-blue/50 text-white p-2 rounded-full transition-colors"
                                            onClick={handleNextScreenshot}
                                            aria-label="Next Screenshot"
                                        >
                                            <ChevronLeft size={24} />
                                        </button>
                                    </div>
                                )}

                                {/* Thumbnails (only if more than one screenshot) */}
                                {numScreenshots > 1 && (
                                    <div className="flex flex-wrap justify-center gap-2">
                                        {project.screenshots!.map((screenshotUrl, index) => (
                                            <button
                                                key={index}
                                                onClick={() => handleThumbnailClick(index)}
                                                className={`w-20 h-16 rounded border-2 overflow-hidden
                                                            ${index === currentScreenshotIndex ? 'border-mosaic-blue' : 'border-transparent hover:border-mosaic-gray/50'}`}
                                                aria-label={`View screenshot ${index + 1}`}
                                            >
                                                <img loading="lazy"
                                                    src={screenshotUrl}
                                                    alt={`Thumbnail ${index + 1}`}
                                                    className="w-full h-full object-cover"
                                                />
                                            </button>
                                        ))}
                                    </div>
                                )}

                            </div>
                        ) : (
                            <p className="text-mosaic-gray italic">لا توجد لقطات متاحة. (أو يعرض صورة المشروع الرئيسية)</p>
                        )}
                         {/* Display main project image if no screenshots available */}
                        {!hasScreenshots && project.image && (
                             <div className="aspect-video bg-black/20 rounded-md border border-mosaic-blue/10 overflow-hidden">
                                <img loading="lazy"
                                    src={project.image}
                                    alt={project.title}
                                    className="w-full h-full object-contain"
                                />
                            </div>
                        )}
                    </div>


                    {/* Footer (Link) */}
                    {project.liveLink && (
                        <div className="p-6 border-t border-mosaic-blue/10 mt-auto flex-shrink-0">
                            <a
                                href={project.liveLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full inline-block"
                            >
                                <Button className="w-full bg-mosaic-blue hover:bg-opacity-80 text-white">
                                    زيارة الموقع التجريبي
                                </Button>
                            </a>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProjectModal;