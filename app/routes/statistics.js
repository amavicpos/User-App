const express = require('express');

const Team = require('../models/Team');
const User = require('../models/User');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const teams = await Team.find();
        const users = await User.find();
        res.render("statistics", {
            teams: (Object.keys(teams).length > 0 ? teams : {}),
            users: (Object.keys(users).length > 0 ? users : {})
        });
    } catch (error) {
        console.error('Error rendering view:', error);
        res.status(500).send('Error rendering view');
    }
});

module.exports = router;
