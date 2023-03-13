  //mapping format for excel file
  export const inputStudentSchema = {
    STT: {
      prop: "stt",
      type: String,
    },
    "HO VA TEN": {
      prop: "fullName",
      type: String,
      required: true,
    },
    MSSV: {
      prop: "studentCode",
      type: String,
      required: true,
    },
  };