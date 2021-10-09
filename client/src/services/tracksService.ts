import $api from '../Http'
import {AxiosResponse} from 'axios'
import { ITrack } from '../models/ITrack'


export default class trackService {
    static async search (query :string) :Promise<AxiosResponse<ITrack[]>> {
        return $api.get(`track/search`, { params: { query } })
    }

    static async uploadTrack (formData :any) :Promise<AxiosResponse<ITrack>> {
        return $api.post(`track/`, formData)
    }
    static async getUserTracks () :Promise<AxiosResponse<ITrack[]>> {
        return $api.get(`track/`)
    }


    static async likeTrack (id :string) :Promise<AxiosResponse<ITrack>> {
        return $api.post(`track/liked`, { id })
    }

    static async dislikeTrack (id :string) :Promise<AxiosResponse<ITrack>> {
        return $api.delete(`track/liked/${id}`)
    }

    static async getUserLikedTracks () :Promise<AxiosResponse<ITrack[]>> {
        return $api.get(`track/liked`)
    }


}