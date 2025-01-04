import { usePassengerDetailsStore } from "@/lib/usePassengerDetails";
import { Chair01Icon } from "hugeicons-react";

export const Seat = ({ seatNumber }) => {
  const { selectedSeats, setSelectedSeats } = usePassengerDetailsStore();
  const isSelected = selectedSeats.includes(seatNumber);

  return (
    <div
      className={`flex flex-col items-center justify-center p-2 border rounded-lg cursor-pointer ${
        isSelected ? "bg-pink-500 text-white" : "bg-gray-100 text-black"
      }`}
      onClick={() => setSelectedSeats(seatNumber)}
    >
      <Chair01Icon className="w-4 h-4" />
      <span className="text-xs mt-1">{seatNumber}</span>
    </div>
  );
};
