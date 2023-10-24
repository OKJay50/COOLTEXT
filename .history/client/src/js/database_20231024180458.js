import { openDB } from 'idb';

let db;

const initdb = async () => {
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });
};

// Logic to add content to the database
export const putDb = async (content) => {
  const tx = db.transaction('jate', 'readwrite');
  const store = tx.objectStore('jate');
  await store.put({ content });
  const request = store.put({ id: id, todo: content });
  const result = await request;
  console.log('Data saved to the database', result);
};

// Logic to get all the content from the database
export const getDb = async () => {
  const tx = db.transaction('jate', 'readonly');
  const store = tx.objectStore('jate');
  const contents = await store.getAll();
  return contents.map(item => item.content);
};

initdb();
