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

  set(...args) {
    if (this.store) {
      return this.store.set(...args);
    }
  }

  async get(...args) {
    if (this.store) {
      const value = await this.store.get(...args);
      // This is so annoying but VercelKV seems to auto-json-parse values whereas
      // redis does not. Re-stringify objects here so we can handle everything
      // consistently downstream
      if (typeof value === "object") {
        return JSON.stringify(value);
      }
      return value;
    }
  }

  async keys(...args) {
    if (this.store) {
      return this.store.keys(...args);
    }
  }
}

const kvStore = new KVStore();

export default kvStore;
