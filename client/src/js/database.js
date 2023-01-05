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
// PUT function
export const putDb = async ( id, text ) => {
  const jateDb = await openDB('jate', 1);
  const tx = jateDb.transaction('jate', 'readwrite');
  const objStore = tx.objectStore('jate');

  const request  = objStore.put({ id: id, value: text });
  const res = await request;
  console.log('data saved to the database', res);
};

// TODO: Add logic for a method that gets all the content from the database
// GET function
export const getDb = async (value) => {
  const jateDb = await openDB('jate', 1);
  const tx = jateDb.transaction('jate', 'readonly');
  const objStore = tx.objectStore('jate');

  const request = objStore.getAll(value)
  const res = await request;

  console.log('result.value', res);
  return res[0].value;
};


initdb();
