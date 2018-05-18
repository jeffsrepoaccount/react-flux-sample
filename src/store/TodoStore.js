import AppDispatcher from '../AppDispatcher';
import Actions from '../actions';
import Store from './Store';

class TodoStore extends Store {
    constructor() {
        super();

        // Lets start with some TODOs...
        this.items = [
            {
                id: 1,
                title: 'Learn how to play the banjo'
            }, {
                id: 2,
                title: 'Hire two private investigators and have them follow each other'
            }, {
                id: 3,
                title: 'Sneeze in front of the Pope (get blessed)'
            }, {
                id: 4,
                title: '????'
            }, {
                id: 5,
                title: 'Profit'
            }
        ];
    }

    handleActions(action) {
        switch(action.type) {
            case Actions.TODO_FETCH:
                // No fetching necessary since all TODOs are stored in memory
                this.emit('change');
                return this;
            case Actions.TODO_ADD:
                this.create(action.data);
                this.emit('change');
                return this;
            case Actions.TODO_UPDATE:
                this.update(action.id, action.data);
                this.emit('change');
                return this;
            case Actions.TODO_DELETE:
                this.delete(action.id);
                this.emit('change');
                return this;
            case Actions.TODO_CREATE:
                this.create(action.data);
                this.emit('change');
                return this;
        }
    }
}

const store = new TodoStore();
AppDispatcher.register(store.handleActions.bind(store));
export default store;