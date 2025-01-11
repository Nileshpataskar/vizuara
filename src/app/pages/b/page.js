"use client";

import BoardingPass from "@/components/comp/BoardingPass";
import { Button } from "@/components/ui/button";
import { usePassengerDetailsStore } from "@/lib/usePassengerDetails";
import Link from "next/link";
import React from "react";

const Page = () => {
  const { passengers } = usePassengerDetailsStore();
  return (
    <div className="w-full h-full">
      <div className="w-full my-20 gap-y-10 flex flex-col justify-center items-center ">
        <span className="flex space-x-5">
          <h1>{`${passengers[0]?.firstName || "First Name"}`}</h1>
          <BoardingPass passengersData={passengers[0]} />
        </span>
        <span className="flex space-x-5">
          <h1>{`${passengers[1]?.firstName || "First Name"}`}</h1>
          <BoardingPass passengersData={passengers[1]} />
        </span>

        <div className="flex space-x-4 mt-4">
          <Button className="bg-gradient-to-r p-2 rounded-xl h-fit from-[#935bef] font-semibold to-[#f74e9b] hover:from-[#f74e9b] hover:to-[#935bef] flex text-black items-center space-x-4">
            <Link href="/pages/select-seat">Previous</Link>
          </Button>
          <Button className="bg-gradient-to-r p-2 rounded-xl h-fit from-[#935bef] font-semibold to-[#f74e9b] hover:from-[#f74e9b] hover:to-[#935bef] flex text-black items-center space-x-4">
            <Link href="/pages/self-checkin">Checkin</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Page;
