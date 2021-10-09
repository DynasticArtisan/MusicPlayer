import { notifsState, notifsAction, notifsActionEnum } from './types';

const initialState :notifsState = {
    messages: []
}

export default function notifsReducer ( state = initialState, action :notifsAction ) :notifsState
{
    switch (action.type) {
        case notifsActionEnum.ADD_NOTIFICATION:
            return {
                ...state, messages: [
                    ...state.messages, action.payload
                ]
            }
        
        case notifsActionEnum.REMOVE_NOTIFICATION:
            return {
                ...state, messages: state.messages.filter(mes => mes !=action.payload )
            }

        default:
            return state;
    }
}