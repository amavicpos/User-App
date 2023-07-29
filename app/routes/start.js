const express = require('express');
const fs = require('fs');
const path = require('path');

const Team = require('../models/Team');

const router = express.Router();

router.get('/', async (req, res) => {
    const teams = await Team.find();
    res.render("start", {
        teams: (Object.keys(teams).length > 0 ? teams : {}),
        srcUrl: `data:image/png;base64,${Buffer.from(fs.readFileSync(path.join(__dirname, '..', 'public', 'images', 'userIcon.png')).toString('base64'))}`
    });
});

module.exports = router;
