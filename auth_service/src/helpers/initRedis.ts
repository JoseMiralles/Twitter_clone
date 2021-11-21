import redis from "redis";

const redisClient = redis.createClient({
    port: 6379,
    host: "127.0.0.1"
});

redisClient.on("connect", () => {
    console.log("Client is connected to Redis");
});

redisClient.on("error", (err) => {
    console.log(err.message);
});

redisClient.on("ready", () => {
    console.log("Redis is ready");
});

redisClient.on("end", () => {
    console.log("Client is disconnected from Redis");
});

process.on("SIGNINT", () => {
    redisClient.quit();
});

export default redisClient;
