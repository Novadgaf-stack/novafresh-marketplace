import { db, auth } from '../lib/firebase';
import { 
  collection, 
  doc, 
  getDoc, 
  getDocs, 
  setDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where 
} from 'firebase/firestore';

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: any;
}

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
    },
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

// Core identity and role state persistence layer
export async function fetchUserRoleFromDB(userId: string) {
  try {
    const userDoc = await getDoc(doc(db, 'users', userId));
    if (userDoc.exists()) {
      return userDoc.data().role;
    }
    return null;
  } catch (error) {
    handleFirestoreError(error, OperationType.GET, 'users');
  }
}

export async function persistUserToDB(userId: string, email: string | null, name: string | null, role: string) {
  try {
    await setDoc(doc(db, 'users', userId), {
      email,
      name,
      role
    }, { merge: true });
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, 'users');
  }
}

// Prime Assets inventory ledger operations
export async function fetchAllAssetsFromDB() {
  try {
    const querySnapshot = await getDocs(collection(db, 'assets'));
    const assets: any[] = [];
    querySnapshot.forEach((doc) => {
      assets.push({ id: doc.id, ...doc.data() });
    });
    return assets;
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, 'assets');
    return [];
  }
}

export async function createAssetInDB(assetData: any) {
  try {
    const docRef = doc(collection(db, 'assets'));
    await setDoc(docRef, assetData);
    return docRef.id;
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, 'assets');
  }
}

// Synchronization of canonical assets into data layer
export async function seedAssetsOnce(initialAssets: any[]) {
  const existing = await fetchAllAssetsFromDB();
  // Override match ids to ensure catalog integrity
  for (const asset of initialAssets) {
    try {
       await setDoc(doc(db, 'assets', asset.id), asset, { merge: true });
    } catch (error) {
       handleFirestoreError(error, OperationType.CREATE, 'assets');
    }
  }
}
