"use client";

import BoardingPass from "@/components/comp/BoardingPass";
import { Button } from "@/components/ui/button";
import { usePassengerDetailsStore } from "@/lib/usePassengerDetails";
import { Tick01Icon } from "hugeicons-react";
import { TicketCheck } from "lucide-react";
import Link from "next/link";
import React from "react";

const BoardingPage = () => {
  const { passengers } = usePassengerDetailsStore();

  return (
    <div className="w-full">
      <div className="flex flex-col m-10 my-20 items-center">
        <h1 className="text-5xl font-semibold text-white">
          Collect your boarding pass
        </h1>

        <div className="flex flex-col space-y-4 mt-20 w-full">
          <span className="flex  space-x-10 items-center justify-center">
            <h1 className="text-lg font-bold text-black">
              {`${passengers[0]?.firstName || "Pasenger 1"} 
              `}
            </h1>

            <BoardingPass />
          </span>
          <span className="flex  space-x-10 items-center justify-center w-full">
          <h1 className="text-lg font-bold text-black">
              {`${passengers[1]?.firstName || "Pasenger 2"} 
              `}
            </h1>
            <BoardingPass />
          </span>
        </div>
        <span className="w-full mt-10 flex justify-center gap-x-5">
          <Button className="bg-gradient-to-br from-[#935bef] font-semibold  to-[#f74e9b] hover:from-[#f74e9b] hover:to-[#935bef] flex space-x-4 text-black items-center">
            <Link href="/pages/self-checkin">Previous</Link>
          </Button>
          <Button className="bg-gradient-to-br from-[#935bef] font-semibold  to-[#f74e9b] hover:from-[#f74e9b] hover:to-[#935bef] flex space-x-4 text-black items-center">
            <Link href="/pages/select-seat">Check in</Link>
          </Button>
        </span>
      </div>
    </div>
  );
};

export default BoardingPage;
