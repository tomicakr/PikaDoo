const express = require('express');
const router = express.Router();
router.use(require('express-validator')());
const bcryptjs = require('bcryptjs');
const sqlite3 = require('sqlite3').verbose();

router.post('/signup', (req, res) => {
    const email = req.body.user.email;
    const username = req.body.user.username;
    const pass = req.body.user.password;

    req.checkBody('user.email', 'Invalid email').isEmail();
    req.checkBody('user.username', 'Username cannot be empty').notEmpty();
    req.checkBody('user.password', 'Password cannot be empty').notEmpty();
    req.checkBody('user.passwordC', 'Passwords do not match').equals(pass);

    let errors = req.validationErrors();
    
    if(errors) {
        res.send(errors);
        return;
    }

    let db = new sqlite3.Database(':memory:', (err) => {
        if (err) {
            return console.error(err.message);
        }
    });

    let hashPass = '325';
    bcryptjs.genSalt(12, (err, salt) => {
        bcryptjs.hash(pass, salt, (error, hash) => {
            if(error) {
                return console.error(error.message);
            }

            hashPass = hash;
        });
    });

    //@Matija -- Ovo ne bi trebalo biti tu
    let checkIfExists = "SELECT name FROM sqlite_master WHERE type='table' AND name='Users';";
    let exists = false;
    db.run(checkIfExists, (err, row) => {
        if (err) {
            return console.error(err.message);
        }

        exists = true;
    });

    if(!exists) {
        db.run("CREATE TABLE Users(email text, username text, password text)");
    }

    let sql = 'INSERT INTO Users(email, username, password) VALUES (?, ?, ?)';

    db.run(sql, [email, username, hashPass], (err) => {
        if (err) {
            return console.error(err.message);
        }
    });

    db.close();

    res.redirect("/login");
});


module.exports = router;
