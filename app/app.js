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
const Team = require('./models/Team');

// ROUTE
const UsersRouter = require('./routes/users');
const ImagesRouter = require('./routes/images');
const TeamsRouter = require('./routes/teams');

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
// async function createInitialUser() {
//     const initialImage1 = new Image({
//         name: 'anna.jpg'
//     });
//     await initialImage1.save();
    
//     const initialTeam1 = new Team({
//         name: 'Anna'
//     });
//     await initialTeam1.save();
    
//     const initialProfile1 = new User({
//         name: 'Anna Smith',
//         email: 'anna.smith@example.com',
//         interests: 'coding',
//         team: initialTeam1._id
//     });
//     await initialProfile1.save();

//     await User.collection.drop();
//     await Team.collection.drop();
//     await Image.collection.drop();
    
//     const initialImage = new Image({
//         name: 'anna.jpg',
//         image: {
//             srcUrl: `data:image/jpeg;base64,${Buffer.from(fs.readFileSync(path.join(__dirname, '\\images\\anna.jpg')).toString('base64'))}`
//         }
//     });
//     await initialImage.save();
    
//     const initialTeam = new Team({
//         name: 'Anna'
//     });
//     await initialTeam.save();
    
//     const initialProfile = new User({
//         name: 'Anna Smith',
//         email: 'anna.smith@example.com',
//         interests: 'coding',
//         team: initialTeam._id,
//         picture: initialImage._id
//     });
//     await initialProfile.save();
//     initialTeam.users.push(initialProfile);
// }

// createInitialUser();
// console.log(initialTeam._id);

app.use('/users', UsersRouter);
app.use('/teams', TeamsRouter);
app.use('/images', ImagesRouter);
app.get('/', (req, res) => {
    res.redirect('/users')
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
