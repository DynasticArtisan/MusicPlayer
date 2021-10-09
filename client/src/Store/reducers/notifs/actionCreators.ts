
import { ISnackbar, severity } from './../../../models/Snackbar';
import { addNotificationAction, notifsActionEnum, removeNotificationAction } from './types';

export const NotifsActionCreators = {  
    addMessage: ( message :string, severity :severity ) :addNotificationAction => ({ type: notifsActionEnum.ADD_NOTIFICATION, payload: { id: Date.now(), message, severity } }),

    clearMessage: (payload :ISnackbar) :removeNotificationAction => ({ type: notifsActionEnum.REMOVE_NOTIFICATION, payload })
}