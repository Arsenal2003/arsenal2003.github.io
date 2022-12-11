var express = require('express');
var router = express.Router();

var database = require('../database');
global.divstate = 0;
/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', { title: 'Express', session: req.session });
});

router.get('/cupons', function (req, res, next) {

    res.render('cupons', { title: 'Express', session: req.session });
});
router.get('/earn', function (req, res, next) {

    res.render('earn', { title: 'Express', session: req.session });
});


router.get('/earn/adidas', function (req, res, next) {

    res.render('adidas', { title: 'Express', session: req.session });
});

router.get('/earn/c&a', function (req, res, next) {

    res.render('c&a', { title: 'Express', session: req.session });
});

router.get('/earn/h&m', function (req, res, next) {

    res.render('h&m', { title: 'Express', session: req.session });
});
router.get('/earn/nike', function (req, res, next) {

    res.render('nike', { title: 'Express', session: req.session });
});
router.get('/earn/zara', function (req, res, next) {

    res.render('zara', { title: 'Express', session: req.session });
});
router.get('/earn/p&b', function (req, res, next) {

    res.render('p&b', { title: 'Express', session: req.session });
});

router.get('/outfitbattle', function (req, res, next) {

    res.render('outfitbattle', { title: 'Express', session: req.session });
});

router.post('/login', function (request, response, next) {

    var user_email_address = request.body.user_email_address;

    var user_password = request.body.user_password;

    if (user_email_address && user_password) {
        query = `
        SELECT * FROM user_login 
        WHERE user_email = "${user_email_address}"
        `;

        database.query(query, function (error, data) {

            if (data.length > 0) {
                for (var count = 0; count < data.length; count++) {
                    if (data[count].user_password == user_password) {
                        request.session.user_id = data[count].user_id;

                        response.redirect("/");
                    }
                    else {
                        response.send('Incorrect Password');
                    }
                }
            }
            else {
                response.send('Incorrect Email Address');
            }
            response.end();
        });
    }
    else {
        response.send('Please Enter Email Address and Password Details');
        response.end();
    }

});

router.get('/logout', function (request, response, next) {

    request.session.destroy();

    response.redirect("/");

});

module.exports = router;
