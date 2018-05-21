const express = require('express');
const mongojs = require('mongojs');

const router = express.Router();

var db = mongojs('pikadoo', ['users']);

router.post('/', (req, res) => {
    const game = req.body.game;

    game.numRounds = Math.ceil(game.shots.length / (3*game.players.length));
    game.winner = game.shots[ game.shots.length-1 ].player;

    db.games.insert(game);
});

module.exports = router;