import { create } from "zustand";

type FormName = 
  | "login"
  | "register"
  | "profile"
  | "changePassword"
  | "editProduct"
  |  "dynamicForm"
  | "dynamicFormAddCourse"
  | "dynamicFormEditCourse"
  | null;

interface UIState {
  currentForm: FormName;
  currentData: Record<string, unknown> | undefined;
  openForm: (name: FormName, data?: Record<string, unknown>) => void;
  closeForm: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  currentForm: null,
  currentData: undefined,

  openForm: (name, data) => {
    set({ currentForm: name, currentData: data })
  },
  closeForm: () => set({ currentForm: null, currentData: undefined}),
}));
