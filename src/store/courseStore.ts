import { create } from "zustand";
import { CourseType } from "../types";

type CourseStore = {
  selectedCourse: CourseType | null;
  setSelectedCourse: (course: CourseType | null) => void;
};

export const useCourseStore = create<CourseStore>((set) => ({
  selectedCourse: null,
  setSelectedCourse: (course) => set({ selectedCourse: course })
}));
