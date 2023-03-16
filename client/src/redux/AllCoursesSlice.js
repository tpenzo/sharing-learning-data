import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    courseList: [],
    teacherList: [],
    currentCourse: {},
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
        setCurrentCourse: (state, action)=>{
            state.currentCourse = action.payload
        },
        removeCourse: (state, action)=>{
            state.courseList = [
                ...state.courseList.filter(
                    (course)=>{
                        return course._id !== action.payload
                    }
                )
            ]
        }
    }
});


export const {setAllCoursesData, setTeacherList, setCurrentCourse, removeCourse } = allCoursesSlice.actions

export default allCoursesSlice.reducer