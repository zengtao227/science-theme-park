/**
 * GP2.03 Gas Laws Module - Storage Adapter
 * 
 * Abstracts storage operations for quest progress and preferences.
 * Provides error handling for storage unavailable, quota exceeded, and corrupted data.
 */

// ============================================================================
// Storage Adapter Interface
// ============================================================================

export interface StorageAdapter {
  save(key: string, value: any): Promise<void>;
  load(key: string): Promise<any>;
  clear(key: string): Promise<void>;
  isAvailable(): boolean;
}

// ============================================================================
// LocalStorage Implementation
// ============================================================================

export class LocalStorageAdapter implements StorageAdapter {
  private prefix = "gp2-03-gas-laws";
  private available: boolean;

  constructor() {
    this.available = this.checkAvailability();
  }

  /**
   * Check if localStorage is available
   */
  private checkAvailability(): boolean {
    try {
      const testKey = `${this.prefix}:test`;
      localStorage.setItem(testKey, "test");
      localStorage.removeItem(testKey);
      return true;
    } catch (e) {
      console.warn("localStorage is not available:", e);
      return false;
    }
  }

  /**
   * Check if storage is available
   */
  isAvailable(): boolean {
    return this.available;
  }

  /**
   * Save data to localStorage
   */
  async save(key: string, value: any): Promise<void> {
    if (!this.available) {
      console.warn("localStorage unavailable, data will not persist");
      return;
    }

    const fullKey = `${this.prefix}:${key}`;
    
    try {
      const serialized = JSON.stringify(value);
      localStorage.setItem(fullKey, serialized);
    } catch (e: any) {
      // Handle quota exceeded error
      if (e.name === "QuotaExceededError" || e.code === 22) {
        console.error("Storage quota exceeded, attempting to clear old data");
        await this.clearOldData();
        
        // Retry save
        try {
          const serialized = JSON.stringify(value);
          localStorage.setItem(fullKey, serialized);
        } catch (retryError) {
          console.error("Failed to save after clearing old data:", retryError);
          throw new Error("Storage quota exceeded and cleanup failed");
        }
      } else {
        console.error("Failed to save to localStorage:", e);
        throw e;
      }
    }
  }

  /**
   * Load data from localStorage
   */
  async load(key: string): Promise<any> {
    if (!this.available) {
      return null;
    }

    const fullKey = `${this.prefix}:${key}`;
    
    try {
      const item = localStorage.getItem(fullKey);
      if (item === null) {
        return null;
      }

      return JSON.parse(item);
    } catch (e) {
      console.error("Failed to load from localStorage (corrupted data?):", e);
      
      // Clear corrupted data
      await this.clear(key);
      
      return null;
    }
  }

  /**
   * Clear specific key from localStorage
   */
  async clear(key: string): Promise<void> {
    if (!this.available) {
      return;
    }

    const fullKey = `${this.prefix}:${key}`;
    
    try {
      localStorage.removeItem(fullKey);
    } catch (e) {
      console.error("Failed to clear from localStorage:", e);
    }
  }

  /**
   * Clear old visualization history to free up space
   */
  private async clearOldData(): Promise<void> {
    try {
      // Clear visualization history (least important data)
      await this.clear("visualization-history");
      
      console.log("Cleared old visualization history to free up space");
    } catch (e) {
      console.error("Failed to clear old data:", e);
    }
  }

  /**
   * Clear all data for this module
   */
  async clearAll(): Promise<void> {
    if (!this.available) {
      return;
    }

    const keys = Object.keys(localStorage);
    const moduleKeys = keys.filter((key) => key.startsWith(this.prefix));

    for (const key of moduleKeys) {
      try {
        localStorage.removeItem(key);
      } catch (e) {
        console.error(`Failed to remove key ${key}:`, e);
      }
    }
  }
}

// ============================================================================
// In-Memory Fallback Implementation
// ============================================================================

/**
 * In-memory storage adapter for when localStorage is unavailable
 * Data will not persist between sessions
 */
export class InMemoryStorageAdapter implements StorageAdapter {
  private storage: Map<string, any> = new Map();
  private prefix = "gp2-03-gas-laws";

  isAvailable(): boolean {
    return true; // Always available
  }

  async save(key: string, value: any): Promise<void> {
    const fullKey = `${this.prefix}:${key}`;
    this.storage.set(fullKey, value);
  }

  async load(key: string): Promise<any> {
    const fullKey = `${this.prefix}:${key}`;
    return this.storage.get(fullKey) || null;
  }

  async clear(key: string): Promise<void> {
    const fullKey = `${this.prefix}:${key}`;
    this.storage.delete(fullKey);
  }

  async clearAll(): Promise<void> {
    this.storage.clear();
  }
}

// ============================================================================
// Storage Factory
// ============================================================================

/**
 * Create appropriate storage adapter based on availability
 */
export function createStorageAdapter(): StorageAdapter {
  const localStorageAdapter = new LocalStorageAdapter();
  
  if (localStorageAdapter.isAvailable()) {
    return localStorageAdapter;
  } else {
    console.warn("Using in-memory storage fallback - progress will not persist between sessions");
    return new InMemoryStorageAdapter();
  }
}

// ============================================================================
// Storage Keys
// ============================================================================

export const STORAGE_KEYS = {
  QUEST_PROGRESS: "quest-progress",
  CURRENT_STAGE: "current-stage",
  LANGUAGE_PREFERENCE: "language-preference",
  VISUALIZATION_HISTORY: "visualization-history",
} as const;
