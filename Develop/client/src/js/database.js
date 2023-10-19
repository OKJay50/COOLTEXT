import { openDB } from 'idb';

let db;

const initdb = async () => {
  db = await openDB('jate', 1, {
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
  if (!db) {
    console.error("Database hasn't been initialized.");
    return;
  }
  const tx = db.transaction('jate', 'readwrite');
  const store = tx.objectStore('jate');
  await store.put({ content });
  console.log('Content added to the database');
};

// Logic to get all the content from the database
export const getDb = async () => {
  if (!db) {
    console.error("Database hasn't been initialized.");
    return;
  }
  const tx = db.transaction('jate', 'readonly');
  const store = tx.objectStore('jate');
  const contents = await store.getAll();
  return contents.map(item => item.content);
};

initdb();
