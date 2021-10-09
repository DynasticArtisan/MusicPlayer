import { ObjectId, Schema } from 'mongoose';
import { AnyCnameRecord } from "dns";
import Track, { TrackType } from "../models/TrackModel";
import fileService, { fileType } from "./fileService";
const apiError = require('../exeptions/apiError')


class trackService {
    async create(dto :any, files :any){
       const audio = fileService.saveFile(fileType.AUDIO, files.audio);
       const picture = fileService.saveFile(fileType.IMAGE, files.picture);
       const duration = await fileService.getDuration(audio as string);
       const track = await Track.create({...dto, audio, picture, duration});
       return track;  
    }
    async getTrack(trackId : ObjectId){
        const track = await Track.findById(trackId)
        return track
    }
    async getAll(){
        const tracks = await Track.find()
        return tracks
    }
    async search(query :any){
        const tracks = await Track.find()   
        return tracks.filter( track => {
           return track.name.toLowerCase().includes(query.toLowerCase()) || track.artist.toLowerCase().includes(query.toLowerCase())
        } )
    }

    async getUserTracks (userId :ObjectId){
        const tracks = await Track.find({user: userId})
        return tracks
    }
    async getUserLikesTracks (likesTracks :ObjectId[]) {
        const tracks = await Track.find({_id: { $in: likesTracks }})
        return tracks
    }
    async delete(id :string){
        const track = await Track.findById(id)
        if(!track){
            throw apiError.BadRequest('Некоректный запрос')
        }
        await fileService.deleteFile(track.audio)
        await fileService.deleteFile(track.picture)
        const response = await track.delete()
        return response
    }
}

export default new trackService()
