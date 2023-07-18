const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const Image = require('../models/Image');
const User = require('../models/User');

const router = express.Router();

// STORAGE
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './images'); // Specify the destination folder
    },
    filename: function (req, file, cb) {
      // Generate a unique filename by appending the current timestamp
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      cb(null, uniqueSuffix + file.originalname);
    }
});

const upload = multer({ storage: storage });

// Index page route
router.get('/', async (req, res) => {

    const users = await User.find();
    res.render("index", {
        profiles: (Object.keys(users).length > 0 ? users : {})
    });
});

// CREATE
router.post('/', upload.single('image'), (req, res) => {
    if (req.file) {
        const fileData = fs.readFileSync(path.join(__dirname, '..\\', req.file.path));
        const base64String = Buffer.from(fileData).toString('base64');
        const mimeType = req.file.mimetype; // Replace with the appropriate MIME type for your file
        const fileSource = `data:${mimeType};base64,${base64String}`;
        // File was successfully uploaded and stored
        const newImage = new Image({
            name: req.file.originalname,
            image: {
                data: req.file.filename,
                contentType: mimeType,
                srcUrl: fileSource
            }
        });
        newImage.save();

        if (req.body.biography) {
            var newProfile = new User({
                name: req.body.name,
                email: req.body.email,
                interests: req.body.interests,
                biography: req.body.biography,
                picture: newImage._id
            });
        } else {
            var newProfile = new User({
                name: req.body.name,
                email: req.body.email,
                interests: req.body.interests,
                picture: newImage._id
            });
        }
    } else {
        if (req.body.biography) {
            var newProfile = new User({
                name: req.body.name,
                email: req.body.email,
                interests: req.body.interests,
                biography: req.body.biography
            });
        } else {
            var newProfile = new User({
                name: req.body.name,
                email: req.body.email,
                interests: req.body.interests
            });
        }
    }

    newProfile.save()
        .then(res.redirect('/'))
        .catch(err => console.log(err));
});

// READ
router.get('/show/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id).populate('picture');
        res.render("show", { user });
    } catch (error) {
        console.error('Error rendering view:', error);
        res.status(500).send('Error rendering view');
    }
});

// UPDATE
router.get('/update/:id', async (req, res) => {

    const user = await User.findById(req.params.id).populate('picture');
    res.render("edit", { user });
});

router.post('/update/:id', upload.single('image'), (req, res) => {
    const userId = req.params.id;

    if (req.file) {
        // Save input image as new database data
        const fileData = fs.readFileSync(path.join(__dirname, '..\\', req.file.path));
        const base64String = Buffer.from(fileData).toString('base64');
        const mimeType = req.file.mimetype; // Replace with the appropriate MIME type for your file
        const fileSource = `data:${mimeType};base64,${base64String}`;
        // File was successfully uploaded and stored
        const newImage = new Image({
            name: req.file.originalname,
            image: {
                data: req.file.filename,
                contentType: mimeType,
                srcUrl: fileSource
            }
        });
        newImage.save();

        // Update the item in the database
        if (req.body.biography) {
            User.findByIdAndUpdate(userId, {
                name: req.body.name,
                email: req.body.email,
                interests: req.body.interests,
                biography: req.body.biography,
                picture: newImage._id
                })
                .then(() => {
                    res.redirect('/');
                })
                .catch((error) => {
                    console.error('Error updating user:', error);
                    res.status(500).send('Internal Server Error');
                });
        } else {
            User.findByIdAndUpdate(userId, {
                name: req.body.name,
                email: req.body.email,
                interests: req.body.interests,
                picture: newImage._id
                })
                .then(() => {
                    res.redirect('/');
                })
                .catch((error) => {
                    console.error('Error updating user:', error);
                    res.status(500).send('Internal Server Error');
                });
        }
    } else {
        // Update the item in the database
        if (req.body.biography) {
            User.findByIdAndUpdate(userId, {
                name: req.body.name,
                email: req.body.email,
                interests: req.body.interests,
                biography: req.body.biography
                })
                .then(() => {
                    res.redirect('/');
                })
                .catch((error) => {
                    console.error('Error updating user:', error);
                    res.status(500).send('Internal Server Error');
                });
        } else {
            User.findByIdAndUpdate(userId, {
                name: req.body.name,
                email: req.body.email,
                interests: req.body.interests
                })
                .then(() => {
                    res.redirect('/');
                })
                .catch((error) => {
                    console.error('Error updating user:', error);
                    res.status(500).send('Internal Server Error');
                });
        }
    }
});

// DELETE
router.post('/delete/:id', async (req, res) => {
    const id = req.params.id;
    const err = await User.findByIdAndDelete({ _id: id })
    res.redirect('/');
});

module.exports = router;
