import React, { useRef, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { FaCamera } from "react-icons/fa6";
import Navbar from "./components/Navbar";
import { FaceDetection } from "@mediapipe/face_detection";
import { Camera } from "@mediapipe/camera_utils";
import { drawConnectors, drawLandmarks } from "@mediapipe/drawing_utils";

const CameraVerticalPage: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [photoData, setPhotoData] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const faceDetection = new FaceDetection({
      locateFile: (file) => `/node_modules/@mediapipe/face_detection/${file}`, 
    });

    faceDetection.setOptions({
      model: "short",
      minDetectionConfidence: 0.5,
      selfieMode: true,
    });

    const onResults = (results: any) => {
      if (!canvasRef.current || !videoRef.current) return;

      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      canvas.width = videoRef.current.clientWidth;
      canvas.height = videoRef.current.clientHeight;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(results.image, 0, 0, canvas.width, canvas.height);

      if (results.detections) {
        for (const detection of results.detections) {
          drawConnectors(ctx, detection.landmarks, FaceDetection.FACE_POSE_CONNECTIONS, {
            color: "#FF3030",
            lineWidth: 2,
          });
          drawLandmarks(ctx, detection.landmarks, {
            color: "#FFFFFF",
            lineWidth: 1,
            radius: 2,
          });
        }
      }
    };

    faceDetection.onResults(onResults);

    let camera: Camera | null = null;
    if (videoRef.current) {
      camera = new Camera(videoRef.current, {
        onFrame: async () => {
          await faceDetection.send({ image: videoRef.current! });
        },
        width: 1280,
        height: 720,
      });
      camera.start();
    }

    return () => {
      if (camera) camera.stop();
    };
  }, []);

  const takePhoto = () => {
    if (!videoRef.current) return;

    const photoCanvas = document.createElement("canvas");
    const ctx = photoCanvas.getContext("2d");

    if (ctx) {
      photoCanvas.width = videoRef.current.videoWidth;
      photoCanvas.height = videoRef.current.videoHeight;

      ctx.drawImage(videoRef.current, 0, 0, photoCanvas.width, photoCanvas.height);

      const data = photoCanvas.toDataURL("image/jpeg", 1.0);
      setPhotoData(data);
      setShowModal(true);
    }
  };

  const confirmPhoto = () => {
    localStorage.setItem("capturedPhoto", photoData!);
    Swal.fire({
      title: "Photo Saved!",
      text: "Now let's choose your beauty style.",
      icon: "success",
      timer: 2000,
      showConfirmButton: false,
      willClose: () => {
        window.location.href = "/select";
      },
    });
  };

  const retakePhoto = () => {
    setPhotoData(null);
    setShowModal(false);
  };

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
          <canvas
            ref={canvasRef}
            className="absolute top-0 left-0 w-full h-full pointer-events-none"
          />
          <button
            className="absolute bottom-4 right-4 bg-blue-500 hover:bg-blue-700 
                      text-white font-bold py-3 px-6 rounded-full shadow-lg 
                      flex items-center gap-2 transition-colors z-10 hover:cursor-pointer"
            onClick={takePhoto}
          >
            <FaCamera size={20} /> Snap!
          </button>
        </div>

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

export default CameraVerticalPage;
