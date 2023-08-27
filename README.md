# User App
An app to store and organise information about users, coded from scratch.

## Features
- Edit, show and delete information about a user.
- Show statistics of all users.
- Guessing game to get to know the users.
- List team members and search users by name.

[![](https://user-images.githubusercontent.com/100805638/263542885-ee8b6ba4-20cd-4ebe-bbd2-8b29a9f5e2d9.png)](https://drive.google.com/file/d/1FxVh0xo_Avv4jI5f4IPo6Eflrt6LH0Ze/view?usp=sharing)

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
