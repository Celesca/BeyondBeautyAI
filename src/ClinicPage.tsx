import React, { useState } from 'react';
import Navbar from './components/Navbar';
import { CalendarDays, Clock, MapPin, X } from 'lucide-react';

interface Clinic {
  id: string;
  name: string;
  price: number;
  location: string;
  availability: 'Available' | 'Not Available';
  schedule: string[];
  rating: number;
  image: string;
  description?: string;
  services?: string[];
}

const clinics: Clinic[] = [
  {
    id: 'clinic1',
    name: 'Beauty Plus Clinic',
    price: 25000,
    location: 'Bangkok, Thailand',
    availability: 'Available',
    schedule: ['Mon-Fri: 10:00-19:00', 'Sat: 10:00-17:00'],
    rating: 4.8,
    image: '/images/clinics/clinic1.jpg',
    description: 'Specialized in facial plastic surgery with over 15 years of experience.',
    services: ['Rhinoplasty', 'Face Lift', 'Eye Surgery', 'Botox']
  },
  {
    id: 'clinic2',
    name: 'Perfect Beauty Center',
    price: 30000,
    location: 'Bangkok, Thailand',
    availability: 'Not Available',
    schedule: ['Mon-Fri: 09:00-20:00', 'Sat-Sun: 10:00-18:00'],
    rating: 4.9,
    image: '/images/clinics/clinic2.jpg',
    description: 'Premium beauty clinic with state-of-the-art technology.',
    services: ['Facial Surgery', 'Skin Treatment', 'Laser Treatment']
  },
  // Add more clinics...
];

const ClinicPage: React.FC = () => {
  const [selectedClinic, setSelectedClinic] = useState<Clinic | null>(null);
  const processedImage = localStorage.getItem('processedImage');

  const openModal = (clinic: Clinic) => {
    setSelectedClinic(clinic);
  };

  const closeModal = () => {
    setSelectedClinic(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar showBack={true} />
      
      {/* Transformed Image Section */}
      <div className="bg-white shadow-sm mb-6">
        <div className="max-w-6xl mx-auto p-4">
          <h1 className="text-2xl font-bold text-center mb-4">
            Find Your Clinic
          </h1>
          <div className="aspect-[3/4] max-w-sm mx-auto rounded-lg overflow-hidden shadow-lg">
            <img
              src={processedImage || '/images/results/processed.jpg'}
              alt="Your transformed look"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Clinics Grid Section */}
      <div className="max-w-6xl mx-auto p-4">
        <h2 className="text-xl font-semibold mb-4">Recommended Clinics</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {clinics.map((clinic) => (
            <div 
              key={clinic.id}
              onClick={() => openModal(clinic)}
              className="bg-white rounded-lg shadow-sm border border-gray-100 
                       overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
            >
              <div className="p-4">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-lg font-semibold">{clinic.name}</h3>
                    <p className="text-gray-600 flex items-center gap-1">
                      <MapPin size={16} />
                      {clinic.location}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-blue-600">
                      ฿{clinic.price.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-500">Starting price</div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <span className="text-yellow-400">★</span>
                    <span className="font-semibold">{clinic.rating}</span>
                  </div>
                  <div className={`text-sm ${
                    clinic.availability === 'Available' 
                      ? 'text-green-600' 
                      : 'text-red-600'
                  }`}>
                    <Clock size={16} className="inline mr-1" />
                    {clinic.availability}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Clinic Detail Modal */}
      {selectedClinic && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-4 border-b sticky top-0 bg-white">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold">{selectedClinic.name}</h3>
                <button 
                  onClick={closeModal}
                  className="p-1 hover:bg-gray-100 rounded-full"
                >
                  <X size={24} />
                </button>
              </div>
            </div>
            
            <div className="p-4">
              <img
                src={selectedClinic.image}
                alt={selectedClinic.name}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">About</h4>
                  <p className="text-gray-600">{selectedClinic.description}</p>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Services</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedClinic.services?.map((service, index) => (
                      <span 
                        key={index}
                        className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                      >
                        {service}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Schedule</h4>
                  {selectedClinic.schedule.map((time, index) => (
                    <div key={index} className="flex items-center gap-2 text-gray-600">
                      <CalendarDays size={16} />
                      {time}
                    </div>
                  ))}
                </div>

                <div className="pt-4 border-t">
                  <button
                    onClick={() => window.location.href = `/booking/${selectedClinic.id}`}
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white 
                             font-semibold py-3 px-6 rounded-lg transition-colors"
                    disabled={selectedClinic.availability === 'Not Available'}
                  >
                    Book Appointment
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClinicPage;