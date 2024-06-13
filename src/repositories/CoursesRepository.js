export default class Courses {
  constructor(dao) {
    this.dao = dao;
  }
  getAllCourses = () => {
    return this.dao.getAll();
  };
  getCourseById = (id) => {
    return this.dao.getById(id);
  };
  createCourse = (course) => {
    return this.dao.saveCourse(course);
  };
  //update y delete
  update = (id, course) => {
    return this.dao.updateCourse(id, course);
  };
}
