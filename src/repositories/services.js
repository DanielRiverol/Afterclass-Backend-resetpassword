import Users from "../dao/dbManagers/users.js";
import Courses from "../dao/dbManagers/courses.js";

import UserRepository from "./UsersRepository.js";
import CoursesRepository from "./CoursesRepository.js";
const userDao= new Users()
//const courseDao= new Courses()

export const userService = new UserRepository(userDao)
export const coursesService = new CoursesRepository(new Courses())
