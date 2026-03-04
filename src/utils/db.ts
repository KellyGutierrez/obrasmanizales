
/**
 * Simple IndexedDB wrapper for large data persistence like Base64 images
 */

const DB_NAME = 'mzl_obras_db';
const STORE_NAME = 'projects_store';
const VERSION = 1;

export const initDB = (): Promise<IDBDatabase> => {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, VERSION);

        request.onupgradeneeded = (event: any) => {
            const db = event.target.result;
            if (!db.objectStoreNames.contains(STORE_NAME)) {
                db.createObjectStore(STORE_NAME);
            }
        };

        request.onsuccess = (event: any) => {
            resolve(event.target.result);
        };

        request.onerror = (event: any) => {
            reject(event.target.error);
        };
    });
};

export const saveProjectsToDB = async (projects: any[]) => {
    try {
        const db = await initDB();
        const tx = db.transaction(STORE_NAME, 'readwrite');
        const store = tx.objectStore(STORE_NAME);
        store.put(projects, 'all_projects');
        return new Promise<void>((resolve, reject) => {
            tx.oncomplete = () => resolve();
            tx.onerror = () => reject(tx.error);
        });
    } catch (error) {
        console.error('Failed to save projects to IndexedDB:', error);
    }
};

export const getProjectsFromDB = async (): Promise<any[] | null> => {
    try {
        const db = await initDB();
        const tx = db.transaction(STORE_NAME, 'readonly');
        const store = tx.objectStore(STORE_NAME);
        const request = store.get('all_projects');

        return new Promise((resolve, reject) => {
            request.onsuccess = () => resolve(request.result || null);
            request.onerror = () => reject(request.error);
        });
    } catch (error) {
        console.error('Failed to get projects from IndexedDB:', error);
        return null;
    }
};

export const saveUsersToDB = async (users: any[]) => {
    try {
        const db = await initDB();
        const tx = db.transaction(STORE_NAME, 'readwrite');
        const store = tx.objectStore(STORE_NAME);
        store.put(users, 'all_users');
        return new Promise<void>((resolve, reject) => {
            tx.oncomplete = () => resolve();
            tx.onerror = () => reject(tx.error);
        });
    } catch (error) {
        console.error('Failed to save users to IndexedDB:', error);
    }
};

export const getUsersFromDB = async (): Promise<any[] | null> => {
    try {
        const db = await initDB();
        const tx = db.transaction(STORE_NAME, 'readonly');
        const store = tx.objectStore(STORE_NAME);
        const request = store.get('all_users');

        return new Promise((resolve, reject) => {
            request.onsuccess = () => resolve(request.result || null);
            request.onerror = () => reject(request.error);
        });
    } catch (error) {
        console.error('Failed to get users from IndexedDB:', error);
        return null;
    }
};
