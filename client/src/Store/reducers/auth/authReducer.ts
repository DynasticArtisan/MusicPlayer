import { AuthState, AuthAction, AuthActionsEnum } from './types';
const initialState :AuthState = {
    isAuth: false,
    isLoading: true,
    messages: [],
    user: null
}

export default function authReducer ( state=initialState, action :AuthAction ) :AuthState
{
    switch (action.type) {
        case AuthActionsEnum.SET_ISAUTH:
            return { ...state, isAuth: action.payload }
        case AuthActionsEnum.SET_ISLOADING:
            return { ...state, isLoading: action.payload }        
        case AuthActionsEnum.ADD_MESSAGE:
            return { ...state, messages: [... state.messages, action.payload] }
        case AuthActionsEnum.REMOVE_MESSAGE:
            return { ...state, messages: state.messages.filter(mes => mes.id != action.payload) }
        case AuthActionsEnum.SET_USER:
            return { ...state, user: action.payload }   

        default:
            return state;
    }
}