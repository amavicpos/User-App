const mongoose = require('mongoose');
const bodyParse = require('body-parser');
const express = require('express');
const app = express();
// npm install mongoose body-parser express ejs fs multer path

// ROUTE
const UsersRouter = require('./routes/users');
const ImagesRouter = require('./routes/images');
const User = require('./models/User');

// EJS ENGINE
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
const initialProfile1 = new User({
    name: 'Anna Smith',
    email: 'anna.smith@example.com',
    interest: 'coding'
});
initialProfile1.save();
User.collection.drop();

const initialProfile = new User({
    name: 'Anna Smith',
    email: 'anna.smith@example.com',
    interest: 'coding'
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
