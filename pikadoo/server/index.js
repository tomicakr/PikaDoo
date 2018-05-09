import express from 'express';
import session from 'express-session';
import path from 'path';

import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from '../webpack.config.dev';

import bodyParser from 'body-parser';

let app = express();

const compiler = webpack(webpackConfig);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(webpackMiddleware(compiler, {
    hot: true,
    publicPath: webpackConfig.output.publicPath,
    noInfo: true
}));
app.use(webpackHotMiddleware(compiler));

app.use(require('./signup'));
app.use(require('./login'));
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, './index.html'));
});

app.use(session());
app.use(session({ secret: 'this-is-a-secret-token', cookie: { maxAge: 60000 }}));

app.listen(3000, () => console.log('Running on localhost:3000'));
