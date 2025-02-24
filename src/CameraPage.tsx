import React, { useRef, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { FaCamera } from "react-icons/fa6";
import Navbar from "./components/Navbar";


const CamerVerticalPage: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const photoRef = useRef<HTMLCanvasElement>(null);
  const [hasPhoto, setHasPhoto] = useState(false);

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

    const videoRect = videoRef.current?.getBoundingClientRect();

    const width = videoRect?.width || video.width;
    const height = videoRect?.height || video.height;

    photo.width = width;
    photo.height = height;

    const ctx = photo.getContext("2d");
    if (ctx) {
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
    <div>
    <Navbar showBack={true} />
    <div className="min-h-screen w-full py-4 px-2 flex flex-col items-center">
      <div className="w-full flex flex-col gap-2 relative">
        {!hasPhoto && (
          <video
            className="min-w-full"
            ref={videoRef}
            playsInline
          ></video>
        )}
        {!hasPhoto && (
          <button
            className="self-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={takePhoto}
          >
            <FaCamera className="mr-2" /> Snap!
          </button>
        )}
              </div>
      <div className={`w-full max-w-full ${hasPhoto ? "visible" : ""}`}>
        <canvas ref={photoRef}></canvas>
      </div>
      {hasPhoto && (
        <div className="w-full mt-1 flex justify-end gap-2" id="confirm-group">
          <button className="border border-gray-500 hover:bg-gray-100 text-gray-700 font-bold py-2 px-4 rounded" onClick={closePhoto}>
            RETRY
          </button>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={confirmPhoto}>
            CONFIRM
          </button>
        </div>
      )}
    </div>
    </div>
  );
};

export default CamerVerticalPage;
