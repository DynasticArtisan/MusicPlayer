import { PlayerAction, playerActionsTypes, playerState } from "./types"

const initialState :playerState = {
    pause: true,
    active: null,
    currentTime: 0,
    duration: 0,
    volume: 25


}

const playerReducer = (state = initialState, action :PlayerAction) :playerState => {
    switch (action.type) {
        case playerActionsTypes.PAUSE: 
            return {...state, pause: true}
        case playerActionsTypes.PLAY: 
            return {...state, pause: false}
        case playerActionsTypes.SET_ACTIVE: 
            return {...state, active: action.payload, duration: 0, currentTime: 0}
        case playerActionsTypes.SET_DURATION: 
            return {...state, duration: action.payload}
        case playerActionsTypes.SET_CURRENTTIME: 
            return {...state, currentTime: action.payload}
        case playerActionsTypes.SET_VOLUME: 
            return {...state, volume: action.payload}

        default:
            return state;
    }
}
export default playerReducer