import { ISnackbar } from './../../../models/Snackbar';
import { IUser } from "../../../models/IUser";

export interface AuthState {
    isAuth: boolean;
    user: IUser | null;
    isLoading: boolean;
    messages: ISnackbar[];
}

export enum AuthActionsEnum {
    SET_ISAUTH = 'SET_ISAUTH',
    SET_USER = 'SET_USER',
    SET_ISLOADING = 'SET_ISLOADING',
    ADD_MESSAGE = 'ADD_MESSAGE',
    REMOVE_MESSAGE = 'REMOVE_MESSAGE',
}

export interface setIsAuthAction {
    type: AuthActionsEnum.SET_ISAUTH;
    payload: boolean;
}

export interface setUserAction {
    type: AuthActionsEnum.SET_USER;
    payload: IUser | null;
}

export interface setIsLoadingAction {
    type: AuthActionsEnum.SET_ISLOADING;
    payload: boolean;
}

export interface addMessageAction {
    type: AuthActionsEnum.ADD_MESSAGE;
    payload: ISnackbar;
}

export interface removeMessageAction {
    type: AuthActionsEnum.REMOVE_MESSAGE;
    payload: number;
}

export type AuthAction = 
    setIsAuthAction | setUserAction | setIsLoadingAction | addMessageAction | removeMessageAction