import AppDispatcher from '../AppDispatcher';
import Actions from '../actions';
import InMemoryStore from './InMemoryStore';

import TodoMemoryStore from './TodoMemoryStore';

/**
 * Handles People actions
 */
class PersonMemoryStore extends InMemoryStore {
    constructor() {
        super();

        this.items = this.defaultPeople();
    }

    handleActions(action) {
        switch(action.type) {
            case Actions.PERSON_FETCH:
                return this.list();
            case Actions.PERSON_CREATE:
                return this.create(action.data);
            case Actions.PERSON_UPDATE:
                return this.update(action.id, action.data);
            case Actions.PERSON_DELETE:
                return this.delete(action.id);
            case Actions.PERSON_CREATE:
                return this.create(action.data);

            // TODO Actions
            case Actions.TODO_FETCH:    /* FALL THROUGH */
            case Actions.TODO_CREATE:
            case Actions.TODO_UPDATE:
            case Actions.TODO_DELETE:
                AppDispatcher.waitFor([ TodoMemoryStore.dispatchToken ]);
                this.items = this.mapTodos(TodoMemoryStore.getItems(), this.items);
                break;
        }
    }

    defaultPeople() {
        return {
            1: {
                id: 1,
                first_name: 'Bob',
                last_name: null,
            },
            2: {
                id: 2,
                first_name: 'Alice',
                last_name: null,
            },
            3: {
                id: 3,
                first_name: 'Eve',
                last_name: null,
            }
        }
    }

    mapTodos(todos, people) {
        let peopleTodos = {};

        Object.keys(people).forEach(id => {
            peopleTodos[id] = [];
        });

        todos.forEach( todo => {
            peopleTodos[todo.person_id].push(todo);
        });

        Object.keys(people).forEach( id => {
            people[id].todos = peopleTodos[id];
        });

        return people;
    }
}

const store = new PersonMemoryStore();
store.dispatchToken = AppDispatcher.register(store.handleActions.bind(store));
export default store;
