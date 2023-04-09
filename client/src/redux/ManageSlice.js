import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    studentList: [],
    teacherList: [],
    ministryList: [],
};

export const manageSlice = createSlice({
    name: "manageSlice",
    initialState,
    reducers: {
        setStudentList: (state, action)=>{
            state.studentList = action.payload
        },
        setTeacherList: (state, action)=>{
            state.teacherList = action.payload
        },
        setMinistryList: (state, action)=>{
            state.ministryList = action.payload
        },
        appendStudentList: (state, action) =>{
            state.studentList = [...state.studentList, ...action.payload]
        },
        appendTeacherList: (state, action) =>{
            state.teacherList = [...state.teacherList, ...action.payload]
        },
        appendMinistryList: (state, action) =>{
            state.ministryList = [...state.ministryList, ...action.payload]
        },
        resetManageSlice: () => initialState
    }
});


export const {
  setStudentList,
  setTeacherList,
  setMinistryList,
  resetManageSlice,
  appendMinistryList,
  appendStudentList,
  appendTeacherList,
} = manageSlice.actions;

export default manageSlice.reducer