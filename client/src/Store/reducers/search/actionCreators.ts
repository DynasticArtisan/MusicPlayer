import { ITrack } from './../../../models/ITrack';
import { searchActionsEnum, setSearchQueryAction, setSearchTracksAction } from "./types"
import tracksService from '../../../services/tracksService';

export const searchActionsCreator = {
    setSearchQuery: (query :string) :setSearchQueryAction => {return { type: searchActionsEnum.SET_QUERY, payload: query }},
    setSearchTracks: (tracks :ITrack[]) :setSearchTracksAction => {return { type: searchActionsEnum.SET_TRACKS, payload: tracks }},

    search: (query :string) => {
        return async (dispatch :any) => {
            try {
                const response = await tracksService.search(query)
                dispatch(searchActionsCreator.setSearchTracks(response.data))
            } catch (e) {
                
            }
        }
    }
}