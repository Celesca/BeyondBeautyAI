"use client";

import React, { useRef, useEffect, useState } from "react";
// import { useRouter } from "next/navigation"; // useRouter to handle navigation
import Swal from "sweetalert2";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography } from "@mui/material";
import { FaCamera } from "react-icons/fa6";
import { useNavigate } from "react-router";

const CamerVerticalPage: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const photoRef = useRef<HTMLCanvasElement>(null);
  const [hasPhoto, setHasPhoto] = useState(false);
  const navigate = useNavigate();

  const [orientationAlert, setOrientationAlert] = useState(false);

  const getVideo = () => {
    navigator.mediaDevices
      .getUserMedia({
        video: {
          facingMode: "environment", // Default to back camera on phones
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

    // Set canvas size equal to video stream size
    photo.width = width;
    photo.height = height;

    const ctx = photo.getContext("2d");
    if (ctx) {
      ctx.drawImage(video, 0, 0, width, height);
      setHasPhoto(true);
    }

        // Scroll to confirm group instead of router.push
        document.getElementById('confirm-group')?.scrollIntoView({ behavior: 'smooth' });
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
            navigate('/camera');
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

  const checkOrientation = () => {
    if (window.screen.orientation.type.includes("landscape")) {
      setOrientationAlert(true);
      return false;
    }
    return true;
  }

  useEffect(() => {
    window.addEventListener("orientationchange", () => orientationAlert && checkOrientation());
  }, []);

  useEffect(() => {
    if (checkOrientation()){
      getVideo();
    }
  }, [hasPhoto, orientationAlert]);

  return (
      <div className="min-h-screen w-full py-4 px-2 flex flex-col items-center">

          <Dialog
              open={orientationAlert}
              onClose={() => setOrientationAlert(false)}
          >
            <DialogTitle>
              <Typography variant="h6">
                Please rotate your device to portrait mode.
              </Typography>
            </DialogTitle>

            <DialogContent>
              <DialogContentText>
                Rotate your device to portrait mode to take a photo.
              </DialogContentText>
            </DialogContent>

            <DialogActions>
              <Button onClick={() => setOrientationAlert(false)}>OK</Button>
            </DialogActions>
          </Dialog>

          <div className="w-full flex flex-col gap-2 relative">
              {!hasPhoto && (
                  <video
                      className="min-w-full"
                      ref={videoRef}
                      playsInline
                  ></video>
              )}
              {!hasPhoto && (
                  <Button
                      className="self-center"
                      onClick={takePhoto}
                      variant="contained"
                      startIcon={<FaCamera />}
                  >Snap!</Button>
              )}
          </div>
          <div className={`w-full max-w-full ${hasPhoto ? "visible" : ""}`}>
              <canvas ref={photoRef}></canvas>
          </div>
          {hasPhoto && (
              <div className="w-full mt-1 flex justify-end gap-2" id="confirm-group">
                  <Button variant="outlined" onClick={closePhoto}>
                      RETRY
                  </Button>
                  <Button variant="contained" onClick={confirmPhoto}>
                      CONFIRM
                  </Button>
              </div>
          )}
      </div>
  );
};



export default CamerVerticalPage;