# MongoDB

## Users

```
{
    id: string,
    username: string,
    password_hash: string,
    follows: [...userIDs]
}
```

# Cassandra

## Tweets

|id|userId|body|created|
|-|-|-|-|
|string|string|string|date
|aw23e...|fwae123...|Today was a...|12/3/2021|

## Hashtags

|id|userId|TweetId|text|
|-|-|-|-|
|string|string|string|string