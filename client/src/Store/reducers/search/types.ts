import { ITrack } from './../../../models/ITrack';

export interface searchState {
    query :string,
    tracks :ITrack[],
}

export enum searchActionsEnum {
    SET_QUERY = "SET_SEARCH_QUERY",
    SET_TRACKS = "SET_SEARCH_TRACKS",
}

export interface setSearchQueryAction {
    type: searchActionsEnum.SET_QUERY,
    payload: string
}

export interface setSearchTracksAction {
    type: searchActionsEnum.SET_TRACKS,
    payload: ITrack[]
} 



export type searchActions = setSearchTracksAction | setSearchQueryAction 