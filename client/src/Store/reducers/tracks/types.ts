import { ITrack } from './../../../models/ITrack';
export interface tracksState {
    userTracks :ITrack[],
    userLikedTracks :ITrack[],
    searchTracks :ITrack[],
    isTracksLoading :boolean,
    tracksMessage :string
}

export enum tracksActionsEnum {
    SET_ISTRACKSLOADING = "SET_ISTRACKSLOADING",
    SET_TRACKS_MESSAGE = "SET_TRACKS_MESSAGE",
    SET_SEARCH_TRACKS = "SET_SEARCH_TRACKS",
    SET_USER_TRACKS = "SET_USER_TRACKS",
    ADD_USER_TRACK = "ADD_USER_TRACK",
    SET_USER_LIKED_TRACKS = "SET_USER_LIKED_TRACKS",

}

export interface setSearchTracksAction {
    type: tracksActionsEnum.SET_SEARCH_TRACKS,
    payload: ITrack[]
}

export interface setUserTracksAction {
    type: tracksActionsEnum.SET_USER_TRACKS,
    payload: ITrack[]
} 

export interface setUserLikedTracksAction {
    type: tracksActionsEnum.SET_USER_LIKED_TRACKS,
    payload: ITrack[]
} 

export interface addUserTrackAction {
    type: tracksActionsEnum.ADD_USER_TRACK,
    payload: ITrack
} 


export type tracksActions = setSearchTracksAction | setUserTracksAction | setUserLikedTracksAction | addUserTrackAction