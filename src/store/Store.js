import { EventEmitter } from 'events';

export default class Store extends EventEmitter
{
    constructor(api) {
        super();

        this.items = [];
    }

    list() {
        return this.items;
    }

    byId(id) {
        return this.items[id];
    }

    update(id, item) {
        this.items[id - 1] = item;
        this.emit('change');
        return this;
    }

    create(item) {
        // Get an id from somewhere...
        item.id = this.items.length + 1; 
        this.items.push(item);
        this.emit('change');
        return this;
    }

    delete(id) {
        // Re-key for simple example
        let items = this.items,
            newItems = [],
            currentKey = 1
        ;
        items.forEach(k => {
            if(k.id !== id) {
                k.id = currentKey;
                currentKey++;
                newItems.push(k);   
            }
        });

        this.items = newItems;
        this.emit('change');
    }
}
