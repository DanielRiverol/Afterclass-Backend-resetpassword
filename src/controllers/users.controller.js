import MailingService from "../services/mailing.js";
import { coursesService, userService } from "../repositories/services.js";
import { generateToken, validateToken } from "../utils.js";
//import { use } from "passport";
const getUsers = async (req, res) => {
  let users = await userService.getAll();
  if (!users)
    return res.status(500).send({
      status: "error",
      error: "Couldn't get users due to internal error",
    });
  res.send({ status: "success", payload: users });
};

const createUser = async (req, res) => {
  let { first_name, last_name, dni, email, birthDate, gender } = req.body;
  if (!first_name || !last_name || !dni || !email || !birthDate)
    return res
      .status(400)
      .send({ status: "error", error: "Incomplete values" });
  //Muy importante! La inserción actual de la fecha de nacimiento está pensada para hacerse en el formato MM - DD - YYYY. De otra forma, arrojará un error.
  let result = await userService.createUser({
    first_name,
    last_name,
    email,
    dni,
    birthDate,
    gender,
  });
  if (!result)
    return res.status(500).send({ status: "success", payload: result });
  res.send({ status: "success", payload: result });
};

const registerUserToCourse = async (req, res) => {
  const { uid, cid } = req.params;
  const course = await coursesService.getCourseById(cid);
  if (!course)
    return res.status(404).send({ status: "error", error: "Course not found" });
  const user = await userService.getBy({ _id: uid });
  if (!user)
    return res.status(404).send({ status: "error", error: "User not found" });
  //checamos si el usuario ya tenía ese curso registrado
  let courseExists = user.courses.some((c) => c._id.toString() === cid);
  if (courseExists)
    return res.status(400).send({
      status: "error",
      error: "The user is already registered in this course",
    });
  //Si todo está bien, insertamos de ambos lados.
  user.courses.push(course._id);
  course.students.push(user._id);
  await userService.update(uid, user);
  await coursesService.update(cid, course);
  const mailer = new MailingService();
  const result = await mailer.sendSimpleMail({
    from: "CoderTests",
    to: user.email,
    subject: "Curso registrado",
    html: `<div><h1>¡Felicidades!</h1>
        <p> Bienvenido al curso ${course.title}. Esperamos que lo pases muy bien y aprendas mucho</p>
        </div>`,
  });
  console.log(result);
  res.send({ status: "success", message: "User added to course" });
};

//recuepro
const recuperarContrasena = async (req, res) => {
  const { email } = req.body;
  const user = await userService.getBy({ email });
  if (!user)
    return res.status(404).send({ status: "error", error: "User not found" });
  const token = generateToken(user._id);

  const mailingService = new MailingService();
  const correoOptions = {
    from: "Coder Test",
    to: user.email,
    subject: "Recuperación de contraseña",
    html: `
      <p>Por favor, haz clic en el siguiente enlace para recuperar tu contraseña:</p>
      <a href="http://localhost:8080/api/users/reset-password/${token}">Recuperar Contraseña</a>
    `,
  };

  await mailingService.sendSimpleMail(correoOptions);

  res.status(200).send("Conrreo enviado");
};
const recuperarContrasenaToken = async (req, res) => {
  const token = req.params.token;

  const decodedToken = validateToken(token);
  if (!decodedToken) return res.redirect("/api/users/reset-password");

  res.redirect("/api/users/reset-password");
};
const updatePassword = async (req, res) => {
  const { userId, newPassword } = req.body;

  const result = await userService.updatePassword(userId, newPassword);
  res
    .status(200)
    .send({ status: "success", message: "Password updated successfully" });
};
export default {
  getUsers,
  createUser,
  registerUserToCourse,
  updatePassword,
  recuperarContrasena,
  recuperarContrasenaToken,
};
