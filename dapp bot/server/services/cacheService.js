const NodeCache = require('node-cache');

class CacheService {
  constructor() {
    this.cache = new NodeCache({ stdTTL: 100, checkperiod: 120 });
  }

  set(key, value, ttl = 3600) {
    return this.cache.set(key, value, ttl);
  }

  get(key) {
    return this.cache.get(key);
  }

  del(key) {
    return this.cache.del(key);
  }

  flush() {
    return this.cache.flushAll();
  }
}

module.exports = new CacheService();
