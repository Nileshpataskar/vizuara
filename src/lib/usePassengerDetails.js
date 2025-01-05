import { create } from "zustand";

const usePassengerDetailsStore = create((set, get) => ({
  selectedFlight: {
    fromLocation: "",
    toLocation: "",
    departureTime: "",
    arrivalTime: "",
    flightDuration: "",
    flightNo: "",
    layover: "",
    price: "",
    logo: "",
  }, // to hold the selected flight details
  setSelectedFlight: (flightDetails) => set({ selectedFlight: flightDetails }),

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

  passengers: [
    {
      id: 1,
      firstName: "",
      lastName: "",
      email: "",
      capturedImages: [],
      isApproved: false,
    },
    {
      id: 2,
      firstName: "",
      lastName: "",
      email: "",
      capturedImages: [],
      isApproved: false,
    },
  ],

  updatePassengerDetails: (id, field, value) =>
    set((state) => ({
      passengers: state.passengers.map((passenger) =>
        passenger.id === id ? { ...passenger, [field]: value } : passenger
      ),
    })),

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

  approvePassenger: (id) =>
    set((state) => ({
      passengers: state.passengers.map((passenger) =>
        passenger.id === id ? { ...passenger, isApproved: true } : passenger
      ),
    })),

  // Verification image state
  verificationImage: [],

  addVerificationImage: (image) =>
    set((state) => ({
      verificationImage: [...state.verificationImage, image],
    })),

  updatePassengerApproval: (id) => {
    set((state) => ({
      passengers: state.passengers.map((p) =>
        p.id === id ? { ...p, isApproved: true } : p
      ),
    }));
  },
}));

export { usePassengerDetailsStore };
