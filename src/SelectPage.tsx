import React, { useState } from 'react';
import Navbar from './components/Navbar';
import './SelectPage.css'

interface BeautyOption {
  id: string;
  title: string;
  description: string;
  image: string;
}

interface Category {
  id: string;
  title: string;
  options: BeautyOption[];
}

const beautyCategories: Category[] = [
  {
    id: 'overall',
    title: 'Overall Style',
    options: [
      { 
        id: 'natural', 
        title: 'Natural Beauty', 
        description: 'Enhance your natural features',
        image: '/src/images/overall/natural.jpg'
      },
      { 
        id: 'korean', 
        title: 'Korean Style', 
        description: 'K-beauty inspired look',
        image: '/images/styles/korean.jpg' 
      },
      { 
        id: 'glamour', 
        title: 'Glamour', 
        description: 'Bold and dramatic transformation',
        image: '/images/styles/glamour.jpg' 
      },
      { 
        id: 'minimal', 
        title: 'Minimal', 
        description: 'Subtle enhancement',
        image: '/images/styles/minimal.jpg' 
      },
    ]
  },
  {
    id: 'nose',
    title: 'Nose Shape',
    options: [
      { 
        id: 'nose-1', 
        title: 'Natural Slim', 
        description: 'Subtle nose refinement',
        image: '/images/nose/natural-slim.jpg' 
      },
      { 
        id: 'nose-2', 
        title: 'Button Nose', 
        description: 'Cute button-style nose',
        image: '/images/nose/button.jpg' 
      },
      // Add more nose options...
    ]
  },
  {
    id: 'eyes',
    title: 'Eye Makeup',
    options: [
      { 
        id: 'eyes-1', 
        title: 'Smokey Eyes', 
        description: 'Bold and sultry look',
        image: '/images/eyes/smokey.jpg' 
      },
      { 
        id: 'eyes-2', 
        title: 'Natural Eyes', 
        description: 'Enhance your natural eye shape',
        image: '/images/eyes/natural.jpg' 
      },
      // Add more eye options...
    ]
  }

  // Add more categories as needed
];

const SelectPage: React.FC = () => {
    const [selectedCategory, setSelectedCategory] = useState<string>('');
    const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});
    const [isLoading, setIsLoading] = useState(false);
    const photoData = localStorage.getItem('capturedPhoto');

    // Real-used handle submit
//   const handleSubmit = async () => {
//     if (Object.keys(selectedOptions).length === 0 || !photoData) return;

//     setIsLoading(true);
//     try {
//       const formData = new FormData();
//       formData.append('image', dataURItoBlob(photoData));
//       formData.append('options', JSON.stringify(selectedOptions));

//       const response = await fetch('YOUR_BACKEND_API_URL', {
//         method: 'POST',
//         body: formData,
//       });

//       if (!response.ok) throw new Error('Failed to process image');

//       const result = await response.json();
//       localStorage.setItem('processedImage', result.imageUrl);
//       window.location.href = '/result';
      
//     } catch (error) {
//       console.error('Error processing image:', error);
//       alert('Failed to process image. Please try again.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

const handleSubmit = async () => {
    if (Object.keys(selectedOptions).length === 0 || !photoData) return;
  
    setIsLoading(true);
    try {
      // Save selected options to localStorage
      localStorage.setItem('selectedOptions', JSON.stringify(selectedOptions));
  
      // For demo purposes, we'll use static images
      // In production, this would be your API call
      const processedImagePath = `/images/results/${selectedOptions['overall']}.jpg`;
      localStorage.setItem('processedImage', processedImagePath);
  
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));
  
      // Navigate to result page
      window.location.href = '/result';
    } catch (error) {
      console.error('Error processing image:', error);
      alert('Failed to process image. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
    // Helper function to convert Data URI to Blob
    const dataURItoBlob = (dataURI: string): Blob => {
        const byteString = atob(dataURI.split(',')[1]);
        const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
        const ab = new ArrayBuffer(byteString.length);
        const ia = new Uint8Array(ab);
        
        for (let i = 0; i < byteString.length; i++) {
          ia[i] = byteString.charCodeAt(i);
        }
        
        return new Blob([ab], { type: mimeString });
      };

      return (
        <div className="min-h-screen bg-gray-50">
          <Navbar showBack={true} />
          <div className="max-w-2xl mx-auto p-4">
            <h1 className="text-2xl font-bold text-center mb-6">
              Customize Your Look
            </h1>

            {/* Preview of captured photo */}
            {photoData && (
              <div className="mb-6">
                <img 
                  src={photoData} 
                  alt="Captured" 
                  className="w-full max-h-64 object-cover rounded-lg shadow-md"
                />
              </div>
            )}
    
            {/* Category Selection */}
            <div className="flex justify-center gap-4 mb-8">
              {beautyCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-6 py-3 rounded-full font-semibold transition-all
                    ${selectedCategory === category.id
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                    }`}
                >
                  {category.title}
                </button>
              ))}
            </div>
    
            {/* Options Slider for Selected Category */}
            {selectedCategory && (
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-center">
                  {beautyCategories.find(c => c.id === selectedCategory)?.title} Options
                </h2>
                <div className="relative">
                  <div className="flex overflow-x-auto pb-4 gap-4 snap-x snap-mandatory hide-scrollbar">
                    {beautyCategories
                      .find(c => c.id === selectedCategory)
                      ?.options.map((option) => (
                        <div 
                          key={option.id}
                          className="snap-start flex-none w-48"
                        >
                          <button
                            onClick={() => setSelectedOptions(prev => ({
                              ...prev,
                              [selectedCategory]: option.id
                            }))}
                            className={`w-full rounded-lg border-2 transition-all overflow-hidden
                              ${selectedOptions[selectedCategory] === option.id
                                ? 'border-blue-500 ring-2 ring-blue-300'
                                : 'border-gray-200 hover:border-blue-300'
                              }`}
                          >
                            <img 
                              src={option.image}
                              alt={option.title}
                              className="w-full h-32 object-cover"
                            />
                            <div className="p-2">
                              <h3 className="font-bold text-sm">{option.title}</h3>
                              <p className="text-gray-600 text-xs">{option.description}</p>
                            </div>
                          </button>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            )}
    
            {/* Selected Options Summary */}
            {Object.keys(selectedOptions).length > 0 && (
              <div className="mt-6 p-4 bg-white rounded-lg shadow-sm">
                <h3 className="font-semibold mb-2">Selected Options:</h3>
                <div className="space-y-1">
                  {Object.entries(selectedOptions).map(([categoryId, optionId]) => {
                    const category = beautyCategories.find(c => c.id === categoryId);
                    const option = category?.options.find(o => o.id === optionId);
                    return (
                      <div key={categoryId} className="text-sm text-gray-600">
                        {category?.title}: {option?.title}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
    
            {/* Submit button */}
            <button
              onClick={handleSubmit}
              disabled={Object.keys(selectedOptions).length === 0 || isLoading}
              className={`w-full py-3 px-6 rounded-lg text-white font-bold mt-6
                ${isLoading || Object.keys(selectedOptions).length === 0
                  ? 'bg-gray-400' 
                  : 'bg-blue-500 hover:bg-blue-600'
                } transition-colors`}
            >
              {isLoading ? 'Processing...' : 'Apply Changes'}
            </button>
          </div>
        </div>
      );
    };

export default SelectPage;