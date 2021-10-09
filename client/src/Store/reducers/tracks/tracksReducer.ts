import { tracksActions, tracksState, tracksActionsEnum } from './types';

const initialState :tracksState = {
    userTracks :[],
    userLikedTracks :[],
    searchTracks :[],
    isTracksLoading :true,
    tracksMessage :'',
}

export default function tracksReducer ( state=initialState, action :tracksActions ) :tracksState
{
    switch (action.type) {
        case tracksActionsEnum.SET_SEARCH_TRACKS:
            return { ...state, searchTracks: action.payload }

        case tracksActionsEnum.SET_USER_TRACKS:
            return { ...state, userTracks: action.payload }

        case tracksActionsEnum.ADD_USER_TRACK:
            return { ...state, userTracks: [ ...state.userTracks, action.payload ]}
            
        case tracksActionsEnum.SET_USER_LIKED_TRACKS:
            return { ...state, userLikedTracks: action.payload }
        default:
            return state;
    }
}