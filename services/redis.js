const redis = require("redis")
const redisServer = redis.createClient({
    url:"redis://localhost:6379"
})
async function connectRedis() {
    await redisServer.connect();
    console.log("Redis Run on 6379");
}
module.exports = {connectRedis,redisServer};