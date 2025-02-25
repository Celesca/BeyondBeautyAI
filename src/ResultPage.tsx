import React from 'react';
import Navbar from './components/Navbar';

const ResultPage: React.FC = () => {
  const originalPhoto = localStorage.getItem('capturedPhoto');
  const processedImage = localStorage.getItem('processedImage');
  const selectedOptions: Record<string, string> = JSON.parse(localStorage.getItem('selectedOptions') || '{}');

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar showBack={true} />
      <div className="max-w-2xl mx-auto p-4">
        <h1 className="text-2xl font-bold text-center mb-6">
          Your Transformed Look
        </h1>

        <div className="grid md:grid-cols-2 gap-4 mb-6">
          {/* Original Photo - Hidden on mobile, visible on md and up */}
          <div className="hidden md:block space-y-2">
            <h2 className="font-semibold text-center">Original</h2>
            <div className="aspect-[3/4] rounded-lg overflow-hidden shadow-lg">
              <img
                src={originalPhoto || ''}
                alt="Original"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

       {/* Processed Photo - Full width on mobile */}
       <div className="space-y-2 md:col-span-1 col-span-2">
            <h2 className="font-semibold text-center">Transformed</h2>
            <div className="aspect-[3/4] rounded-lg overflow-hidden shadow-lg max-w-sm mx-auto">
              <img
                src={processedImage || '/images/results/processed.jpg'}
                alt="Transformed"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Applied Changes Summary */}
        <div className="bg-white rounded-lg shadow-sm p-4">
          <h3 className="font-semibold mb-2">Applied Changes:</h3>
          <ul className="space-y-1">
            {Object.entries(selectedOptions).map(([category, optionId]) => (
              <li key={category} className="text-sm text-gray-600">
                • {category}: {optionId}
              </li>
            ))}
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 mt-6">
          <button
            onClick={() => window.location.href = '/camera'}
            className="flex-1 py-3 px-6 rounded-lg bg-gray-200 hover:bg-gray-300 
                     text-gray-700 font-semibold transition-colors"
          >
            Take New Photo
          </button>
          <button
            onClick={() => window.location.href = '/select'}
            className="flex-1 py-3 px-6 rounded-lg bg-blue-500 hover:bg-blue-600 
                     text-white font-semibold transition-colors"
          >
            Try Different Style
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultPage;