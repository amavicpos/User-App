const express = require('express');

const Team = require('../models/Team');
const User = require('../models/User');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const teams = await Team.find();
        const users = await User.find();
        labelsChart = [];
        if (Object.keys(teams).length > 0) {
            teams.forEach(team => {
                labelsChart.push(team.name);
            });
        }
        dataChart = [];
        if (Object.keys(teams).length > 0) {
            teams.forEach(team => {
                dataChart.push(team.users.length);
            });
        }
        interestsChart = {};
        var interestsArray;
        var interestsArrayUnique;
        users.forEach(user => {
            interestsArray = user.interests.split(', ').map(interest => interest.toLowerCase());
            interestsArrayUnique = [...new Set(interestsArray)];
            interestsArrayUnique.forEach(interest => {
                if (interestsChart[interest]) {
                    interestsChart[interest] += 1;
                } else {
                    interestsChart[interest] = 1;
                }
            });
        });
        res.render("statistics", {
            teams: (Object.keys(teams).length > 0 ? teams : {}),
            users: (Object.keys(users).length > 0 ? users : {}),
            labelsChart: labelsChart,
            dataChart: dataChart,
            interestsChart: interestsChart
        });
    } catch (error) {
        console.error('Error rendering view:', error);
        res.status(500).send('Error rendering view');
    }
});

module.exports = router;
