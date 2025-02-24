import React, { useRef, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { FaCamera } from "react-icons/fa6";
import Navbar from "./components/Navbar";


const CamerVerticalPage: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const photoRef = useRef<HTMLCanvasElement>(null);
  const [hasPhoto, setHasPhoto] = useState(false);

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
    console.log("Clicked");
    if (!videoRef.current || !photoRef.current) {
      console.log(videoRef.current)
      console.log(photoRef.current)
      console.error("Video or photo refs are not available");
        return;
    } else {
      console.log("Video and photo refs are available");
    }

    const video = videoRef.current;
    const photo = photoRef.current;

    // Get the actual dimensions of the video element
    const videoRect = video.getBoundingClientRect();
    const width = videoRect.width;
    const height = videoRect.height;

    // Set canvas dimensions to match video
    photo.width = width;
    photo.height = height;

    const ctx = photo.getContext("2d");
    if (ctx) {
      // Draw the current video frame
      ctx.drawImage(video, 0, 0, width, height);
      setHasPhoto(true);
    }

    const confirmGroup = document.getElementById('confirm-group');
    if (confirmGroup) {
      confirmGroup.scrollIntoView({ behavior: 'smooth' });
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


  const closePhoto = () => {
    const ctx = photoRef.current?.getContext("2d");
    if (ctx) {
      ctx.clearRect(0, 0, photoRef.current?.width || 0, photoRef.current?.height || 0);
    }
    setHasPhoto(false);
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
  }, [hasPhoto]);

    return (
      <div className="h-screen flex flex-col">
      <Navbar showBack={true} />
      <div className="flex-1 flex flex-col items-center justify-center p-4">
        <div className="relative w-full max-w-2xl aspect-[3/4] md:aspect-video">
          {!hasPhoto ? (
            <div className="relative w-full h-full">
              <video
                ref={videoRef}
                playsInline
                autoPlay
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

) : (
  <canvas 
  ref={photoRef}
  className="w-full h-full object-cover rounded-lg shadow-lg"
/>
)}
</div>

{hasPhoto && (
<div className="mt-4 flex justify-end gap-2 w-full max-w-2xl" id="confirm-group">
  <button 
    className="px-6 py-2 border border-gray-500 hover:bg-gray-100 
             text-gray-700 font-bold rounded-full transition-colors"
    onClick={closePhoto}
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
)}
</div>
</div>
  );
};

export default CamerVerticalPage;