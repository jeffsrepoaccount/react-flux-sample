import AppDispatcher from '../AppDispatcher';
import Actions from '../actions';

export default {
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
    }
}
