import { NotifsActionCreators } from './../notifs/actionCreators';
import { ITrack } from "../../../models/ITrack"
import { setSearchTracksAction, tracksActionsEnum, setUserTracksAction, setUserLikedTracksAction, addUserTrackAction } from "./types"
import tracksService from '../../../services/tracksService';

export const TracksActionCreators = {
    setSearchTracks: (tracks :ITrack[]) :setSearchTracksAction => {return { type: tracksActionsEnum.SET_SEARCH_TRACKS, payload: tracks }},
    setUserTracks: (tracks :ITrack[]) :setUserTracksAction => {return { type: tracksActionsEnum.SET_USER_TRACKS, payload: tracks }},
    setUserLikedTracks: (tracks :ITrack[]) :setUserLikedTracksAction => {return { type: tracksActionsEnum.SET_USER_LIKED_TRACKS, payload: tracks }},

    addUserTrack:(track :ITrack) :addUserTrackAction => {return { type: tracksActionsEnum.ADD_USER_TRACK, payload: track }},

    getUserTracks: () => {
        return async (dispatch :any) => {
            try {
                const response = await tracksService.getUserTracks()
                dispatch(TracksActionCreators.setUserTracks(response.data))
            } catch (e) {
                console.log(e)
            }
        }
    },

    uploadTrack: (formData :any) => {
        return async (dispatch :any) => {
            try {
                const response = await tracksService.uploadTrack(formData)
                dispatch(TracksActionCreators.addUserTrack(response.data))
            } catch (e) {
                console.log(e)
                dispatch(NotifsActionCreators.addMessage('Cannot upload this audio file', 'error'))
            }
        }
    },

    getUserLikedTracks: () => {
        return async (dispatch :any) => {
            try {
                const response = await tracksService.getUserLikedTracks()
                dispatch(TracksActionCreators.setUserLikedTracks(response.data))
            } catch (e) {
                console.log(e)
            }
        }
    },
    likeTrack: (id :string) => {
        return async (dispatch :any) => {
            try {
                const response = await tracksService.likeTrack(id)
                dispatch(NotifsActionCreators.addMessage('Track has been added to your music', 'success'))
            } catch (e) {
                console.log(e)
                dispatch(NotifsActionCreators.addMessage('This track already added', 'error'))
            }
        }
    },
    dislikeTrack: (id :string) => {
        return async (dispatch :any) => {
            try {
                const response = await tracksService.dislikeTrack(id)
                dispatch(NotifsActionCreators.addMessage('Track has been removed', 'success'))
            } catch (e) {
                console.log(e)
                dispatch(NotifsActionCreators.addMessage('Some error occured', 'error'))
            }
        }
    },

}