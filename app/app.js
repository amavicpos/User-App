const mongoose = require('mongoose');
const bodyParse = require('body-parser');
const express = require('express');
const ejsMate = require('ejs-mate');
const app = express();
// npm install mongoose body-parser express ejs fs multer path ejs-mate

// ROUTE
const UsersRouter = require('./routes/users');
const TeamsRouter = require('./routes/teams');
const StatsRouter = require('./routes/statistics');

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

app.use('/users', UsersRouter);
app.use('/teams', TeamsRouter);
app.use('/statistics', StatsRouter);
app.get('/', (req, res) => {
    res.redirect('/users')
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
