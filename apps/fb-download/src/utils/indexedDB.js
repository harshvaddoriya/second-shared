// /utils/indexedDB.js
import { openDB } from 'idb';

const DB_NAME = 'facebookDl-db';
const STORE_NAME = 'media-cache';
const DB_VERSION = 1;

export async function getDB() {
    return openDB(DB_NAME, DB_VERSION, {
        upgrade(db) {
            if (!db.objectStoreNames.contains(STORE_NAME)) {
                db.createObjectStore(STORE_NAME, { keyPath: 'url' });
            }
        },
    });
}

export async function setCachedData(url, data) {
    const db = await getDB();
    await db.put(STORE_NAME, { url, data, timestamp: Date.now() });
}

export async function getCachedData(url) {
    const db = await getDB();
    const record = await db.get(STORE_NAME, url);
    return record ? record.data : null;
}

export async function clearOldCache(threshold = 7 * 24 * 60 * 60 * 1000) {
    const db = await getDB();
    const allKeys = await db.getAllKeys(STORE_NAME);
    const now = Date.now();

    for (const key of allKeys) {
        const record = await db.get(STORE_NAME, key);
        if (record && now - record.timestamp > threshold) {
            await db.delete(STORE_NAME, key);
        }
    }
}
