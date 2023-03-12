import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    courseList: [],
    teacherList: [],
    currentCourse: {}
};

export const allCoursesSlice = createSlice({
    name: "allCoursesSlice",
    initialState,
    reducers: {
        setAllCoursesData: (state, action) => {
            state.courseList = action.payload;
        },
        setTeacherList: (state, action) => {
            state.teacherList = action.payload
        },
        addStudentIntoCourse: (state, action) =>{
            state.currentCourse = {
                ...state.currentCourse,
                studentList: [...studentList, action.payload]
            }
        },
        removeStudentFromCourse: (state, action) => {
            state.currentCourse = {
                ...state.currentCourse,
                studentList: state.currentCourse.studentList.filter((student) => student !== action.payload )
            }
        },
        
    }
});


export const {setAllCoursesData, addStudentIntoCourse, removeStudentFromCourse, setTeacherList} = allCoursesSlice.actions

export default allCoursesSlice.reducer