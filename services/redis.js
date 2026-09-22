const redis = require("redis");

const redisServer = redis.createClient({
    url: process.env.REDIS_URL || "redis://127.0.0.1:6379",
    socket: {
        reconnectStrategy: false // Don't spam reconnect attempts if Redis is offline
    }
});

redisServer.on("error", (err) => {
    // Log warning instead of letting unhandled error event crash the process
    console.warn("Redis Client Warning:", err.message);
});

async function connectRedis() {
    try {
        await redisServer.connect();
        console.log("Redis server connected on 6379");
    } catch (err) {
        console.warn("Redis connection failed. Running application without Redis caching.");
    }
}

module.exports = { connectRedis, redisServer };