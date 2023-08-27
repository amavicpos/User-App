# User App
An app to store and organise information about users, coded from scratch.

## Features
- Edit, show and delete information about a user.
- Show statistics of all users.
- Guessing game to get to know the users.
- List team members and search users by name.

[![](https://user-images.githubusercontent.com/100805638/263542752-619b1571-42e0-4494-96a4-e69beda2f997.png)](https://drive.google.com/file/d/1FxVh0xo_Avv4jI5f4IPo6Eflrt6LH0Ze/view?usp=sharing)

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
