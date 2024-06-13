import {Router} from 'express';
import usersController from '../controllers/users.controller.js';

const router = Router();

router.get('/',usersController.getUsers)

router.post('/',usersController.createUser)

router.post('/:uid/courses/:cid',usersController.registerUserToCourse);


//recupero
router.post('/reset-password', usersController.recuperarContrasena)
router.get('/reset-password/:token', usersController.recuperarContrasenaToken)
router.get('/reset-password', usersController.updatePassword)

export default router;