const express = require('express');
const mongojs = require('mongojs');

const router = express.Router();
router.use(require('express-validator')());

var db = mongojs('pikadoo', ['users']);

router.post('/login', (req, res) => {
    const user = req.body.user;
    req.checkBody('user.username', 'Username cannot be empty').notEmpty();
    req.checkBody('user.password', 'Password cannot be empty').notEmpty();
    let errors = req.validationErrors();

    if(errors) {
        res.json({errorsExist: true, errors: errors});
        return;
    }
    
    let userForSession = { username: user.username, email: user.email ,password: user.password}
    
    db.users.findOne({
        $or:[{username: user.username, password: user.password}, {email: user.username, password: user.password}],
    }, function(err, doc) {
        if(err){
            console.log(err);
        } 

        if(doc){
            res.status(200).json({
                errorsExist:false,
                token: 'fake-jwt-token'
            })
            req.session.sessionUser = userForSession;

            return;
        }

        res.status(401).json({errorsExist: true, errors: [{msg: "Korisnik ili lozinka pogrešni"}]});
    })
    
});

module.exports = router;