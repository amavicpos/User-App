const mongoose = require('mongoose');
const bodyParse = require('body-parser');
const express = require('express');
const fs = require('fs');
const path = require('path');
const ejsMate = require('ejs-mate');
const app = express();
// npm install mongoose body-parser express ejs fs multer path ejs-mate

const User = require('./models/User');
const Image = require('./models/Image');

// ROUTE
const UsersRouter = require('./routes/users');
const ImagesRouter = require('./routes/images');

// EJS ENGINE
app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');

app.use(bodyParse.json());
app.use(bodyParse.urlencoded({ extended: false }));

// DATABASE
const db = require('./config/keys').mongoProdURI;
mongoose
    .connect(db, { useNewUrlParser: true })
    .then(() => console.log(`Mongodb Connected`))
    .catch(error => console.log(error));

// FIRST USER
const initialImage1 = new Image({
    name: 'anna.jpg'
});
initialImage1.save();
const initialProfile1 = new User({
    name: 'Anna Smith',
    email: 'anna.smith@example.com',
    interests: 'coding'
});
initialProfile1.save();
User.collection.drop();
Image.collection.drop();

const initialImage = new Image({
    name: 'anna.jpg',
    image: {
        srcUrl: `data:image/jpeg;base64,${Buffer.from(fs.readFileSync(path.join(__dirname, '\\images\\anna.jpg')).toString('base64'))}`
    }
});
initialImage.save();

const initialProfile = new User({
    name: 'Anna Smith',
    email: 'anna.smith@example.com',
    interests: 'coding',
    picture: initialImage._id
});
initialProfile.save();

app.use('/users', UsersRouter);
app.use('/images', ImagesRouter);
app.get('/', (req, res) => {
    res.redirect('/users')
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
