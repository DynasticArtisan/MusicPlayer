import express from 'express'
import trackService from '../services/trackService'
import userService from '../services/userService';
const apiError = require('../exeptions/apiError')


class trackController {
    async create(req : any, res :express.Response, next :express.NextFunction){
        try {
            const {name, artist} = req.body;
            const user = req.user.id
            const files = req.files;
            if(!name || !artist || !user || !files?.audio || !files?.picture) {
                throw apiError.BadRequest('Недостаточно данных')
            }
            const response = await trackService.create({name, artist, user}, files)
            res.json(response)
        } catch (e) {
            next(e)
        }
    }
    async getOne(){}

    async getUserTracks (req :any, res :express.Response, next :express.NextFunction) {
        try { 
            const userId = req.user.id
            const response = await trackService.getUserTracks(userId)
            res.json(response)
        } catch (e) {
            next(e)
        }
    }

    async getUserLikesTracks (req :any, res :express.Response, next :express.NextFunction) {
        try {
            const userId = req.user.id
            const user = await userService.getUser(userId)
            if(!user){
                throw apiError.BadRequest('Неверный запрос')
            }
            const response = await trackService.getUserLikesTracks(user.likesTracks)
            res.json(response)
        } catch (e) {
            next(e)
        }
    }

    async addUserLikesTrack (req :any, res :express.Response, next :express.NextFunction) {
        try {
            const userId = req.user.id;
            const trackId = req.body.id;
            const track = await trackService.getTrack(trackId);
            if(!track){
                throw apiError.BadRequest('Трек не найден')
            }
            if(track.user == userId){
                throw apiError.BadRequest('Трек уже добавлен')
            }
            const response = await userService.addLikedTrack(userId, trackId)
            res.json(response)
        } catch (e) {
            next(e)
        }
    }
    async removeUserLikesTrack (req :any, res :express.Response, next :express.NextFunction) {
        try {
            const userId = req.user.id;
            const trackId = req.params.id;
            const track = await trackService.getTrack(trackId);
            if(!track){
                throw apiError.BadRequest('Неверный запрос')
            }
            const response = await userService.removeLikedTrack(userId, trackId)
            res.json(response)
        } catch (e) {
            next(e)
        }
    }



    async search(req :express.Request, res :express.Response, next :express.NextFunction){
        const query = req.query.query
        const response = await trackService.search(query)
        res.json(response)
    }
    async delete(req :express.Request, res :express.Response, next :express.NextFunction){
        const id = req.params.id
        const response = await trackService.delete(id)
        res.json(response)
    }
}

module.exports = new trackController()