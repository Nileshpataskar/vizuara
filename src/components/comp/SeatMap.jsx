"use client";
import { useFlightSelectionStore } from "@/lib/useFlightStore";
import { Seat } from "./Seat";
import Link from "next/link";
import { Button } from "../ui/button";

const rows = Array.from({ length: 14 }, (_, i) => i + 1);

export const SeatMap = () => {
  const { selectedSeats } = useFlightSelectionStore();

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
      <div className="absolute h-24 w-[400px] bg-white left-52  rotate-[20deg] z-10 ">
        <div className="absolute h-28 w-[200px] bg-white -left-14 top-14 rotate-[100deg] z-10 "></div>
      </div>
      <div className="absolute h-24 w-[400px] bg-white right-52  -rotate-[20deg] z-10 ">
        <div className="absolute h-28 w-[200px] bg-white -right-14 top-14 -rotate-[100deg] z-10 "></div>
      </div>
      {/* Selected Seats */}
      <div className="w-full flex flex-col items-center">
        <div className=" text-black py-2 px-4 rounded-lg  mb-4 flex flex-col">
          <p> Seats: {selectedSeats?.join(", ") || "None"}</p>
          <span className="flex gap-10">
            <Button
              variant="contained"
              className=" rounded-xl bg-gradient-to-r from-[#f374b8] to-[#f28259] text-white "
            >
              <Link href="/pages/passenger-detail">Previous</Link>
            </Button>
            <Button
              variant="contained"
              className=" rounded-xl bg-gradient-to-r from-[#f374b8] to-[#f28259] text-white "
            >
              <Link href="/pages/boarding-pass">Next</Link>
            </Button>
          </span>
        </div>
        <div className="bg-white h-[500px] w-[25%] z-5 -mb-72 mt-20 rounded-full  flex justify-center relative">
          <div className="bg-gray-600 w-[50%] h-16 absolute top-16 rounded-t-lg"></div>
          <div className="bg-gray-600 w-[40%] h-10 absolute top-24 left-16 -rotate-12 rounded-lg"></div>
          <div className="bg-gray-600 w-[40%] h-10 absolute top-24 right-16 rotate-12 rounded-lg"></div>
        </div>
        {/* Seat Layout */}
        <div className="flex w-full gap-6 max-w-[25%] z-10 bg-white rounded-lg  overflow-hidden">
          {/* Left Section: A, B, C */}
          <div className="w-1/2 p-4 ">
            <div className="grid grid-cols-3 gap-4 text-center">
              {rows.map((row) =>
                ["A", "B", "C"].map((col) => (
                  <Seat key={`${row}${col}`} seatNumber={`${row}${col}`} />
                ))
              )}
            </div>
          </div>

          {/* Right Section: D, E, F */}
          <div className="w-1/2 p-4">
            <div className="grid grid-cols-3 gap-4 text-center">
              {rows.map((row) =>
                ["D", "E", "F"].map((col) => (
                  <Seat key={`${row}${col}`} seatNumber={`${row}${col}`} />
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
