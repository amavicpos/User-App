const express = require('express');

const Team = require('../models/Team');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const teams = await Team.find();
        res.render("game", {teams: (Object.keys(teams).length > 0 ? teams : {})});
    } catch (error) {
        console.error('Error rendering view:', error);
        res.status(500).send('Error rendering view');
    }
});

module.exports = router;
