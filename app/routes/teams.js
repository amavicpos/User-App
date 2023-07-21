const express = require('express');

const Team = require('../models/Team');

const router = express.Router();

router.get('/', async (req, res) => {

    const teams = await Team.find();
    res.render("layouts/boilerplate", {
        teams: (Object.keys(teams).length > 0 ? teams : {})
    });
});

router.get('/show/:id', async (req, res) => {
    try {
        const team = await Team.findById(req.params.id).populate('users');
        res.render("indexTeam", { team });
    } catch (error) {
        console.error('Error rendering view:', error);
        res.status(500).send('Error rendering view');
    }
});

module.exports = router;
