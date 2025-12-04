import { create } from "zustand";
import { Itest } from "../types";

type TestStore = {
  selectedTest: Itest | null;
  setSelectedTest: (test: Itest | null) => void;
};

export const useTestStore = create<TestStore>((set) => ({
  selectedTest: null,
  setSelectedTest: (test) => set({ selectedTest: test })
}));
