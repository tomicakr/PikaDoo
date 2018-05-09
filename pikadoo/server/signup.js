const express = require('express');
const bcryptjs = require('bcryptjs');
const mongojs = require('mongojs');

const router = express.Router();
router.use(require('express-validator')());

var db = mongojs('pikadoo', ['users']);
db.users.find((err, docs) => {
    if(err){
        console.log(err);
    }

    console.log(docs);
});
var arr = [];
arr.map(key => console.log(key));
router.post('/signup', (req, res) => {
    const user = req.body.user;
    req.checkBody('user.email', 'Invalid email').isEmail();
    req.checkBody('user.username', 'Username cannot be empty').notEmpty();
    req.checkBody('user.password', 'Password cannot be empty').notEmpty();
    req.checkBody('user.passwordC', 'Passwords do not match').equals(user.password);

    let errors = req.validationErrors();

    console.log(errors);
    if(errors) {
        res.json({errorsExist: true, errors: errors});
        return;
    }

    db.users.insert(user);
    res.status(200).json({
        errorsExist:false
    })
});


module.exports = router;
