import React, { useRef, useEffect, useState } from 'react';
import { Camera, RefreshCw } from 'lucide-react';
import Swal from 'sweetalert2';

const FaceScannerUI = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const photoRef = useRef<HTMLCanvasElement>(null);
  const [hasPhoto, setHasPhoto] = useState<boolean>(false);
  const [orientationAlert, setOrientationAlert] = useState<boolean>(false);

  const time = new Date().toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });

  const getVideo = () => {
    navigator.mediaDevices
      .getUserMedia({
        video: {
          facingMode: "environment",
          width: { ideal: 720 },
          height: { ideal: 1280 },
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
    if (!videoRef.current || !photoRef.current) return;

    const video = videoRef.current;
    const photo = photoRef.current;
    const videoRect = video.getBoundingClientRect();

    const width = videoRect.width || video.width;
    const height = videoRect.height || video.height;

    photo.width = width;
    photo.height = height;

    const ctx = photo.getContext("2d");
    if (ctx) {
      ctx.drawImage(video, 0, 0, width, height);
      setHasPhoto(true);
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
          window.location.href = '/';
        });
      }
    });
  };

  const retakePhoto = () => {
    const photo = photoRef.current;
    if (photo) {
      const ctx = photo.getContext("2d");
      if (ctx) {
        ctx.clearRect(0, 0, photo.width, photo.height);
      }
      setHasPhoto(false);
    }
  };

  useEffect(() => {
    getVideo();
    return () => {
      // Cleanup video stream
      const video = videoRef.current;
      if (video && video.srcObject) {
        const tracks = (video.srcObject as MediaStream).getTracks();
        tracks.forEach(track => track.stop());
      }
    };
  }, []);

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
        {!hasPhoto ? (
          <video
            ref={videoRef}
            className="absolute inset-0 w-full h-full object-cover"
            playsInline
          />
        ) : (
          <canvas
            ref={photoRef}
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}
      </div>

      {/* Face Text */}
      <div className="text-center mt-4 text-gray-700 font-medium">
        Face
      </div>

      {/* Bottom Controls */}
      <div className="absolute bottom-8 left-0 right-0">
        <div className="flex justify-center items-center gap-12">
          {hasPhoto ? (
            <>
              <button
                onClick={retakePhoto}
                className="w-12 h-12 rounded-full border-2 border-gray-300 flex items-center justify-center bg-white"
              >
                <RefreshCw className="text-gray-500" size={24} />
              </button>
              <button
                onClick={confirmPhoto}
                className="w-12 h-12 rounded-full border-2 border-blue-500 flex items-center justify-center bg-blue-500"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-white">
                  <polyline points="20 6 9 17 4 12" strokeWidth="2" />
                </svg>
              </button>
            </>
          ) : (
            <button
              onClick={takePhoto}
              className="w-12 h-12 rounded-full border-2 border-blue-500 flex items-center justify-center bg-blue-500"
            >
              <Camera className="text-white" size={24} />
            </button>
          )}
        </div>
      </div>

      {/* Back Button */}
      <a 
        href="/"
        className="absolute top-4 left-4 text-blue-600 hover:text-blue-800"
      >
        Back
      </a>
    </div>
  );
};

export default FaceScannerUI;