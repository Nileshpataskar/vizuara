"use client";

import React, { useState } from "react";
import { usePassengerDetailsStore } from "@/lib/usePassengerDetails";
import { Airplane01Icon, Ticket01Icon } from "hugeicons-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import Image from "next/image";
import { useFlightStore } from "@/lib/useFlightStore";
import { X } from "lucide-react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const BoardingPass = ({ passengersData }) => {
  const { selectedFlight, selectedSeats } = usePassengerDetailsStore();

  
  const passengers = passengersData;
  const { selectedDate } = useFlightStore();
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const downloadPDF = async () => {
    console.log("download pass");

    const content = document.getElementById("boarding-pass-content");
    if (!content) return;

    const canvas = await html2canvas(content);
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("BoardingPass.pdf");
  };

  // Print Boarding Pass
  const printPass = () => {
    console.log("print pass");
    const content = document.getElementById("boarding-pass-content");
    const printWindow = window.open("", "_blank");
    if (content && printWindow) {
      printWindow.document.open();
      printWindow.document.write(`
        <html>
          <head>
            <title>Print Boarding Pass</title>
            <style>
              body { margin: 0; padding: 0; }
              #print-content { width: 100%; height: 100%; }
            </style>
          </head>
          <body>
            <div id="print-content">${content.outerHTML}</div>
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
    }
  };

  return (
    <div className="flex justify-center items-center relative">
      <Dialog open={open} className="flex justify-center items-center">
        <DialogTrigger
          className="bg-gradient-to-r p-2 rounded-xl h-fit from-[#935bef] font-semibold to-[#f74e9b] hover:from-[#f74e9b] hover:to-[#935bef] flex text-black items-center space-x-4"
          onClick={handleOpen}
        >
          <Ticket01Icon />
          <p>Boarding Pass</p>
        </DialogTrigger>
        <DialogContent
          style={{
            maxWidth: "none",
            maxHeight: "none",
          }}
          className="w-[80%] h-fit p-6 rounded-lg bg-white shadow-lg flex flex-col "
        >
          <DialogTitle className="text-2xl font-normal relative flex justify-center space-x-4">
            <span className="font-semibold text-red-500">
              Boarding Pass Issued
            </span>
            <p className="text-red-500">(Final Approval pending)</p>
            <div
              className="absolute top-1 right-1 cursor-pointer"
              onClick={handleClose}
            >
              <X />
            </div>
          </DialogTitle>

          <div id="boarding-pass-content" className="flex">
            <div className="border-2 border-gray-800 p-2 w-[70%] flex flex-col space-y-4 ">
              <div className="text-blue-600 flex space-x-4 items-center border-b-2 border-gray-800 ">
                <Airplane01Icon size={35} />
                <p className="font-bold text-xl">
                  Boarding Pass (Web Check In)
                </p>
              </div>
              <div className="flex justify-between px-8">
                <h2 className="text-lg font-semibold ">{`${
                  passengersData?.firstName || "First Name"
                } ${passengersData?.lastName || "LastName"} `}</h2>
                <h2 className="text-lg font-semibold ">{`${
                  selectedFlight.fromLocation || "Unknown"
                } To ${selectedFlight.toLocation || "Unknown"} `}</h2>
              </div>

              <div className="flex justify-between px-8">
                <div className="flex flex-col space-y-4 pr-10 pl-4 items-start justify-start border-black border-2">
                  <p className="text-md">Flight: </p>
                  <p className="text-lg font-semibold">
                    {selectedFlight?.flightNumber || "6E 6182"}
                  </p>
                </div>
                <div className="flex flex-col space-y-4 pr-10 pl-4 items-start justify-start border-black border-2">
                  <p className="text-md">Gate </p>
                  <p className="text-lg font-semibold">{"A 21"}</p>
                </div>
                <div className="flex flex-col space-y-4 pr-10 pl-4 items-start justify-start border-black border-2">
                  <p className="text-md">Boarding Time </p>
                  <p className="text-lg font-semibold">
                    {selectedFlight?.time1 || "12:00"}
                  </p>
                </div>
                <div className="flex flex-col space-y-4 pr-10 pl-4 items-start justify-start border-black border-2">
                  <p className="text-md">Boarding </p>
                  <p className="text-lg font-semibold">{"Zone 1"}</p>
                </div>
                <div className="flex flex-col space-y-4 pr-10 pl-4 items-start justify-start border-black border-2">
                  <p className="text-md">Seat </p>
                  <p className="text-lg font-semibold">
                    {selectedSeats.length > 0 ? `${selectedSeats[0]} ` : "1B"}
                  </p>
                </div>
              </div>

              <div className="h-32 px-5 flex space-x-8 relative">
                <div className="flex items-center">
                  <Image
                    src="https://upload.wikimedia.org/wikipedia/commons/d/d0/QR_code_for_mobile_English_Wikipedia.svg"
                    width={180}
                    height={300}
                    alt="qr"
                  />
                </div>
                <div className="flex w-full justify-between mx-16 m-5">
                  <div className="flex flex-col">
                    <span className="flex space-x-6">
                      <p className="text-lg">Date</p>
                      <p className="font-semibold text-lg">
                        {selectedDate || "01/01/2025"}
                      </p>
                    </span>
                    <span className="flex space-x-6">
                      <p className="text-lg">SEQ</p>
                      <p className="font-semibold text-lg">{"0102"}</p>
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="flex space-x-6">
                      <p className="text-lg">Departure</p>
                      <p className="font-semibold text-lg">
                        {selectedFlight?.time1 || "02:00"}
                      </p>
                    </span>
                    <span className="flex space-x-6">
                      <p className="text-lg">Service </p>
                      <p className="font-semibold text-lg">{"NIL"}</p>
                    </span>
                  </div>
                </div>
                {passengers[0]?.isApproved && (
                  <div className="flex items-center absolute right-44 top-10">
                    <Image
                      src="/approved.png"
                      width={180}
                      height={300}
                      alt="approved"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* right */}
            <div className="border-2 border-gray-800 p-2 w-[30%] flex flex-col space-y-4 border-l-0">
              <div className="text-blue-600 flex space-x-2 items-center">
                <p className="font-bold text-xl">
                  Your Departure Terminal is T1
                </p>
                <Airplane01Icon size={35} />
              </div>
              <div className="flex flex-col p-4 space-y-2 justify-center">
                <h2 className="text-lg font-semibold ">{`${
                  passengersData?.firstName || "First Name"
                } ${passengersData?.lastName || "LastName"} `}</h2>

                <h2 className="text-lg font-semibold ">{`${
                  selectedFlight.fromLocation || "Unknown"
                } To ${selectedFlight.toLocation || "Unknown"} `}</h2>

                <span className="flex space-x-4">
                  <p className="text-lg">Flight </p>
                  <p className="text-lg font-semibold">
                    {selectedFlight?.flightNumber || "6E 6182"}
                  </p>
                </span>

                <span className="flex space-x-4">
                  <p className="text-lg">Date </p>

                  <p className="font-semibold text-lg">
                    {selectedDate || "01/01/2025"}
                  </p>
                </span>

                <span className="flex space-x-4">
                  <p className="text-lg">PNR </p>

                  <p className="font-semibold text-lg">
                    {selectedDate || "01/01/2025"}
                  </p>
                </span>

                <div className="flex">
                  <div className="flex items-center space-x-4">
                    <Image
                      src="https://upload.wikimedia.org/wikipedia/commons/d/d0/QR_code_for_mobile_English_Wikipedia.svg"
                      width={120}
                      height={120}
                      alt="qr"
                    />
                    <span>
                      <p></p>
                      <span className="text-lg flex space-x-3">
                        <p>Seat</p>
                        <p className="font-semibold text-lg space-x-3">
                          {selectedSeats.length > 0
                            ? `${selectedSeats[0]} `
                            : "1B"}
                        </p>
                      </span>
                      <span className="text-lg flex space-x-3">
                        <p>SEQ</p>
                        <p className="text-lg font-semibold">{"0102"}</p>
                      </span>
                    </span>
                  </div>
                </div>
              </div>
              <div className="w-full justify-end space-x-4">
                <Button
                  variant="outline"
                  className=" bottom-4 right-4 border-gray-400"
                  onClick={downloadPDF}
                >
                  Download PDF
                </Button>
                <Button
                  variant="outline"
                  className=" bottom-4 right-[10rem] border-gray-400"
                  onClick={printPass}
                >
                  Print
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BoardingPass;
