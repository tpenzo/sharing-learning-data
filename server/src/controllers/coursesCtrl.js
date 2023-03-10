import courseModel from "../models/courseModel.js";

class coursesController {
    //@description     getAllcourse Info
    //@route           [GET] /api/courses/all
    //@body            {page}
    //@access          verifyToken
    async getAllCourses(req, res) {
        try {
            let perPage = 15; //courses displayed for each time call API
            let page = req.params.page || 1;

            const coursesList = await courseModel
                .find()
                .skip(perPage * page - perPage)
                .limit(perPage);

            return res.status(200).json({ message: "successful", data: coursesList });
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
            const course = await courseModel.findOne({_id: courseID})
            if(course){
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
            const { role } = req.body.userLogin;
            const { courseID, semester, schoolYear } = req.body;
            // if(role !== "ministry"){
            //     return res.status(401).json({message: "Don't have permission to access"})
            // }else{
            const course = await courseModel.findOne({
                $and: [
                    { courseID: courseID },
                    { semester: semester },
                    { schoolYear: schoolYear },
                ],
            });
            if (course) {
                res.status(404).json({ message: "This course already created" });
            } else {
                const newCourse = await courseModel.create(req.body);
                return res
                    .status(200)
                    .json({ message: "Course created successfully", data: newCourse });
            }
            // }
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
            const { role } = req.body.userLogin;
            const { courseID, semester, schoolYear } = req.body;
            // if(role !== "ministry"){
            //     return res.status(401).json({message: "Don't have permission to access"})
            // }else{
            const course = await courseModel.findOne({
                $and: [
                    { courseID: courseID },
                    { semester: semester },
                    { schoolYear: schoolYear },
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
                    { $set: req.body } //overide all data
                );
                return res.status(200).json({message: 'update course success', data: updatedCourse})
            } else {
                return res.status(404).json({ message: "Can't find specific course to update" });
            }
            // }
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    //@description     remove a course
    //@route           [DELETE] /api/courses/delete
    //@body            {courseId, semester, schoolYear}
    //@access          verifyToken, role: Ministry
    async removeCourse(req, res) {
        try {
            const { role } = req.body.userLogin;
            const { courseID, semester, schoolYear } = req.body;
            // if(role !== "ministry"){
            //     return res.status(401).json({message: "Don't have permission to access"})
            // }else{
            const course = await courseModel.findOne({
                $and: [
                    { courseID: courseID },
                    { semester: semester },
                    { schoolYear: schoolYear },
                ],
            });
            if (course) {
                const removedCourse = await courseModel.findOneAndDelete({
                    $and: [
                        { courseID: courseID },
                        { semester: semester },
                        { schoolYear: schoolYear },
                    ],
                });
                return res
                    .status(200)
                    .json({
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
            const { userLogin, courseID, schoolYear, semester } = req.body;
            //check available course
            const course = await courseModel.findOne({
                $and: [
                    { courseID: courseID },
                    { semester: semester },
                    { schoolYear: schoolYear },
                ],
            });

            //check if student already in course
            const existedStudent = await courseModel.findOne(
                {
                    $and: [
                        { courseID: courseID },
                        { semester: semester },
                        { schoolYear: schoolYear },
                        { studentList: { $elemMatch: { $eq: userLogin._id } } },
                    ],
                },
            );

            //if course available and student not in course
            if (course) {
                if (existedStudent) {
                    return res.status(404).json("Student already in course");
                } else {
                    const updatedCourse = await courseModel.findOneAndUpdate(
                        {
                            $and: [
                                { courseID: courseID },
                                { semester: semester },
                                { schoolYear: schoolYear },
                            ],
                        },
                        { $push: { studentList: userLogin._id } }
                    );
                    return res
                        .status(200)
                        .json({
                            message: `add student into course with id: ${courseID} successfully`,
                            data: updatedCourse,
                        });
                }
            } else {
                return res
                    .status(404)
                    .json({ message: "Can't find specific course to add" });
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
            const { userLogin, courseID, schoolYear, semester } = req.body;
            //check available course
            const course = await courseModel.findOne({
                $and: [
                    { courseID: courseID },
                    { semester: semester },
                    { schoolYear: schoolYear },
                ],
            });

            //check if student already in course
            const existedStudent = await courseModel.findOne(
                {
                    $and: [
                        { courseID: courseID },
                        { semester: semester },
                        { schoolYear: schoolYear },
                        { studentList: { $elemMatch: { $eq: userLogin._id } } },
                    ],
                },
            );

            //if course available and existed student in course
            if (course) {
                if(!existedStudent){
                    return res.status(404).json({message: "Can't find student to remove"})
                } else {
                    const updatedCourse = await courseModel.findOneAndUpdate(
                        {
                            $and: [
                                { courseID: courseID },
                                { semester: semester },
                                { schoolYear: schoolYear },
                            ],
                        },
                        { $pull: { studentList: userLogin._id } }
                    );
                    return res
                        .status(200)
                        .json({
                            message: `remove student from course with id: ${courseID} successfully`,
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
    async updateTeacherCourse(req, res){
        try {
            const { teacherID, courseID, schoolYear, semester } = req.body;
            //check available course
            const course = await courseModel.findOne({
                $and: [
                    { courseID: courseID },
                    { semester: semester },
                    { schoolYear: schoolYear },
                ],
            });

            if(course){
                const updatedCourse = await courseModel.findOneAndUpdate({
                    $and: [
                        { courseID: courseID },
                        { semester: semester },
                        { schoolYear: schoolYear },
                    ], },
                        {teacher: teacherID});
                
                return res.status(200).json({message: "updata teacher successfull", data: updatedCourse})
            } else {
                return res.status(404).json({message: "Can't find specific course to update teacher"})
            }
        } catch (error) {
            return res.status(500).json({message: error.message})
        }
    }
}

export default new coursesController();
