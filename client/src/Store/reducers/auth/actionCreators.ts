import { setIsAuthAction, AuthActionsEnum, setIsLoadingAction, setUserAction, addMessageAction, removeMessageAction } from './types';
import authService from '../../../services/authService'
import { IUser } from '../../../models/IUser';
import { ISnackbar } from '../../../models/Snackbar';
import axios from 'axios'
import { AuthResponse } from '../../../models/response/AuthResponse';
import { API_URL } from '../../../Http';
import { NotifsActionCreators } from '../notifs/actionCreators';

export const AuthActionCreators = {
    setIsAuth: (boolean :boolean) :setIsAuthAction => ({type: AuthActionsEnum.SET_ISAUTH, payload: boolean}),
    addMessage: (mess :ISnackbar) :addMessageAction => ({type :AuthActionsEnum.ADD_MESSAGE, payload: mess}),
    removeMessage: (id :number) :removeMessageAction => ({type :AuthActionsEnum.REMOVE_MESSAGE, payload: id}),
    setIsLoading: (boolean :boolean) :setIsLoadingAction  => ({type :AuthActionsEnum.SET_ISLOADING, payload: boolean}),
    setUser: (user :IUser | null) :setUserAction => ({type :AuthActionsEnum.SET_USER, payload :user}),

    login: (email :string, password :string) => {
        return async (dispatch :any) => {
            dispatch(AuthActionCreators.setIsLoading(true))
            try {
                const response = await authService.login(email, password)
                localStorage.setItem('token', response.data.accessToken)
                dispatch(AuthActionCreators.setUser(response.data.user))
                dispatch(AuthActionCreators.setIsAuth(true))
                dispatch(AuthActionCreators.setIsLoading(false))
            } catch (e) {
                console.log(e)
                dispatch(NotifsActionCreators.addMessage('Wrong email adress or password', 'error'))
            } finally {
                dispatch(AuthActionCreators.setIsLoading(false))
            }
        }
    }, 

    registration: (email :string, password :string) => {
        return async (dispatch :any) => {
            dispatch(AuthActionCreators.setIsLoading(true))
            try {
                const response = await authService.registration(email, password)
                localStorage.setItem('token', response.data.accessToken)
                dispatch(AuthActionCreators.setUser(response.data.user))
                dispatch(AuthActionCreators.setIsAuth(true))
                dispatch(AuthActionCreators.setIsLoading(false))
                
            } catch (e) {
                console.log(e)
                dispatch(NotifsActionCreators.addMessage('User with such email adress is already exist', 'error'))
                
            } finally {
                dispatch(AuthActionCreators.setIsLoading(false))
            }
        }
    },
    
    logout: () => {
        return async (dispatch :any) => {
            try {
                const response = await authService.logout()
                localStorage.removeItem('token')
                dispatch(AuthActionCreators.setIsAuth(false))
                dispatch(AuthActionCreators.setUser(null))
            } catch (e) {
                console.log(e) 
                dispatch(NotifsActionCreators.addMessage('Some error occured', 'error'))  
            }
        }
    },

    checkAuth: () => {
        return async (dispatch :any) => {
            dispatch(AuthActionCreators.setIsLoading(true))
            try {
                const response = await axios.get<AuthResponse>(`${API_URL}user/refresh`, {withCredentials: true})
                localStorage.setItem('token', response.data.accessToken)
                dispatch(AuthActionCreators.setUser(response.data.user))
                dispatch(AuthActionCreators.setIsAuth(true))
                dispatch(AuthActionCreators.setIsLoading(false))
            } catch (e) {
                console.log(e)
                dispatch(NotifsActionCreators.addMessage('Authorization error', 'error'))
            } finally {
                dispatch(AuthActionCreators.setIsLoading(false))
            }
        }
    }
}