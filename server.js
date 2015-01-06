var express = require('express'),
    api     = require('./api'),
    users   = require('./accounts'),
    app     = express();

app
    .use(express.static('./public'))
    .use(users)
    .use('/api', api)
    .get('*', function (req, res) {
        if (!req.user) {
            res.redirect('/login');
        } else {
            res.sendfile('public/main.html');
        }
    }).listen(1337, '127.0.0.1');

    console.log('Server running at http://127.0.0.1:1337/');
