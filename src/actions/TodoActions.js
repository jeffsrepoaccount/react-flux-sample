import AppDispatcher from '../AppDispatcher';
import Actions from '../actions';

let actions = {
    list: () => {
        AppDispatcher.dispatch({
            type: Actions.TODO_FETCH
        });
    },
    delete: (todo) => {
        AppDispatcher.dispatch({
            type: Actions.TODO_DELETE,
            id: todo.id
        });
    },
    update: (id, todo) => {
        AppDispatcher.dispatch({
            type: Actions.TODO_UPDATE,
            id: todo.id,
            data: todo
        });
    },
    create: (data) => {
        AppDispatcher.dispatch({
            type: Actions.TODO_CREATE,
            data: data
        });
    },
    save: (data) => {
        if(data.id) {
            actions.update(data.id, data);
        } else {
            actions.create(data);
        }
    }
}

export default actions;