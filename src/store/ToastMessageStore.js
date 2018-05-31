import AppDispatcher from '../AppDispatcher';
import Actions from '../actions';
import { EventEmitter } from 'events';

import { debounce } from '../functions';

/**
 * Handles toastr actions
 */
class ToastMessageStore extends EventEmitter {
    constructor() {
        super();

        this.factory = null;

        // Prevent misbehaving actions from overloading the user
        // by debouncing calls for half a second
        this.success    = debounce(this.success, 500, true).bind(this);
        this.info       = debounce(this.info, 500, true).bind(this);
        this.warning    = debounce(this.warning, 500, true).bind(this);
        this.error      = debounce(this.error, 500, true).bind(this);
    }

    handleActions(action) {
        if(!this.factory) {
            return;
        }

        switch(action.type) {
            case Actions.TOAST_SUCCESS:
                this.success(action.message, action.title);
                break;
            case Actions.TOAST_ERROR:
                this.error(action.message, action.title);
                break;
            case Actions.TOAST_INFO:
                this.info(action.message, action.title);
                break;
            case Actions.TOAST_WARNING:
                this.warning(action.message, action.title);
                break;
        }
    }

    setFactory(factory) {
        this.factory = factory;
    }

    success(message, title) {
        this.factory.success(message, title);
    }

    info(message, title) {
        this.factory.info(message, title);
    }

    warning(message, title) {
        this.factory.warning(message, title);
    }

    error(message, title) {
        this.factory.error(message, title);
    }
}

const store = new ToastMessageStore();
AppDispatcher.register(store.handleActions.bind(store));
export default store;
