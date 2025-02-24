import React from 'react';
import { Home, ArrowLeft } from 'lucide-react';

interface NavbarProps {
  showBack?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ showBack = false }) => {
  const handleBack = () => {
    window.history.back();
  };

  return (
    <nav className="bg-blue-600 text-white px-4 py-3 flex items-center justify-between shadow-md">
      <div className="flex items-center gap-4">
        {showBack && (
          <button 
            onClick={handleBack}
            className="p-1 hover:bg-blue-700 rounded-full transition-colors"
          >
            <ArrowLeft size={24} />
          </button>
        )}
        <a 
          href="/" 
          className="p-1 hover:bg-blue-700 rounded-full transition-colors"
        >
          <Home size={24} />
        </a>
      </div>
      <div className="font-semibold text-lg">
        Beyond Beauty AI
      </div>
    </nav>
  );
};

export default Navbar;