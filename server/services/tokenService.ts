import jwt, { Secret, UserIDJwtPayload } from 'jsonwebtoken'
import { Schema } from 'mongoose'
import { UserDtoType } from '../dtos/userDto'
import Token from '../models/TokenModel'

declare module 'jsonwebtoken' {
    export interface UserIDJwtPayload extends jwt.JwtPayload {
        id: Schema.Types.ObjectId;
    }
}

class tokenService {
    generateTokens(payload: UserDtoType){
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET as Secret, {expiresIn: '15m'})
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET as Secret, {expiresIn: '30d'})
        return {
            accessToken,
            refreshToken
        }
        
    }   

    async saveToken(userId :Schema.Types.ObjectId, refreshToken: string){
        const tokenData = await Token.findOne({user: userId})
        if(tokenData){
            tokenData.refreshToken = refreshToken
            return tokenData.save()
        }
        const token = await Token.create({user: userId, refreshToken})
        return token
    }

    async removeToken(refreshToken :string){
        const tokenData = await Token.deleteOne({refreshToken})
        return tokenData
    }

    validateAccessToken(token :string) {
        try {
            const userData = <UserIDJwtPayload>jwt.verify(token, process.env.JWT_ACCESS_SECRET as Secret)
            return userData

        } catch (e) {
            return null
        }
    }
    validateRefreshToken(token :string) {
        try {
            const userData = <UserIDJwtPayload>jwt.verify(token, process.env.JWT_REFRESH_SECRET as Secret)  
            return userData  
        } catch (e) {
            return null
        }
    }
    
    async findToken(refreshToken :string){
        const tokenData = await Token.findOne({refreshToken})
        return tokenData
    }

}
export default new tokenService()

