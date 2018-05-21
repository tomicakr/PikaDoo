const express = require('express');
const mongojs = require('mongojs');

const router = express.Router();

var db = mongojs('pikadoo', ['users','games']);

router.get('/', (req, res) => {
    const username = req.query.username;

    db.users.findOne({
        username: username
    }, function(err, doc) {
        if(err){
            res.json({errorExists: true});
            return;
        }

        db.games.find({}).forEach((d) => console.log(d));
    })
});

module.exports = router;