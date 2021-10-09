import { ISnackbar } from './../../../models/Snackbar';

export interface notifsState {
    messages: ISnackbar[];
}

export enum notifsActionEnum {
    ADD_NOTIFICATION = "ADD_NOTIFICATION",
    REMOVE_NOTIFICATION = "REMOVE_NOTIFICATION"

}

export interface addNotificationAction {
    type: notifsActionEnum.ADD_NOTIFICATION,
    payload: ISnackbar
}

export interface removeNotificationAction {
    type: notifsActionEnum.REMOVE_NOTIFICATION,
    payload: ISnackbar
} 

export type notifsAction = addNotificationAction | removeNotificationAction