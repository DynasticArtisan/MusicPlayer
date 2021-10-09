//const express = require('express')
import express from 'express'
import userService from "../services/userService";




class userController {
    async registration(req :express.Request, res :express.Response, next :express.NextFunction){
        try {
            const {email, password} = req.body
            const userData = await userService.registration(email, password)
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30*24*60*60*1000, httpOnly:true})
            return res.json(userData)
            
        } catch (e) {
            next(e)
            
        }
    }
    
    async activate(req :express.Request, res :express.Response, next :express.NextFunction) {
        try {
            console.log('activation')

            const activationLink = req.params.activationLink;
            console.log(activationLink)
            await userService.activate(activationLink)
            return res.redirect(process.env.CLIENT_URL || 'http://localhost:3000')
        } catch (e) {
            next(e)
        }
    }

    async login(req :express.Request, res :express.Response, next :express.NextFunction){
        try {
            const {email, password} = req.body
            const userData = await userService.login(email, password)
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30*24*60*60*1000, httpOnly:true})
            return res.json(userData)
        } catch (e) {
            next(e)
        }


    }

    async logout (req :express.Request, res :express.Response, next :express.NextFunction){
        try {
            const {refreshToken} = req.cookies
            const token = await userService.logout(refreshToken)
            res.clearCookie('refreshToken')
            return res.json(token)
        } catch (e) {
            next(e)
        }
    }

    async refresh(req :express.Request, res :express.Response, next :express.NextFunction){
        try {
            const {refreshToken} = req.cookies
            const userData = await userService.refresh(refreshToken)
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30*24*60*60*1000, httpOnly:true})
            return res.json(userData)
        } catch (e) {
            next(e)
        }
    }

}

module.exports = new userController()