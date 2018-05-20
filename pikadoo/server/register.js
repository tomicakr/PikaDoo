const express = require('express');
const bcryptjs = require('bcryptjs');
const mongojs = require('mongojs');

const router = express.Router();
router.use(require('express-validator')());

var db = mongojs('pikadoo', ['users']);

router.post('/register', (req, res) => {
    const user = req.body.user;
    req.checkBody('user.email', 'Invalid email').isEmail();
    req.checkBody('user.username', 'Username cannot be empty').notEmpty();
    req.checkBody('user.password', 'Password cannot be empty').notEmpty();
    req.checkBody('user.passwordC', 'Passwords do not match').equals(user.password);

    let errors = req.validationErrors();

    
    if(errors) {
        res.json({errorsExist: true, error: errors[0]});
        return;
    }
    
    let userToSave = { username: user.username, email: user.email ,password: user.password}
    
    db.users.findOne({
        $or:[{username: userToSave.username}, {email: userToSave.email}]
    }, function(err, doc) {
        if(err){
            console.log(err);
        } 

        console.log(doc);
        if(doc){
            res.json({errorsExist: true, error: {msg: "Korisnik već postoji"}});
            
            return;
        }
 
        db.users.insert(userToSave);
        res.status(200).json({
            errorsExist:false
        })
    })
    
});

module.exports = router;