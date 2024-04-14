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

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  try {
    
  const contactDb = await openDB('contact', 1);
  const tx = contactDb.transaction('contact', 'readwrite');
  const store = tx.objectStore('contact');

  const request = store.put(content);
  const result = await request;

  console.log('Data successfully updated in the database');
  return result;
  } catch (err) {
    console.error('putDb not implemented');
    console.error(err);
  }
}


// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  try {
  const contactDb = await openDB('contact', 1);
  const tx = contactDb.transaction('contact', 'readonly');

  const store = tx.objectStore('contact');
  const request = store.getAll();

  const result = await request;
  console.log('result.value', result);
  return result;
  } catch (err) {
    console.error(err);
  }
}

initdb();