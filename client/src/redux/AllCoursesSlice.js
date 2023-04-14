import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
  courseList: [],
  teacherList: [],
  currentCourse: {},
  selectedCourse: null,
  coursesCount: 0,
};

export const allCoursesSlice = createSlice({
  name: "allCoursesSlice",
  initialState,
  reducers: {
    setAllCoursesData: (state, action) => {
       state.courseList = action.payload;
    },
    appendCoursesData: (state, action) =>{
      state.courseList = [...state.courseList, ...action.payload]
    },
    setTeacherList: (state, action) => {
      state.teacherList = action.payload;
    },
    setCurrentCourse: (state, action) => {
      state.currentCourse = action.payload;
    },
    setCoursesCount: (state, action) => {
      state.coursesCount = action.payload
    },
    selectCourse: (state, action) =>{
      state.selectedCourse = action.payload
    },
    resetSelectCourse: (state, action) =>{
      state.selectedCourse = null
    },
    resetAllCoursesSlice: () => initialState
  },
});

export const {
  setAllCoursesData,
  setTeacherList,
  setCurrentCourse,
  resetAllCoursesSlice,
  selectCourse,
  resetSelectCourse,
  appendCoursesData,
  setCoursesCount
} = allCoursesSlice.actions;

export default allCoursesSlice.reducer;
