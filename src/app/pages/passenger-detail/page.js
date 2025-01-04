"use client";

import React, { useRef, useState } from "react";
import Webcam from "react-webcam";
import { Button } from "@/components/ui/button";
import { TextField } from "@mui/material";
import { Camera01Icon } from "hugeicons-react";
import { Progress } from "@/components/ui/progress";
import Image from "next/image";
import { usePassengerDetailsStore } from "@/lib/usePassengerDetails";

const Page = () => {
  const webcamRef = useRef(null);
  const [isCameraOpen, setIsCameraOpen] = useState(null); // Track which person's camera is open
  const [progress, setProgress] = useState(0); // Track progress for the progress bar

  const passengers = usePassengerDetailsStore((state) => state.passengers);
  const updatePassengerDetails = usePassengerDetailsStore(
    (state) => state.updatePassengerDetails
  );
  const addCapturedImagesForPassenger = usePassengerDetailsStore(
    (state) => state.addCapturedImagesForPassenger
  );

  // Capture multiple images for a specific passenger
  const captureImages = (id) => {
    let count = 0;
    setProgress(0); // Reset progress
    clearCapturedImagesForPassenger(id); // Clear previous images for this passenger

    const interval = setInterval(() => {
      if (webcamRef.current) {
        const imageSrc = webcamRef.current.getScreenshot();
        addCapturedImagesForPassenger(id, [imageSrc]); // Add image to Zustand incrementally
      }

      count++;
      setProgress((prev) => Math.min((count / 20) * 100, 100)); // Update progress bar

      if (count === 20) {
        clearInterval(interval);
        setIsCameraOpen(null); // Stop capturing after 20 images
      }
    }, 100); // Capture every 100ms (20 images in 2 seconds = 100ms per image)
  };

  // Clear captured images for a specific passenger
  const clearCapturedImagesForPassenger = (id) => {
    addCapturedImagesForPassenger(id, []); // Clears images for this passenger
  };

  return (
    <div className="w-full min-h-screen flex py-10 justify-center">
      <div className="w-[30%] h-fit p-8 bg-[#f5f5f5] rounded-xl flex flex-col items-center space-y-6">
        <h1 className="text-2xl">Enter Details</h1>

        {passengers.map((passenger) => (
          <div key={passenger.id} className="flex flex-col w-full space-y-4">
            <h1 className="text-2xl">Person {passenger.id}</h1>
            <span className="flex space-x-4">
              <TextField
                placeholder="First Name"
                variant="outlined"
                size="small"
                value={passenger.firstName}
                onChange={(e) =>
                  updatePassengerDetails(
                    passenger.id,
                    "firstName",
                    e.target.value
                  )
                }
              />
              <TextField
                placeholder="Last Name"
                variant="outlined"
                size="small"
                value={passenger.lastName}
                onChange={(e) =>
                  updatePassengerDetails(
                    passenger.id,
                    "lastName",
                    e.target.value
                  )
                }
              />
            </span>
            <span className="flex space-x-4 w-full">
              <TextField
                placeholder="Email"
                variant="outlined"
                size="small"
                className="w-full"
                value={passenger.email}
                onChange={(e) =>
                  updatePassengerDetails(passenger.id, "email", e.target.value)
                }
              />
            </span>

            {/* Webcam Section */}
            <div className="border p-4 space-y-4">
              <h3 className="font-semibold text-sm">
                Capture your face from different angles
              </h3>

              {isCameraOpen === passenger.id ? (
                <div className="relative justify-center flex">
                  <Webcam
                    audio={false}
                    ref={webcamRef}
                    screenshotFormat="image/jpeg"
                    className="w-72 rounded-lg "
                  />
                  <Button
                    onClick={() => setIsCameraOpen(null)}
                    className="absolute top-0 right-0 text-red-500"
                  >
                    ✕
                  </Button>
                </div>
              ) : (
                <Button
                  onClick={() => setIsCameraOpen(passenger.id)}
                  className="w-full h-24 hover:bg-[#ccdefd] bg-[#ccdefd]/50 text-blue-800 flex flex-col justify-center"
                >
                  <Camera01Icon size={70} />{" "}
                  {passenger.capturedImages.length > 0
                    ? "Recapture"
                    : "Open Webcam"}
                </Button>
              )}

              {isCameraOpen === passenger.id && (
                <div className="flex justify-center">
                  <Button
                    onClick={() => captureImages(passenger.id)}
                    className=" bg-blue-500 text-white mt-4 w-40"
                  >
                    {passenger.capturedImages.length > 0
                      ? "Re-Capture Images"
                      : "Capture Images"}
                  </Button>
                </div>
              )}

              {/* Progress Bar */}
              {progress > 0 && isCameraOpen === passenger.id && (
                <Progress
                  value={progress}
                  className="mt-4 w-full h-2 bg-gray-300 rounded-lg"
                />
              )}

              {/* Display Captured Images */}
              {passenger.capturedImages.length > 0 && (
                <div className="mt-4 pt-0 p-5 flex h-20 w-full overflow-x-auto overflow-y-hidden gap-2">
                  {passenger.capturedImages.map((img, index) => (
                    <Image
                      key={index}
                      src={img}
                      width={40}
                      height={40}
                      alt={`Captured ${index}`}
                      className="w-10 h-10 rounded-lg"
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default Page;
