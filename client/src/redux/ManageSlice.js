import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    studentList: [],
    teacherList: [],
    ministryList: [],
    studentListTotal: 0,
    teacherListTotal: 0,
    ministryListTotal: 0,
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
        setStudentListTotal: (state, action) =>{
            state.studentListTotal = action.payload
        },
        setTeacherListTotal: (state, action) =>{
            state.teacherListTotal = action.payload
        },
        setMinistryListTotal: (state, action) =>{
            state.ministryListTotal = action.payload
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
  setMinistryListTotal,
  setStudentListTotal,
  setTeacherListTotal
} = manageSlice.actions;

export default manageSlice.reducer