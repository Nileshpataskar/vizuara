import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div>
      <div className="flex w-full item-center justify-center mt-10 flex-col space-y-14">
        {/* Display flight information directly if it's a single object */}
        <div className="flex justify-center">
          <h1 className="text-4xl font-semibold text-white">
            One Last Step to Fly{" "}
          </h1>
        </div>

        <div className="flex justify-center">
          <Button
            variant="contained"
            className=" rounded-xl bg-gradient-to-r font-bold from-[#df63a5] to-[#d56339] text-white "
          >
            Verify Passenger
          </Button>
        </div>
      </div>
    </div>
  );
};

export default page;
