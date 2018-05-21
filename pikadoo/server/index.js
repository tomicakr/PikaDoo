import express from 'express';
import session from 'express-session';
import path from 'path';

import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

import bodyParser from 'body-parser';

let app = express();

const publicPath = express.static(path.join(__dirname, '../'));



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(publicPath);



app.use('/register', require('./register'));
app.use('/login', require('./login'));
app.use('/game', require('./game'));
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, './index.html'));
});

app.use(session());
app.use(session({ secret: 'this-is-a-secret-token', cookie: { maxAge: 60000 }}));

app.listen(3000, () => console.log('Running on localhost:3000'));
