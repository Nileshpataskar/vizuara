"use client";

import React, { useRef, useState } from "react";
import Webcam from "react-webcam";
import { Button } from "@/components/ui/button";
import { TextField } from "@mui/material";
import { Camera01Icon } from "hugeicons-react";
import { useImageStore } from "@/lib/useFlightStore";
import { Progress } from "@/components/ui/progress";

const Page = () => {
  const webcamRef = useRef(null);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [progress, setProgress] = useState(0); // Track progress for the progress bar
  const addCapturedImages = useImageStore((state) => state.addCapturedImages);
  const capturedImages = useImageStore((state) => state.capturedImages);

  // Capture multiple images over 4 seconds
  const captureImages = () => {
    let count = 0;
    setProgress(0); // Reset progress

    const interval = setInterval(() => {
      if (webcamRef.current) {
        const imageSrc = webcamRef.current.getScreenshot();
        addCapturedImages([imageSrc]); // Add image to Zustand incrementally
      }

      count++;
      setProgress((prev) => Math.min((count / 20) * 100, 100)); // Update progress bar

      if (count === 20) {
        clearInterval(interval); // Stop capturing after 20 images
      }
    }, 200); // Capture every 200ms (20 images in 4 seconds = 200ms per image)
  };

  return (
    <div className="w-full min-h-screen flex py-10 justify-center">
      <div className="w-[30%] h-fit p-8 bg-[#f5f5f5] rounded-xl flex flex-col items-center space-y-4">
        <h1 className="text-2xl">Enter Details</h1>

        {/* Form Section */}
        <div className="flex flex-col w-full space-y-4">
          <h1 className="text-2xl">Person 1</h1>
          <span className="flex space-x-4">
            <TextField
              placeholder="First Name"
              variant="outlined"
              size="small"
            />
            <TextField
              placeholder="Last Name"
              variant="outlined"
              size="small"
            />
          </span>

          {/* Webcam Section */}
          <div className="border p-4 space-y-4">
            <h3 className="font-semibold text-sm">
              Capture your face from different angles
            </h3>

            {isCameraOpen ? (
              <div className="relative">
                <Webcam
                  audio={false}
                  ref={webcamRef}
                  screenshotFormat="image/jpeg"
                  className="w-full rounded-lg"
                />
                <Button
                  onClick={() => setIsCameraOpen(false)}
                  className="absolute top-0 right-0 text-red-500"
                >
                  ✕
                </Button>
              </div>
            ) : (
              <Button
                onClick={() => setIsCameraOpen(true)}
                className="w-full h-24 hover:bg-[#ccdefd] bg-[#ccdefd]/50 text-blue-800 flex flex-col justify-center"
              >
                <Camera01Icon size={70} /> Open Webcam
              </Button>
            )}

            {isCameraOpen && (
              <Button
                onClick={captureImages}
                className="w-full bg-blue-500 text-white mt-4"
              >
                Capture Images
              </Button>
            )}

            {/* Progress Bar */}
            {progress > 0 && (
              <Progress
                value={progress}
                className="mt-4 w-full h-2 bg-gray-300 rounded-lg"
              />
            )}

            {/* Display Captured Images */}
            {capturedImages.length > 0 && (
              <div className="mt-4 p-5 flex h-20 w-full overflow-x-auto overflow-y-hidden gap-2">
                {capturedImages.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt={`Captured ${index}`}
                    className="w-10 h-10 rounded-lg"
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
