var express    = require('express'),
    Bourne     = require('bourne'),
    bodyParser = require('body-parser'),

    // db         = new Bourne('data.json'),
    db         = new Bourne('tododata.json'),
    router     = express.Router();

router
    .use(bodyParser.json())
    .route('/todo')
        .get(function (req, res) {
            db.find({ userId: parseInt(req.user.id, 10) }, function (err, data) {
                res.json(data);
            });
        })
        .post(function (req, res) {
            var todo = req.body;
            todo.userId = req.user.id;

            db.insert(todo, function (err, data) {
                res.json(data);
            });
        });

router
    .param('id', function (req, res, next) {
        req.dbQuery = { id: parseInt(req.params.id, 10) };
        next();
    })
    .route('/todo/:id')
        .get(function (req, res) {
            db.findOne(req.dbQuery, function (err, data) {
                res.json(data);    
            });
        })
        .put(function (req, res) {
            var todo = req.body;
            delete todo.$promise;
            delete todo.$resolved;
            db.update(req.dbQuery, todo, function (err, data) {
                res.json(data[0]);
            });
        })
        .delete(function (req, res) {
            db.delete(req.dbQuery, function () {
                res.json(null);
            });
        });

module.exports = router;
