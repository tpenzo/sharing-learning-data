import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    courseList: []
};

export const allCoursesSlice = createSlice({
    name: "allCoursesSlice",
    initialState,
    reducers: {
        setAllCoursesData: (state, action) => {
            state.courseList = action.payload;
        },
        addStudentIntoCourse: (state, action) =>{
            state.courseList = {
                ...state.courseList,
                studentList: [...studentList, action.payload]
            }
        },
        removeStudentFromCourse: (state, action) => {
            state.courseList = {
                ...state.courseList,
                studentList: state.courseList.studentList.filter((student) => student !== action.payload )
            }
        },
        
    }
});


export const {setAllCoursesData, addStudentIntoCourse, removeStudentFromCourse, updateTeacherForCourse} = allCoursesSlice.actions

export default allCoursesSlice.reducer