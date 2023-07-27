require('dotenv').config();
const mongoose = require('mongoose');
const bodyParse = require('body-parser');
const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const ejsMate = require('ejs-mate');
const app = express();
// npm install mongoose body-parser express ejs fs multer path ejs-mate serve-favicon dotenv

// ROUTE
const UsersRouter = require('./routes/users');
const TeamsRouter = require('./routes/teams');
const StatsRouter = require('./routes/statistics');
const GameRouter = require('./routes/game');

// EJS ENGINE
app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, '/public/images/favicon.ico')));
app.use(bodyParse.json());
app.use(bodyParse.urlencoded({ extended: false }));

// DATABASE
const db = process.env.MONGO_URI || 'mongodb://localhost:27017/userapp';
mongoose
    .connect(db, { useNewUrlParser: true })
    .then(() => console.log(`Mongodb Connected`))
    .catch(error => console.log(error));

app.use('/users', UsersRouter);
app.use('/teams', TeamsRouter);
app.use('/statistics', StatsRouter);
app.use('/game', GameRouter);
app.get('/', (req, res) => {
    res.redirect('/users')
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
