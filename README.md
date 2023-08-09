# User App
An app to store and organise information about users, coded from scratch.

## Features
- Edit, show and delete information about a user.
- Show statistics of all users.
- Guessing game to get to know the users.
- List team members and search users by name.

## Build/Deploy instructions
- Run inside /dockerhub to pull the image from Docker Hub or run inside main repository folder to create image from the repository files:
```bash
docker-compose up
```
- Run inside /app using MongoDB locally:
```bash
node app.js
```

## Dependencies
- body-parser
- dotenv
- ejs
- ejs-mate
- express
- fs
- mongoose
- multer
- path
- serve-favicon
