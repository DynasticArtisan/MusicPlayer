import { ITrack } from './../../../models/ITrack';

export interface playerState {
    active: null | ITrack;
    volume: number;
    duration: number;
    currentTime: number;
    pause: boolean;
}

export enum playerActionsTypes {
    PLAY = "PLAY",
    PAUSE = "PAUSE",
    SET_ACTIVE = "SET_ACTIVE",
    SET_DURATION = "SET_DURATION",
    SET_CURRENTTIME = "SET_CURRENTTIME",
    SET_VOLUME = "SET_VOLUME"
}

interface playAction {
    type: playerActionsTypes.PLAY;
}

interface pauseAction {
    type: playerActionsTypes.PAUSE;
}

interface setActiveAction {
    type: playerActionsTypes.SET_ACTIVE;
    payload: ITrack;

}

interface setDurationAction {
    type: playerActionsTypes.SET_DURATION;
    payload: number;
}

interface setCurrentTimeAction {
    type: playerActionsTypes.SET_CURRENTTIME;
    payload: number;
}

interface setVolumeAction {
    type: playerActionsTypes.SET_VOLUME;
    payload: number;
}

export type PlayerAction = 
    playAction
    | pauseAction
    | setActiveAction
    | setDurationAction
    | setCurrentTimeAction 
    | setVolumeAction