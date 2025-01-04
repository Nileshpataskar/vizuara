import { create } from "zustand";

const usePassengerDetailsStore = create((set, get) => ({
  selectedFlight: null, // to hold the selected flight details

  setSelectedFlight: (flightDetails) => set({ selectedFlight: flightDetails }),

  // Seat selection logic
  selectedSeats: [],

  setSelectedSeats: (seat) => {
    const currentSeats = get().selectedSeats;

    if (currentSeats.includes(seat)) {
      set({ selectedSeats: currentSeats.filter((s) => s !== seat) });
    } else {
      if (currentSeats.length < 2) {
        set({ selectedSeats: [...currentSeats, seat] });
      } else {
        set({ selectedSeats: [...currentSeats.slice(1), seat] });
      }
    }
  },

  // Passenger details
  passengers: [
    { id: 1, firstName: "", lastName: "", email: "", capturedImages: [] },
    { id: 2, firstName: "", lastName: "", email: "", capturedImages: [] },
  ],

  updatePassengerDetails: (id, field, value) =>
    set((state) => ({
      passengers: state.passengers.map((passenger) =>
        passenger.id === id ? { ...passenger, [field]: value } : passenger
      ),
    })),

  // Images logic for individual passengers
  addCapturedImagesForPassenger: (id, images) =>
    set((state) => ({
      passengers: state.passengers.map((passenger) =>
        passenger.id === id
          ? {
              ...passenger,
              capturedImages: [...passenger.capturedImages, ...images],
            }
          : passenger
      ),
    })),

  clearCapturedImagesForPassenger: (id) =>
    set((state) => ({
      passengers: state.passengers.map((passenger) =>
        passenger.id === id ? { ...passenger, capturedImages: [] } : passenger
      ),
    })),
}));

export { usePassengerDetailsStore };
