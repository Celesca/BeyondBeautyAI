import React, { useState } from 'react';
import Navbar from './components/Navbar';

interface BeautyOption {
  id: string;
  title: string;
  description: string;
}

const beautyOptions: BeautyOption[] = [
  { id: 'natural', title: 'Natural Beauty', description: 'Enhance your natural features' },
  { id: 'korean', title: 'Korean Style', description: 'K-beauty inspired look' },
  { id: 'glamour', title: 'Glamour', description: 'Bold and dramatic transformation' },
  { id: 'minimal', title: 'Minimal', description: 'Subtle enhancement' },
];

const SelectPage: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const photoData = localStorage.getItem('capturedPhoto');

  const handleSubmit = async () => {
    if (!selectedOption || !photoData) return;

    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append('image', dataURItoBlob(photoData));
      formData.append('style', selectedOption);

      const response = await fetch('YOUR_BACKEND_API_URL', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Failed to process image');

      const result = await response.json();
      // Store the processed image result
      localStorage.setItem('processedImage', result.imageUrl);
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
          Choose Your Beauty Style
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

        {/* Beauty options */}
        <div className="grid gap-4 mb-6">
          {beautyOptions.map((option) => (
            <button
              key={option.id}
              onClick={() => setSelectedOption(option.id)}
              className={`p-4 rounded-lg border-2 transition-all ${
                selectedOption === option.id
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-blue-300'
              }`}
            >
              <h3 className="font-bold">{option.title}</h3>
              <p className="text-gray-600 text-sm">{option.description}</p>
            </button>
          ))}
        </div>

        {/* Submit button */}
        <button
          onClick={handleSubmit}
          disabled={!selectedOption || isLoading}
          className={`w-full py-3 px-6 rounded-lg text-white font-bold
            ${isLoading || !selectedOption 
              ? 'bg-gray-400' 
              : 'bg-blue-500 hover:bg-blue-600'
            } transition-colors`}
        >
          {isLoading ? 'Processing...' : 'Apply Beauty Style'}
        </button>
      </div>
    </div>
  );
};

export default SelectPage;