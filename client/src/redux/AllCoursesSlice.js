import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
  courseList: [],
  teacherList: [],
  currentCourse: {},
  selectedCourse: null
};

export const allCoursesSlice = createSlice({
  name: "allCoursesSlice",
  initialState,
  reducers: {
    setAllCoursesData: (state, action) => {
      state.courseList = action.payload;
    },
    setTeacherList: (state, action) => {
      state.teacherList = action.payload;
    },
    setCurrentCourse: (state, action) => {
      state.currentCourse = action.payload;
    },
    selectCourse: (state, action) =>{
      state.selectedCourse = action.payload
    },
    resetAllCoursesSlice: () => initialState
  },
});

export const {
  setAllCoursesData,
  setTeacherList,
  setCurrentCourse,
  resetAllCoursesSlice,
  selectCourse
} = allCoursesSlice.actions;

export default allCoursesSlice.reducer;
