"use client";

import { Button } from "@/components/ui/button";
import { validateUser } from "@/hooks/validateUser";
import { usePassengerDetailsStore } from "@/lib/usePassengerDetails";
import Image from "next/image";
import React, { useRef, useState, useEffect } from "react";
import Webcam from "react-webcam";

const SelfCheckin = () => {
  const webcamRef = useRef(null);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState(null);
  const [verificationInProgress, setVerificationInProgress] = useState(false);

  const {
    verificationImage,
    addVerificationImage,
    passengers,
    updatePassengerApproval, // Add a method to update passenger approval
  } = usePassengerDetailsStore();

  useEffect(() => {
    // Clean up webcam if the component unmounts
    return () => {};
  }, []);

  const captureVerificationImage = () => {
    setIsCameraOpen(true); // Open camera
    setLoading(true); // Start loading

    setTimeout(() => {
      if (webcamRef.current) {
        const imageSrc = webcamRef.current.getScreenshot(); // Capture image from webcam
        addVerificationImage(imageSrc); // Add image to Zustand store

        setIsCameraOpen(false);
        setLoading(false);
        handleImageValidation();
      }
    }, 3000); // Capture image after a short delay
  };

  const handleImageValidation = async () => {
    setVerificationInProgress(true);

    try {
      let matchedPassenger = null;

      for (const passenger of passengers) {
        if (verificationImage.length && passenger?.capturedImages.length) {
          const result = await validateUser(
            verificationImage[0],
            passenger.capturedImages[0]
          );

          if (result) {
            matchedPassenger = passenger;
            break;
          }
        }
      }

      if (matchedPassenger) {
        setVerificationStatus(`approved: ${matchedPassenger.id}`);
        updatePassengerApproval(matchedPassenger.id); // Update the passenger approval
      } else {
        setVerificationStatus("not_verified");
      }
    } catch (e) {
      console.log("Error during validation:", e);
      setVerificationStatus("not_verified");
    }
    console.log("Passenger approval",passengers)

    setVerificationInProgress(false);
  };

  const handleVerifyClick = () => {
    if (verificationInProgress) return;
    captureVerificationImage();
  };

  return (
    <div className="flex w-full items-center justify-center mt-10 flex-col space-y-14">
      <div className="flex justify-center">
        <h1 className="text-4xl font-semibold text-white">
          One Last Step to Fly
        </h1>
      </div>


      

      <div className="flex justify-center w-full flex-col space-y-10 items-center">
        <Button
          variant="contained"
          onClick={handleVerifyClick}
          className="rounded-xl bg-gradient-to-r font-bold from-[#df63a5] to-[#d56339] text-white"
        >
          {verificationInProgress ? "Verifying..." : "Verify Passenger"}
        </Button>

        {isCameraOpen && (
          <div className="relative mt-6 w-fit flex flex-col space-y-8">
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              className="w-[600px] rounded-xl"
            />
            <h1 className="text-xl font-semibold text-center animate-ping text-white">
              Capturing Image...
            </h1>
            <Button
              onClick={() => setIsCameraOpen(false)}
              className="absolute top-2 right-2 text-blue-500 bg-transparent hover:bg-transparent/25 border-2 border-gray-400"
            >
              ✕
            </Button>
          </div>
        )}

        {verificationInProgress && (
          <div className="mt-6 flex flex-col items-center">
            <div
              className="spinner-border animate-spin text-white"
              role="status"
            >
              <span className="sr-only">Loading...</span>
            </div>
            <h2 className="text-xl font-semibold text-white mt-2">
              Verifying...
            </h2>
          </div>
        )}

        {verificationStatus && !verificationInProgress && (
          <div className="mt-6">
            <h2 className="text-xl font-semibold text-white">
              {verificationStatus === "not_verified"
                ? "Not Verified Try Again..."
                : `Approved - Passenger ID: ${verificationStatus.split(": ")[1]}`}
            </h2>

            {verificationStatus !== "not_verified" && (
              <div className="text-white mt-4">
                <h3 className="font-semibold">Passenger Details</h3>
                <p>
                  Name:{" "}
                  {
                    passengers.find(
                      (p) => p.id === parseInt(verificationStatus.split(": ")[1])
                    )?.firstName
                  }{" "}
                  {
                    passengers.find(
                      (p) => p.id === parseInt(verificationStatus.split(": ")[1])
                    )?.lastName
                  }
                </p>
                <p>
                  Email:{" "}
                  {
                    passengers.find(
                      (p) => p.id === parseInt(verificationStatus.split(": ")[1])
                    )?.email
                  }
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SelfCheckin;
