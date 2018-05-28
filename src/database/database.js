// @flow
import notesModel from './models/notes';

let instance = null;

class IndexedDBApi {
  constructor(dbName, dbVersion) {
    this.dbName = 'rcnotes';
    this.version = dbVersion;
    this.models = [notesModel];
    this.NOTES_STORE = 'notes';
    this.db = null;
  }

  createTable(model) {
    if (!this.db.objectStoreNames.contains(model.table)) {
      const objectStore = this.db.createObjectStore(model.table, { ...model.options });
      for (const index in model.indexes) {
        objectStore.createIndex(index, index, { ...model[index] });
      }
    }
  }

  getDatabase() {
    if (instance !== null) {
      return new Promise((resolve) => {
        resolve(instance);
      });
    }

    const request = indexedDB.open(this.dbName, 1);
    return new Promise((resolve, reject) => {
      request.onupgradeneeded = (e) => {
        this.db = e.target.result;
        this.models.map((model) => {
          this.createTable(model);
        });
      };
      request.onsuccess = () => {
        this.db = request.result;
        instance = this;
        resolve(this);
      };
      request.onerror = () => {
        reject(request.error);
      };
    });
  }

  addItem(table, data) {
    return this.getDatabase(table)
      .then(() => {
        const transaction = this.db.transaction([table], 'readwrite');
        const store = transaction.objectStore(table);
        const request = store.put(data);

        return new Promise((resolve, reject) => {
          request.onsuccess = (event) => {
            resolve(event.target.result);
          };
          request.onerror = (event) => {
            reject(event.target.error);
          };
        });
      });
  }

  getItems(table) {
    return this.getDatabase(table)
      .then(() => {
        const transaction = this.db.transaction([table], 'readonly');
        const store = transaction.objectStore(table);
        const notes = [];
        const openCursor = store.openCursor();

        return new Promise((resolve, reject) => {
          openCursor.onsuccess = (event) => {
            const cursor = event.target.result;
            if (cursor) {
              notes.push(cursor.value);
              cursor.continue();
            } else {
              resolve(notes);
            }
          };
          openCursor.onerror = (event) => {
            reject(event.target.error);
          };
        });
      });
  }

  deleteItem(table, id) {
    return this.getDatabase(table)
      .then(() => {
        const transaction = this.db.transaction([table], 'readwrite');
        const store = transaction.objectStore(table);
        const objectStoreRequest = store.delete(id);

        return new Promise((resolve, reject) => {
          objectStoreRequest.onsuccess = () => {
            resolve(id);
          };
          objectStoreRequest.onerror = (event) => {
            reject(event.target.error);
          };
        });
      });
  }

  getItem(table, id) {
    return this.getDatabase(table)
      .then(() => {
        const transaction = this.db.transaction(table, 'readonly');
        const store = transaction.objectStore(table);
        const objectStoreRequest = store.get(id);
        return new Promise(((resolve, reject) => {
          objectStoreRequest.onerror = (event) => {
            reject(event.target.error);
          };
          objectStoreRequest.onsuccess = (event) => {
            resolve(event.target.result);
          };
        }));
      });
  }

  editItem(table, id, options) {
    return this.getDatabase(table)
      .then(() => {
        const transaction = this.db.transaction([table], 'readwrite');
        const store = transaction.objectStore(table);
        const request = store.put({
          id,
          ...options,
        });

        return new Promise((resolve, reject) => {
          request.onsuccess = (event) => {
            resolve(event.target.result);
          };
          request.onerror = (event) => {
            reject(event.target.error);
          };
        });
      });
  }
}

export default new IndexedDBApi();
