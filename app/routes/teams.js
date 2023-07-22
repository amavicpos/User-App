const express = require('express');

const Team = require('../models/Team');

const router = express.Router();

router.get('/show/:id', async (req, res) => {
    try {
        const team = await Team.findById(req.params.id).populate('users');
        const teams = await Team.find();
        res.render("indexTeam", { team, teams: (Object.keys(teams).length > 0 ? teams : {}) });
    } catch (error) {
        console.error('Error rendering view:', error);
        res.status(500).send('Error rendering view');
    }
});

module.exports = router;
