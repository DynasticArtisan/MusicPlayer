import { searchState, searchActions, searchActionsEnum } from './types';


const initialState :searchState = {
    query:  '',
    tracks:  [],
}

export default function searchReducer ( state = initialState, action :searchActions ) :searchState
{
    switch (action.type) {
        case searchActionsEnum.SET_QUERY: 
            return {
                ...state, query: action.payload
            }
        case searchActionsEnum.SET_TRACKS: 
            return {
                ...state, tracks: action.payload
            }
        default:
            return state;
    }
}