import { Camera, RefreshCw } from 'lucide-react';

const FaceScannerUI = () => {
  const time = new Date().toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });

  return (
    <div className="relative w-full max-w-sm mx-auto bg-gray-100 min-h-[600px]">
      {/* Status Bar */}
      <div className="flex justify-between items-center p-2 text-black text-sm">
        <span>{time}</span>
        <div className="flex items-center gap-1">
          <div className="h-4 w-4 rounded-full border-2 border-black"></div>
          <RefreshCw size={16} />
        </div>
      </div>

      {/* Main Camera View */}
      <div className="relative aspect-[3/4] bg-gray-200 mx-4 rounded-3xl overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <Camera className="text-gray-400" size={48} />
        </div>
      </div>

      {/* Face Text */}
      <div className="text-center mt-4 text-gray-700 font-medium">
        Face
      </div>

      {/* Bottom Icons */}
      <div className="absolute bottom-8 left-0 right-0">
        <div className="flex justify-center items-center gap-12">
          <div className="w-12 h-12 rounded-full border-2 border-gray-300 flex items-center justify-center">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-gray-500">
              <path d="M 2 12 C 2 8 5 5 9 5 C 13 5 15 8 15 12" strokeWidth="2" />
            </svg>
          </div>
          <div className="w-12 h-12 rounded-full border-2 border-blue-500 flex items-center justify-center bg-blue-500">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-white">
              <circle cx="12" cy="8" r="4" strokeWidth="2" />
              <path d="M 4 20 C 4 14 8 12 12 12 C 16 12 20 14 20 20" strokeWidth="2" />
            </svg>
          </div>
          <div className="w-12 h-12 rounded-full border-2 border-gray-300 flex items-center justify-center">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-gray-500">
              <path d="M 4 12 C 8 12 12 8 12 4 C 12 8 16 12 20 12 C 16 12 12 16 12 20 C 12 16 8 12 4 12" strokeWidth="2" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FaceScannerUI;