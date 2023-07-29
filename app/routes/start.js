const express = require('express');

const Team = require('../models/Team');

const router = express.Router();

router.get('/', async (req, res) => {
    const teams = await Team.find();
    res.render("start", {
        teams: (Object.keys(teams).length > 0 ? teams : {})
    });
});

module.exports = router;
