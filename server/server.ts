require('dotenv').config()
const fileUpload = require('express-fileupload')
import express from 'express'
import mongoose from 'mongoose'
import apiRouter from './router/apiRouter'
const cors = require('cors')
const coockieParser = require('cookie-parser')
const errorsMiddleware = require('./middlewares/errorsMiddleware')
const PORT = process.env.PORT 
const app :express.Application = express()


const start = async () => {
    try {
        console.log('try to connect...')
        await mongoose.connect('mongodb+srv://SangerkriegMongoUser:br56udyBQ4Iu92gZ@cluster0.wmxbo.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
        console.log('db connected ')
        app.use(fileUpload({
            limits: { fileSize: 50 * 1024 * 1024 }
        }))
        app.use(express.static('static'))
        app.use(express.json())
        app.use(coockieParser())
        app.use(cors({
            credentials: true,
            origin: process.env.CLIENT_URL
        }))
        app.use(express.urlencoded({extended:false}))
        app.use('/api', apiRouter)
        app.use(errorsMiddleware)
        app.listen(PORT, ()=>{
            console.log(`Server started on port: ${PORT}`)
        })

    } catch (e) {
        console.log(e)
    }
}

start()







