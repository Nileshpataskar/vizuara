import { create } from "zustand";

const useVerificationStore = create((set, get) => ({
  userMappings: {}, // Store mapping of face descriptors to user names

  // Add a mapping of face descriptor to user name
  mapImageToUser: (descriptor, name) => {
    set((state) => ({
      userMappings: {
        ...state.userMappings,
        [JSON.stringify(descriptor)]: name, // Key is the stringified descriptor
      },
    }));
  },

  // Retrieve all mappings
  getUserMappings: () => get().userMappings,
}));

export default useVerificationStore;
