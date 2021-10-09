import express from 'express'
import { registerValidation } from '../middlewares/validations'
const userController = require('../controllers/userController')
const userRouter :express.Router = express.Router()


/*
    @usage: for registration
    @url: http://localhost:5000/api/user/registration
    @method: post
    @fields: email, password
    @access: public
*/
userRouter.post('/registration', registerValidation, userController.registration)

userRouter.get('/activate/:activationLink', userController.activate)

userRouter.post('/login', registerValidation, userController.login)

userRouter.post('/logout', userController.logout)

userRouter.get('/refresh', userController.refresh)

export default userRouter