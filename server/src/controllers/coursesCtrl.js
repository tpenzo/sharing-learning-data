import courseModel from "../models/courseModel.js";
import userModel from "../models/userModel.js";
import chatModel from "../models/chatModel.js"

class coursesController {
  //@description     getAllcourse Info
  //@route           [GET] /api/courses/all
  //@body            {page}
  //@access          verifyToken
  async getAllCourses(req, res) {
    try {
      const coursesCount = await courseModel.countDocuments();
      let perPage = 15; //courses displayed for each time call API
      let {page} = req.params || 1;
      const coursesList = await courseModel
        .find()
        .skip(perPage * page - perPage)
        .limit(perPage)
        .populate("teacher", "fullName")
        .sort({ createdAt: -1 });
      return res.status(200).json({ message: "successful", data: coursesList, coursesCount });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  //@description     get a Course Info by _id
  //@route           [GET] /api/courses/:_courseId
  //@body            {}
  //@access          verifyToken
  async getCourse(req, res) {
    try {
      let courseID = req.params._courseId;
      const course = await courseModel.findOne({ _id: courseID }).populate("studentList teacher", "-password")
      if (course) {
        return res.status(200).json({ message: "successful", data: course });
      } else {
        return res.status(404).json({ message: "Can't find course" });
      }
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  //@description     create a course
  //@route           [POST] /api/courses/create
  //@body            {courseId, description, teacher, chatGroup, studentList,...}
  //@access          verifyToken, role: Ministry
  async createCourse(req, res) {
    try {
      const { courseID, semester, schoolYear, groupNumber, teacher } =
        req.body.course;
      const teacherInfo = await userModel.findById({ _id: teacher });
      const course = await courseModel.findOne({
        $and: [
          { courseID: courseID },
          { semester: semester },
          { schoolYear: schoolYear },
          { groupNumber: groupNumber },
        ],
      });
      if (course) {
        res.status(404).json({ message: "This course already created" });
      } else {
        if (teacherInfo) {
          //create new course
          const newCourse = await courseModel.create(req.body.course);
          //add course managed by teacher
          await userModel.findOneAndUpdate(
            { _id: teacher },
            { $push: { managedCourses: newCourse._id } }
          );
            //add course id for student
          await userModel.updateMany(
            {_id: {$in: newCourse.studentList}},
            {$push: {followingCourses: newCourse._id}}
          );
          return res
            .status(200)
            .json({ message: "Course created successfully", data: newCourse });
        } else {
          res
            .status(404)
            .json({ message: "Can't find teacher to assign course" });
        }
      }
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  //@description     update all info of a course
  //@route           [POST] /api/courses/update
  //@body            {courseId, description, teacher, chatGroup, studentList,...}
  //@access          verifyToken, role: Ministry
  async updateCourse(req, res) {
    try {
      const { courseID, semester, schoolYear, groupNumber, teacher, studentList, _id } =
        req.body.course; //updated course

        //current course
      const course = await courseModel.findOne({
        $and: [
          { courseID: courseID },
          { semester: semester },
          { schoolYear: schoolYear },
          { groupNumber: groupNumber },
        ],
      });
      if (course) {
        //remove course from previous teacher
        await userModel.findOneAndUpdate(
          { _id: course.teacher },
          { $pull: { managedCourses: course._id } }
        );
        //add course for current teacher
        await userModel.findOneAndUpdate(
          { _id: teacher },
          { $push: { managedCourses: course._id } }
        );
        //add new following course for new student
       await userModel.updateMany(
          {
            $and: [
              { _id: { $in: studentList } },
              { _id: { $nin: course.studentList } },
            ],
          },
          { $push: { followingCourses: _id } }
        );

        //remove following course for student
        await userModel.updateMany(
          {
            $and: [
              { _id: { $in: course.studentList } },
              { _id: { $nin: studentList } },
            ],
          },
          { $pull: { followingCourses: _id } }
        );
        
        //update chat group participant ##need update
        const modifiedGroup = await chatModel.findByIdAndUpdate(
          course.chatGroup,
          {$set:{participant: [teacher, ...studentList]}}
        )
        console.log(modifiedGroup, studentList, course.chatGroup);
        const updatedCourse = await courseModel.findOneAndUpdate( 
          { _id: course._id },
          { $set: req.body.course } //overide all data
        );
        return res
          .status(200)
          .json({ message: "update course success", data: updatedCourse });
      } else {
        return res
          .status(404)
          .json({ message: "Can't find specific course to update" });
      }
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  //@description     remove a course
  //@route           [post] /api/courses/delete
  //@body            {courseId, semester, schoolYear}
  //@access          verifyToken, role: Ministry
  async removeCourse(req, res) {
    try {
      const { courseID, semester, schoolYear, groupNumber, teacher, chatGroup } =
        req.body.course;
      const course = await courseModel.findOne({
        $and: [
          { courseID: courseID },
          { semester: semester },
          { schoolYear: schoolYear },
          { groupNumber: groupNumber },
        ],
      });
      if (course) {
        //remove managed course for teacher
        await userModel.findOneAndUpdate(
          { _id: teacher },
          { $pull: { managedCourses: course._id } }
        );

        //remove following courses for student
        await userModel.updateMany(
          {_id: {$in: course.studentList}},
          {$pull: {followingCourses: course._id}}
        );

        //remove course
        const removedCourse = await courseModel.findOneAndDelete({_id: course._id});

        //remove chat group
        await chatModel.findOneAndDelete({_id: chatGroup})
        return res.status(200).json({
          message: `remove course with id: ${courseID} successfully`,
          data: removedCourse,
        });
      } else {
        return res
          .status(404)
          .json({ message: "Can't find specific course to remove" });
      }
      // }
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  //@description     add student into course
  //@route           [POST] /api/courses/addStudent
  //@body            {_id of student, courseID,...}
  //@access          verifyToken, role: ministry, teacher
  async addStudentIntoCourse(req, res) {
    try {
      const { courseId, student_id } = req.body.course;
      //check available course
      const course = await courseModel.findOne({ _id: courseId });
      //check if student already in course
      const existedStudent = await courseModel.findOne({
        $and: [
          { _id: courseId },
          { studentList: { $elemMatch: { $eq: student_id } } },
        ],
      });

      //if course available and student not in course
      if (course) {
        if (existedStudent) {
          return res.status(400).json("Student already in course");
        } else {
          const updatedCourse = await courseModel.findOneAndUpdate(
            { _id: courseId },
            { $push: { studentList: student_id } }
          );
          return res.status(200).json({
            message: `add student into course successfully`,
            data: updatedCourse,
          });
        }
      } else {
        return res
          .status(404)
          .json({ message: "Can't find specific course to add student" });
      }
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  //@description     remove student from course
  //@route           [DELETE] /api/courses/removeStudent
  //@body            {_id of student, courseID,...}
  //@access          verifyToken, role: ministry, teacher
  async removeStudentFromCourse(req, res) {
    try {
      const { courseId, student_id } = req.body.course;
      //check available course
      const course = await courseModel.findOne({ _id: courseId });

      //check if student already in course
      const existedStudent = await courseModel.findOne({
        $and: [
          { _id: courseId },
          { studentList: { $elemMatch: { $eq: student_id } } },
        ],
      });

      //if course available and existed student in course
      if (course) {
        if (!existedStudent) {
          return res
            .status(404)
            .json({ message: "Can't find student to remove" });
        } else {
          const updatedCourse = await courseModel.findOneAndUpdate(
            { _id: courseId },
            { $pull: { studentList: student_id } }
          );
          return res.status(200).json({
            message: `remove student from course successfully`,
            data: updatedCourse,
          });
        }
      } else {
        return res
          .status(404)
          .json({ message: "Can't find specific course to remove student" });
      }
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  //@description     update teacher for a course
  //@route           [POST] /api/courses/updateTeacher
  //@body            {teacherID (_id of user teacher), courseID,...}
  //@access          verifyToken, role: ministry
  async updateTeacherCourse(req, res) {
    try {
      const { teacherID, courseID, schoolYear, semester } = req.body.course;
      //check available course
      const course = await courseModel.findOne({
        $and: [
          { courseID: courseID },
          { semester: semester },
          { schoolYear: schoolYear },
          { groupNumber: groupNumber },
        ],
      });

      if (course) {
        const updatedCourse = await courseModel.findOneAndUpdate(
          {
            $and: [
              { courseID: courseID },
              { semester: semester },
              { schoolYear: schoolYear },
            ],
          },
          { teacher: teacherID }
        );

        return res
          .status(200)
          .json({ message: "updata teacher successfull", data: updatedCourse });
      } else {
        return res
          .status(404)
          .json({ message: "Can't find specific course to update teacher" });
      }
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
}

export default new coursesController();
