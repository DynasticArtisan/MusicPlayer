import { Schema } from 'mongoose';
import User, { UserType } from './../models/UserModel';
import bcrypt from 'bcrypt'
const uuid = require('uuid')
import mailService from './mailService'
import tokenService from './tokenService'
import UserDto from '../dtos/userDto'
import { UserIDJwtPayload } from 'jsonwebtoken';
const apiError = require('../exeptions/apiError')


class userService {
    async registration (email :string, password :string){
        const candidate = await User.findOne({email})
        if(candidate){
            throw apiError.BadRequest(`Пользователь с адрессом ${email} уже существует`)
        }
        const hashPassword = await bcrypt.hash(password, 8)
        const activationLink = uuid.v4()
        const user = await User.create({email, password: hashPassword, activationLink})
        await mailService.sendActivationMail(email, process.env.API_URL+'api/user/activate/'+activationLink)
        const userDto = new UserDto(user)
        const tokens = tokenService.generateTokens({...userDto})
        await tokenService.saveToken(userDto.id, tokens.refreshToken)
        return {
            ...tokens, user: userDto
        }
    }
    
    async activate (activationLink :string){
        const user = await User.findOne({activationLink})
        if(!user){
            throw apiError.BadRequest('Некоректная ссылка')
        }
         user.isActivated = true
         user.save()
    }

    async login(email :string, password :string){
        const user = await User.findOne({email})
        if(!user){
            throw apiError.BadRequest('Неверный адрес электронной почты или пароль')
        }
        const isPaswordEqual = await bcrypt.compare(password, user.password)
        if(!isPaswordEqual){
            throw apiError.BadRequest('Неверный адрес электронной почты или пароль')
        }
        const userDto = new UserDto(user)
        const tokens = tokenService.generateTokens({...userDto})
        await tokenService.saveToken(userDto.id, tokens.refreshToken)
        return {
            ...tokens, user: userDto
        }
    }

    async logout(refreshToken :string) {
        const token = await tokenService.removeToken(refreshToken)
        return token
    }

    async refresh(refreshToken :string){
        if(!refreshToken){
            throw apiError.UnauthorizedError()
        }
        const userData = tokenService.validateRefreshToken(refreshToken)
        const tokenData = tokenService.findToken(refreshToken)
        if(!userData || !tokenData) {
            throw apiError.UnauthorizedError()
        }
        const user = await User.findById(userData.id)
        const userDto = new UserDto(user)
        const tokens = tokenService.generateTokens({...userDto})
        return {
            ...tokens, user: userDto
        }
    }

    async getUser (userId :Schema.Types.ObjectId) {
        const user = await User.findById(userId)
        return user
    }

    async addLikedTrack (userId: Schema.Types.ObjectId, trackId: Schema.Types.ObjectId) {
        const user = await User.findById(userId)
        if(!user){
            throw apiError.UnauthorizedError()
        }
        user.likesTracks.push(trackId)
        await user.save()
        return user
    }
    async removeLikedTrack (userId: Schema.Types.ObjectId, trackId: Schema.Types.ObjectId) {
        const user = await User.update({_id: userId},{ $pull: { likesTracks : trackId  } })
        return user
    }
}

export default new userService()