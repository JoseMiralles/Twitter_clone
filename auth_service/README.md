# MongoDB

https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/#start-mongodb

- Start: `sudo systemctl start mongod`
- Restart: `sudo systemctl restart mongod`
- Check status: `sudo systemctl status mongod`
- Enable auto start: `sudo systemctl enable mongod`

- Use MongoDB: `mongosh`

## MongoDB Compass

https://www.mongodb.com/products/compass

A UI for local Mongo DBs.

# Redis

## Starting

Run `redis-server` from the `src` folder in the Redis install directory.

`redis-6.2.6/src/redis-server --daemonize yes`

## Check if running

- `redis-6.2.6/src/redis-cli ping` Should print `PONG`

## Redis Commander UI

You can use redis-commander which provides a UI for Redis.

- Intall: `npm install -g redis-commander`

- Run: `redis-commander`

## Redis CLI

Run `redis-6.2.6/src/redis-cli`

# Kill Node process

- `netstat -lntp | grep node`
- `  kill -HUP PROCESS_ID`

# Generating Refresh and JWT secret keys:

Use this tool: https://keygen.io/

- Scroll down to "SHA 256-bit Key"

Generate a new one for each. And save them somewhere safe.

Add them to the .env file. And add the JWT secret to any API that needs
to verify these tokens.

# Verifying tokens on other APIs

https://www.youtube.com/watch?v=BnN3TQOG5-g

- Makes sure that the jwt secret is the same in both apis.
