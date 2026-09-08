import type { UsedRecipe, WeeklyPlan } from '../domain/planning.js';

export interface AppState {
  plan: WeeklyPlan | null;
  usedRecipes: UsedRecipe[];
  protein: string;
  allowSoups: boolean;
}

const databaseName = 'omaruokapankki';
const storeName = 'app-state';
const stateKey = 'current';
const fallbackKey = 'omaruokapankki-state';

function readFallback(): AppState | null {
  const raw = window.localStorage.getItem(fallbackKey);
  return raw ? (JSON.parse(raw) as AppState) : null;
}

function writeFallback(state: AppState): void {
  window.localStorage.setItem(fallbackKey, JSON.stringify(state));
}

function openDatabase(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = window.indexedDB.open(databaseName, 1);
    request.onupgradeneeded = () => request.result.createObjectStore(storeName);
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export async function loadAppState(): Promise<AppState | null> {
  if (!('indexedDB' in window)) return readFallback();

  try {
    const database = await openDatabase();
    return await new Promise((resolve, reject) => {
      const request = database.transaction(storeName, 'readonly').objectStore(storeName).get(stateKey);
      request.onsuccess = () => resolve((request.result as AppState | undefined) ?? null);
      request.onerror = () => reject(request.error);
    });
  } catch {
    return readFallback();
  }
}

export async function saveAppState(state: AppState): Promise<void> {
  if (!('indexedDB' in window)) {
    writeFallback(state);
    return;
  }

  try {
    const database = await openDatabase();
    await new Promise<void>((resolve, reject) => {
      const request = database.transaction(storeName, 'readwrite').objectStore(storeName).put(state, stateKey);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  } catch {
    writeFallback(state);
  }
}
