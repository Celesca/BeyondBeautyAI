import React, { useRef, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { FaCamera } from "react-icons/fa6";
import Navbar from "./components/Navbar";

const CamerVerticalPage: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [photoData, setPhotoData] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);

  const getVideo = () => {
    const isDesktopOrTablet = window.innerWidth >= 768;
    
    navigator.mediaDevices
      .getUserMedia({
        video: {
          facingMode: "environment",
          aspectRatio: isDesktopOrTablet ? 16/9 : 3/4,
          width: { ideal: isDesktopOrTablet ? 1920 : 1080 },
        },
      })
      .then((stream) => {
        const video = videoRef.current;
        if (video) {
          video.srcObject = stream;
          video.play();
        }
      })
      .catch((err) => {
        console.error("Error accessing the camera: ", err);
      });
  };

  const takePhoto = () => {
    if (!videoRef.current) return;
  
    const video = videoRef.current;
    const canvas = document.createElement('canvas');
    
    // Get the actual video dimensions from the DOM element
    const videoElement = video.getBoundingClientRect();
    canvas.width = videoElement.width;
    canvas.height = videoElement.height;
  
    const ctx = canvas.getContext('2d');
    if (ctx) {
      // Set white background
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw video frame maintaining aspect ratio
      const aspectRatio = video.videoWidth / video.videoHeight;
      let drawWidth = canvas.width;
      let drawHeight = canvas.width / aspectRatio;
  
      if (drawHeight > canvas.height) {
        drawHeight = canvas.height;
        drawWidth = canvas.height * aspectRatio;
      }
  
      const x = (canvas.width - drawWidth) / 2;
      const y = (canvas.height - drawHeight) / 2;
  
      ctx.drawImage(video, x, y, drawWidth, drawHeight);
      const data = canvas.toDataURL('image/jpeg', 1.0); // Added quality parameter
      setPhotoData(data);
      setShowModal(true);
    }
  };

  const confirmPhoto = () => {
    Swal.fire({
      title: 'Loading...',
      text: 'Processing your photo.',
      icon: 'info',
      timer: 2000,
      showConfirmButton: false,
      willClose: () => {
        Swal.fire({
          title: 'Success!',
          text: 'Photo confirmed successfully.',
          icon: 'success',
          timer: 2000,
          showConfirmButton: false,
        }).then(() => {
          window.location.href = '/camera';
        });
      }
    });
  };

  const retakePhoto = () => {
    setPhotoData(null);
    setShowModal(false);
  };

  useEffect(() => {
    getVideo();
    return () => {
      const video = videoRef.current;
      if (video && video.srcObject) {
        const tracks = (video.srcObject as MediaStream).getTracks();
        tracks.forEach(track => track.stop());
      }
    };
  }, []);

  return (
    <div className="h-screen flex flex-col">
      <Navbar showBack={true} />
      <div className="flex-1 flex flex-col items-center justify-center p-4">
        <div className="relative w-full max-w-2xl aspect-[3/4] md:aspect-video">
          <video
            ref={videoRef}
            playsInline
            autoPlay
            muted
            className="w-full h-full object-cover rounded-lg shadow-lg"
          />
          <button
            className="absolute bottom-4 right-4 bg-blue-500 hover:bg-blue-700 
                      text-white font-bold py-3 px-6 rounded-full shadow-lg 
                      flex items-center gap-2 transition-colors z-10"
            onClick={takePhoto}
          >
            <FaCamera size={20} /> Snap!
          </button>
        </div>

        {/* Photo Preview Modal */}
        {showModal && photoData && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
    <div className="bg-white rounded-lg max-w-2xl w-full">
      <div className="p-4 bg-white">
        <div className="relative aspect-[3/4] md:aspect-video overflow-hidden rounded-lg">
          <img 
            src={photoData} 
            alt="Captured photo" 
            className="w-full h-full object-contain bg-white"
          />
        </div>
      </div>
              <div className="flex justify-end gap-2 p-4 border-t">
                <button 
                  className="px-6 py-2 border border-gray-500 hover:bg-gray-100 
                           text-gray-700 font-bold rounded-full transition-colors"
                  onClick={retakePhoto}
                >
                  RETRY
                </button>
                <button 
                  className="px-6 py-2 bg-blue-500 hover:bg-blue-700 
                           text-white font-bold rounded-full transition-colors"
                  onClick={confirmPhoto}
                >
                  CONFIRM
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CamerVerticalPage;