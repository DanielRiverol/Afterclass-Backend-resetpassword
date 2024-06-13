import courseModel from "../models/courses.js";

export default class Courses {
  constructor() {
    console.log("manager Cursos");
  }

  getAll = async () => {
    const courses = await courseModel.find().lean().populate("students");
    return courses;
  };
  getById = async (id) => {
    const course = await courseModel.findOne({ _id: id }).populate("students");
    return course;
  };
  saveCourse = async (course) => {
    return await courseModel.create(course);
  };

  //implementar el update y el delete
  updateCourse = async (id, course) => {
    let result = await courseModel.updateOne({ _id: id }, { $set: course });
    return result;
  };
}
