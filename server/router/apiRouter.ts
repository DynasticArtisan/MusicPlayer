import express from 'express'
import trackRouter from './trackRouter'
import userRouter from './userRouter'
import authMiddleware from '../middlewares/authMiddleware'

const apiRouter :express.Router = express.Router()

apiRouter.use('/user', userRouter)
apiRouter.use('/track', authMiddleware, trackRouter)



export default apiRouter