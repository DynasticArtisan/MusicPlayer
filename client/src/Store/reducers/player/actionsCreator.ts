import { ITrack } from "../../../models/ITrack"
import { PlayerAction, playerActionsTypes } from "./types"


export const playerActionsCreator = {
    playTrack : () :PlayerAction => {return {type :playerActionsTypes.PLAY}},
    pauseTrack : () :PlayerAction => {return {type :playerActionsTypes.PAUSE}},
    setTrackDuration : (payload: number) :PlayerAction => {return {type :playerActionsTypes.SET_DURATION, payload }},
    setCurrentTrackTime : (payload : number) :PlayerAction => {return {type :playerActionsTypes.SET_CURRENTTIME, payload }},
    setVolume : (payload : number) :PlayerAction => {return {type :playerActionsTypes.SET_VOLUME, payload }},
    setActiveTrack : (payload :ITrack) :PlayerAction => {return {type :playerActionsTypes.SET_ACTIVE, payload}},
}

