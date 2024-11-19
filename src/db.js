import { openDB } from 'idb';

const DB_NAME = 'todoApp';
const STORE_NAME = 'todos';

export const initDB = async () => {
  return await openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: true });
      }
    },
  });
};

export const addTodo = async (todo) => {
  const db = await initDB();
  await db.add(STORE_NAME, todo);
};

export const getTodos = async () => {
  const db = await initDB();
  return await db.getAll(STORE_NAME);
};

export const updateTodo = async (id, updatedTodo) => {
  const db = await initDB();
  const transaction = db.transaction(STORE_NAME, 'readwrite');
  const store = transaction.objectStore(STORE_NAME);
  await store.put({ ...updatedTodo, id });
  await transaction.done;
};

export const deleteTodo = async (id) => {
  const db = await initDB();
  await db.delete(STORE_NAME, id);
};
