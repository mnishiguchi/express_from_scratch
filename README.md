# express_from_scratch

In this repo, I learn how Node HTTP server works, following a screencast called
[Express From Scratch](https://jesse.sh/express-from-scratch/) by [Jesse Shawl](https://jesse.sh/).

- hello world
- static routes
- serve json
- body parser
- middleware
- dynamic routes

#### [nodemon](http://nodemon.io/)
- A utility that will monitor for any changes in your source and automatically restart your server.

```bash
nodemon
```

#### Test the app, using a command line tool [cURL](https://en.wikipedia.org/wiki/CURL)

Retrieving the app's homepage.

```bash
curl http://localhost:3000
```

Post request

```bash
curl -X POST -d "name=masa&number=39" http://localhost:3000/post
```
