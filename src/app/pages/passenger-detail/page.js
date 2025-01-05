"use client";

import React, { useRef, useState } from "react";
import Webcam from "react-webcam";
import { Button } from "@/components/ui/button";
import { TextField } from "@mui/material";
import { Camera01Icon } from "hugeicons-react";
import { Progress } from "@/components/ui/progress";
import Image from "next/image";
import { usePassengerDetailsStore } from "@/lib/usePassengerDetails";
import Link from "next/link";

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
  const clearCapturedImagesForPassenger = usePassengerDetailsStore(
    (state) => state.clearCapturedImagesForPassenger
  );

  // Check if all fields for a passenger are filled
  const isAllFieldsFilled = (passenger) => {
    return (
      passenger.firstName !== "" &&
      passenger.lastName !== "" &&
      passenger.email !== ""
    );
  };

  // Capture multiple images for a specific passenger
  const captureImages = (id) => {
    let count = 0;
    const totalImages = 20; // Capture 5 images over 5 seconds
    setProgress(0); // Reset progress bar
    clearCapturedImagesForPassenger(id); // Clear any previously captured images

    // Set the interval to capture images at a 1-second interval
    const interval = setInterval(() => {
      if (webcamRef.current) {
        const imageSrc = webcamRef.current.getScreenshot(); // Capture image from webcam
        addCapturedImagesForPassenger(id, [imageSrc]); // Add the captured image to Zustand state
      }

      count++; // Increment the count for each captured image
      setProgress((prev) => Math.min((count / totalImages) * 100, 100)); // Update progress bar

      if (count === totalImages) {
        clearInterval(interval); // Stop capturing after 5 images
        setIsCameraOpen(false); // Close the camera once done
      }
    }, 100); // Capture one image every 1000ms (1 second)
  };

  // Check if all passengers' fields are filled
  const isNextButtonEnabled = passengers.every(isAllFieldsFilled);

  return (
    <div
      className="relative bg-gradient-to-r from-orange-400 to-purple-500 min-h-screen flex flex-col items-center justify-center"
      style={{
        backgroundImage:
          "url('https://i0.wp.com/allpicts.in/wp-content/uploads/2016/03/Airplane-Images-with-Beautiful-Picture-of-Flight-in-Sunset.jpg?w=2280&ssl=1')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
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
                    updatePassengerDetails(
                      passenger.id,
                      "email",
                      e.target.value
                    )
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
                      onClick={() => {
                        clearCapturedImagesForPassenger(passenger.id); // Clear previous images
                        captureImages(passenger.id); // Start capturing new images
                      }}
                      className="bg-blue-500 text-white mt-4 w-40"
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
                    className="mt-4 w-full h-2 bg-green-500 rounded-lg" // Changed to green
                  />
                )}

                {/* Display Captured Images */}
                {passenger.capturedImages.length > 0 && (
                  <div className="mt-4 pt-0 p-5 flex h-20 w-full overflow-x-auto overflow-y-hidden gap-2">
                    {passenger.capturedImages.map(
                      (img, index) =>
                        img ? (
                          <Image
                            key={index}
                            src={img} // Ensure this is a valid URL
                            width={40}
                            height={40}
                            alt={`Captured ${index}`}
                            className="w-10 h-10 rounded-lg"
                          />
                        ) : null // Don't render if img is an empty string
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}

          {/* Previous and Next Buttons */}
          <div className="flex space-x-4 mt-4">
            <Button className="bg-gray-500 text-white">
              <Link href="/pages/search-flight">Previous</Link>
            </Button>
            <Button
              className="bg-blue-500 text-white"
              disabled={!isNextButtonEnabled} // Disable if not all fields are filled
            >
              <Link href="/pages/select-seat">Next</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
