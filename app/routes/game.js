const express = require('express');

const Team = require('../models/Team');
const User = require('../models/User');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const teams = await Team.find();
        const users = await User.find();
        const user = users[Math.floor(Math.random() * users.length)];
        const setQuestions = ['email', 'interests', 'team'];
        const question = setQuestions[Math.floor(Math.random() * setQuestions.length)];
        res.render("game", {
            teams: (Object.keys(teams).length > 0 ? teams : {}),
            user: user,
            question: question
        });
    } catch (error) {
        console.error('Error rendering view:', error);
        res.status(500).send('Error rendering view');
    }
});

module.exports = router;
