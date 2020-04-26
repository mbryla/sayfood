import { firestore } from 'firebase-admin';
const db = firestore();

const ifExists = (doc: FirebaseFirestore.DocumentSnapshot) => {
  if (!doc.exists) {
    throw new Error('document does not exist');
  }
  return doc;
};

const toDoc = <T>(doc: FirebaseFirestore.DocumentSnapshot<T>) => ({
  id: doc.id,
  ...doc.data(),
});

const toDocs = <T>(docs: Array<FirebaseFirestore.QueryDocumentSnapshot<T>>) => docs.map(toDoc);

export const arrayUnion = firestore.FieldValue.arrayUnion;

export const allDocs = (collection: string) =>
  db
    .collection(collection)
    .get()
    .then(snapshot => snapshot.docs)
    .then(toDocs);

export const docWithId = <T>(collection: string, id: string) => db.collection(collection).doc(id).get().then(ifExists).then(toDoc) as Promise<T>;

export const docsWithIds = (collection: string, ids: Array<string>) => db.getAll(...ids.map(id => db.collection(collection).doc(id)));

export const createDoc = <T>(collection: string, document: T) => db.collection(collection).add(document);

export const updateDoc = <T>(collection: string, id: string, update: Partial<T>) =>
  db
    .collection(collection)
    .doc(id)
    .get()
    .then(ifExists)
    .then(() => db.collection(collection).doc(id).update(update));

export const clearDocs = (collection: string) =>
  db
    .collection(collection)
    .get()
    .then(snapshot => {
      const batch = db.batch();
      snapshot.forEach(doc => {
        batch.delete(doc.ref);
      });
      return batch.commit();
    });
