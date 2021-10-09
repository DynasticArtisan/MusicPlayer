const uuid = require('uuid')
import path from 'path'
import fs from 'fs'
const apiError = require('../exeptions/apiError')
const { getAudioDurationInSeconds } = require('get-audio-duration');

export enum fileType {
    AUDIO = 'audio',
    IMAGE = 'image'
}

class fileService {
    saveFile(type :string, file: any) {
        try {
            const fileExtension = file.name.split('.').pop()
            const fileName = uuid.v4() +'.'+ fileExtension
            const filePath = path.resolve(__dirname, '..', 'static', type)
            if(!fs.existsSync(filePath)){
                fs.mkdirSync(filePath, {recursive: true})
            }
            //fs.writeFileSync(path.resolve(filePath, fileName ), file)
            file.mv(filePath+'/'+fileName)
            
            
            return type + '/' + fileName
        } catch (e) {
            console.log(e)
        }
    }

    async getDuration(link :string){
        const filePath = path.resolve(__dirname, '..', 'static') + '/' + link
        const duration = await getAudioDurationInSeconds(filePath)
        return Math.floor(duration)
        
    }

    deleteFile(link :string){
        
        const filePath = path.resolve(__dirname, '..', 'static', link)
        if(!fs.existsSync(filePath)){
            throw apiError.BadRequest('Произошла ошибка')
        }
        fs.unlinkSync(filePath)
        return null
    }
}

export default new fileService()