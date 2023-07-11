const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const Image = require('../models/Image');

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

router.post('/upload', upload.single('image'), (req, res) => {
    if (!req.file) {
      return res.status(400).send('No file was uploaded.');
    }
    console.log(path.join(__dirname, '..\\', req.file.path));
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
    res.redirect('/');
});

module.exports = router;
