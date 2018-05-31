import { EventEmitter } from 'events';

/**
 * Uses promises so inbound calls feel the same as talking to a distant API.
 * Stores items as a hashmap for constant time lookup.
 */
import { Promise } from 'es6-promise';

export default class InMemoryStore extends EventEmitter
{
    constructor() {
        super();

        this.items = {};
        this.dispatchToken = null;
    }

    getItems() {
        return Object.values(this.items);
    }

    /**
     * Returns promise resolving list of items
     */
    list() {
        return this.resolver(Object.values(this.items)).then( items => {
            this.emit('change');
            return items;
        });
    }

    /**
     * Returns promise resolving item by id
     */
    byId(id) {
        return this.resolver(this.items[id]).then( item => {
            this.emit('change');
            return item;
        });
    }

    /**
     * Update's an item by id
     */
    update(id, item) {
        // Prevent an item's id from ever being different
        item.id = id;
        this.items[id] = item;
        return this.byId(id);
    }

    /**
     * Creates a new item
     */
    create(item) {
        item.id = this.getNextId();
        this.items[item.id] = item;
        return this.resolver(item).then( item => {
            this.emit('change');
            return item;
        });
    }

    /**
     * Deletes an item by id
     */
    delete(id) {
        let item = this.items[id];
        delete this.items[id];
        return this.resolver(item).then( item => {
            this.emit('change');
            return item;
        });
    }

    /**
     * Constructs a promise to resolve with the given value.
     */
    resolver(val) {
        return new Promise((resolve, reject) => {
            if(val) {
                return resolve(val);
            }

            return reject(val);
        });
    }

    /**
     * Finds the next available ID, short circuits at first available
     * ID so holes will remain filled.
     */
    getNextId() {
        let id      = 0,
            found   = false;
        while(!found) {
            let matched = false;
            Object.keys(this.items).some( takenId => {
                matched = ++id === takenId;
                return matched;
            });
            found = !matched;
        }

        return found ? ++id : id;
    }
}
