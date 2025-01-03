import { create } from "zustand";
import { schedule } from "./const";

const useFlightStore = create((set) => ({
  selectedDate: "",
  from: "",
  to: "",
  results: null,

  setFrom: (from) => set({ from }),
  setTo: (to) => set({ to }),
  setSelectedDate: (selectedDate) => set({ selectedDate }),
  setResults: (results) => set({ results }),

  // Validation check for search
  isSearchDisabled: () => {
    return !(
      useFlightStore.getState().from &&
      useFlightStore.getState().to &&
      useFlightStore.getState().selectedDate
    );
  },

  // Simulated search function
  handleSearch: () => {
    const { from, to, selectedDate } = useFlightStore.getState();

    console.log(`Searching flights from ${from} to ${to} on ${selectedDate}`);

    // Simulate fetching data
    const filteredResults = schedule.filter(
      (flight) => flight.time1 && flight.time2
    );

    // Setting results
    useFlightStore.getState().setResults(filteredResults);
  },
}));

const useFlightSelectionStore = create((set, get) => ({
  selectedFlight: null, // to hold the selected flight details

  setSelectedFlight: (flightDetails) => set({ selectedFlight: flightDetails }),

  // You can later add other properties related to the seat selection here
  selectedSeats: [],

  setSelectedSeats: (seat) => {
    const currentSeats = get().selectedSeats;

    if (currentSeats.includes(seat)) {
      // If the seat is already selected, unselect it
      set({ selectedSeats: currentSeats.filter((s) => s !== seat) });
    } else {
      // If the seat is not selected
      if (currentSeats.length < 2) {
        // Add the seat if less than 2 are selected
        set({ selectedSeats: [...currentSeats, seat] });
      } else {
        // If 2 seats are already selected, remove the first and add the new seat
        set({ selectedSeats: [...currentSeats.slice(1), seat] });
      }
    }
  },
}));

const useImageStore = create((set) => ({
  capturedImages: [],

  // Action to add images to the store
  addCapturedImages: (images) =>
    set((state) => ({ capturedImages: [...state.capturedImages, ...images] })),

  // Clear images (optional)
  clearCapturedImages: () => set({ capturedImages: [] }),
}));

export default useImageStore;

export { useFlightStore, useFlightSelectionStore, useImageStore };
