import { openDB } from 'idb';

const initdb = async () =>
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

// Add logic to a method that accepts some content and adds it to the database 
//ADD COMMENTS

export const putDb = async (content) => {

const jatebd = await openDB('jate', 1);
const tx = jatebd.transaction('jate', 'readwrite');
const store = tx.objectStore('jate');
const request = store.put({ jate: content });
const result = await request;
console.log('data saved to the database', result);
};

//Add logic for a method that gets all the content from the database
export const getDb = async () => {
 
  const jatebd = await openDB('jate', 1);
  const tx = jatebd.transaction('jate', 'readonly');
  const store = tx.objectStore('jate');
  const request = store.get(1);
  const result = await request;
 
  return result?.jate;
};


initdb();
