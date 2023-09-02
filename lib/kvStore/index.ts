import { kv } from "@vercel/kv";
import Redis from "ioredis";

const isDev = process.env.NODE_ENV === "development";

class KVStore {
  store: Redis | typeof kv | null = null;

  constructor() {
    if (isDev) {
      this.store = new Redis();
    } else {
      this.store = kv;
    }
  }

  set(key: string, value: any) {
    if (this.store) {
      return this.store.set(key, value);
    }
  }

  async get(key: string) {
    if (this.store) {
      const value = await this.store.get(key);
      // This is so annoying but VercelKV seems to auto-json-parse values whereas
      // redis does not. Re-stringify objects here so we can handle everything
      // consistently downstream
      if (typeof value === "object") {
        return JSON.stringify(value);
      }
      if (typeof value === "string") {
        return value;
      }
      return value?.toString() || "";
    }
  }

  async keys(pattern: string) {
    if (this.store) {
      return this.store.keys(pattern);
    }
  }
}

const kvStore = new KVStore();

export default kvStore;
