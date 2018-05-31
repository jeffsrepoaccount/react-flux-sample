import AppDispatcher from '../AppDispatcher';
import Actions from '../actions';
import InMemoryStore from './InMemoryStore';

/**
 * Handles TODO actions
 */
class TodoMemoryStore extends InMemoryStore {
    constructor() {
        super();
    }

    handleActions(action) {
        switch(action.type) {
            case Actions.TODO_FETCH:
                return this.list();
            case Actions.TODO_CREATE:
                return this.create(action.data);
            case Actions.TODO_UPDATE:
                return this.update(action.id, action.data);
            case Actions.TODO_DELETE:
                return this.delete(action.id);
            case Actions.TODO_CREATE:
                return this.create(action.data);
        }
    }
}

const store = new TodoMemoryStore();
store.dispatchToken = AppDispatcher.register(store.handleActions.bind(store));
export default store;
