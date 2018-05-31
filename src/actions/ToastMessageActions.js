import AppDispatcher from '../AppDispatcher';
import Actions       from '../actions';

let actions = {
    success: (message, title) => {
        AppDispatcher.dispatch({
            type:       Actions.TOAST_SUCCESS,
            message:    message,
            title:      title ? title : 'Success'
        });
    },
    error: (message, title) => {
        AppDispatcher.dispatch({
            type:       Actions.TOAST_ERROR,
            message:    message,
            title:      title ? title : 'Error'
        });
    },
    info: (message, title) => {
        AppDispatcher.dispatch({
            type:       Actions.TOAST_INFO,
            message:    message,
            title:      title ? title : 'Information'
        });
    },
    warn: (message, title) => {
        AppDispatcher.dispatch({
            type:       Actions.TOAST_WARNING,
            message:    message,
            title:      title ? title : 'Warning'
        });
    }
};

export default actions;
