const express = require('express');
const User = require('../models/User');
const fs = require('fs');

const router = express.Router();

// Index page route
router.get('/', async (req, res) => {

    const users = await User.find()
    res.render("index", {
        profiles: (Object.keys(users).length > 0 ? users : {})
    });
});

// CREATE
router.get('/new', (req, res) => {
    try {
        res.render("new");
    } catch (error) {
        console.error('Error rendering view:', error);
        res.status(500).send('Error rendering view');
    }
});

router.post('/', (req, res) => {
    const newProfile = new User({
        name: req.body.name,
        email: req.body.email,
        interest: req.body.interest
    });

    newProfile.save()
        .then(newProfile => res.redirect('/'))
        .catch(err => console.log(err));
});

// READ
router.get('/show/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        res.render("show", { user });
    } catch (error) {
        console.error('Error rendering view:', error);
        res.status(500).send('Error rendering view');
    }
});

// UPDATE
router.get('/update/:id', async (req, res) => {

    const user = await User.findById(req.params.id);
    res.render("edit", { user });
});

router.post('/update/:id', (req, res) => {
    const userId = req.params.id;

    // Update the item in the database
    User.findByIdAndUpdate(userId, {
        name: req.body.name,
        email: req.body.email,
        interest: req.body.interest
        })
        .then(() => {
            res.redirect('/');
        })
        .catch((error) => {
            console.error('Error updating user:', error);
            res.status(500).send('Internal Server Error');
        });
});

// DELETE
router.post('/delete/:id', async (req, res) => {
    const id = req.params.id;
    const err = await User.findByIdAndDelete({ _id: id })
    res.redirect('/');
});

router.get('/image', function (req, res) {
    let img = fs.readFileSync(__dirname + "\\..\\images\\anna.jpg");
    res.writeHead(200, {'Content-Type': 'image/jpg' });
    res.end(img, 'binary');
});

module.exports = router;
