import express from 'express'
const ApiError = require('../exeptions/apiError')


module.exports = function(err: any, req :express.Request, res :express.Response, next :express.NextFunction) {
    console.log(err)
    if(err instanceof ApiError){
        return res.status(err.status).json( {message: err.message, errors: err.errors})
    }
    return res.status(500).json({message: 'Непредвиденная ошибка'})
}