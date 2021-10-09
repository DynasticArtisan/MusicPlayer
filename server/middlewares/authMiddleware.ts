import express from 'express'
import tokenService from '../services/tokenService';

export default function( req :any, res :express.Response, next :express.NextFunction ) {
    try {
        const authorizationHeader = req.headers.authorization;
        if(!authorizationHeader){
            return res.status(403).json('Auth errror')
        }
        const accessToken = authorizationHeader.split(' ')[1]
        if(!accessToken){
            return res.status(403).json('Auth errror')
        }
        const userData = tokenService.validateAccessToken(accessToken)
        if(!userData){
            return res.status(403).json('Auth errror') 
        }
        req.user = userData
        next()
    } catch (e) {
        return res.status(403).json('Auth errror')
    }
}