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

export { useFlightStore };
