import React from 'react';
import { FaCamera } from 'react-icons/fa';
import Navbar from './components/Navbar';

const beautyServices = [
  {
    id: 'face',
    title: 'Face Transformation',
    description: 'Try different face shapes and features',
    icon: '👤'
  },
  {
    id: 'nose',
    title: 'Nose Enhancement',
    description: 'Explore various nose shapes',
    icon: '👃'
  },
  {
    id: 'eyes',
    title: 'Eye Makeover',
    description: 'Enhance your eye appearance',
    icon: '👁️'
  }
];

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar showBack={false} />
      
      <main className="max-w-2xl mx-auto p-4">
        {/* Hero Section */}
        <div className="text-center my-8">
          <h1 className="text-3xl font-bold mb-2">
            Beyond Beauty AI
          </h1>
          <p className="text-gray-600 mb-6">
            Experience virtual beauty transformations
          </p>
          <button
            onClick={() => window.location.href = '/camera'}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold 
                     py-3 px-8 rounded-full shadow-lg transition-colors
                     flex items-center gap-2 mx-auto hover:cursor-pointer"
          >
            <FaCamera />
            Try Now
          </button>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 gap-4 my-8">
          {beautyServices.map((service) => (
            <button
              key={service.id}
              onClick={() => window.location.href = '/camera'}
              className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md 
                       transition-shadow text-left border border-gray-100
                       hover:cursor-pointer"
            >
              <div className="text-3xl mb-3">{service.icon}</div>
              <h2 className="text-xl font-semibold mb-2">{service.title}</h2>
              <p className="text-gray-600 text-sm">{service.description}</p>
            </button>
          ))}
        </div>

        {/* Features Section */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-xl font-semibold mb-4">Why Choose Us?</h2>
          <ul className="space-y-3">
            <li className="flex items-center gap-2">
              <span className="text-blue-500">✓</span>
              Instant AI-powered transformations
            </li>
            <li className="flex items-center gap-2">
              <span className="text-blue-500">✓</span>
              Multiple beauty styles to choose from
            </li>
            <li className="flex items-center gap-2">
              <span className="text-blue-500">✓</span>
              Safe and private photo processing
            </li>
          </ul>
        </div>
      </main>
    </div>
  );
};

export default HomePage;