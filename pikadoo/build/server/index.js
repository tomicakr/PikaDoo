'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _expressSession = require('express-session');

var _expressSession2 = _interopRequireDefault(_expressSession);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _webpack = require('webpack');

var _webpack2 = _interopRequireDefault(_webpack);

var _webpackDevMiddleware = require('webpack-dev-middleware');

var _webpackDevMiddleware2 = _interopRequireDefault(_webpackDevMiddleware);

var _webpackHotMiddleware = require('webpack-hot-middleware');

var _webpackHotMiddleware2 = _interopRequireDefault(_webpackHotMiddleware);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

var publicPath = _express2.default.static(_path2.default.join(__dirname, '../'));

app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: true }));
app.use(publicPath);

app.use(require('./signup'));
app.use(require('./login'));
app.get('/*', function (req, res) {
    res.sendFile(_path2.default.join(__dirname, './index.html'));
});

app.use((0, _expressSession2.default)());
app.use((0, _expressSession2.default)({ secret: 'this-is-a-secret-token', cookie: { maxAge: 60000 } }));

app.listen(3000, function () {
    return console.log('Running on localhost:3000');
});