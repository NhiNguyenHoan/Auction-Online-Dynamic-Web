const express = require('express');
const bcrypt = require('bcryptjs');
const moment = require('moment');
const userModel = require('../models/register.model');

const router = express.Router();

router.get('/register', async(req, res) => {
    res.render('vwAccount/register', { layout: false })
});

router.post('/register', async(req, res) => {
    const N = 10;
    const hash = bcrypt.hashSync(req.body.raw_password, N);
    const dob = moment(req.body.dob, 'DD/MM/YYYY').format('YYYY-MM-DD');

    const entity = req.body;
    entity.pass = hash;
    // 0 la admin , 1 la seller, 2 la bidder
    entity.TypeUser = 2;
    entity.Birthday = dob;

    delete entity.raw_password;
    delete entity.dob;

    const result = await userModel.add(entity);
    res.redirect('/');
});

router.get('/login', (req, res) => {
    res.render('vwAccount/login', { layout: false })
});

router.post('/login', async(req, res) => {
    // const user = {
    //   username:req.body.username,
    //   password: req.body.password
    // };

    const user = await userModel.singleByUsername(req.body.username);
    if (user === null)
        throw new Error('Invalid username or password,');
    const rs = bcrypt.compareSync(req.body.password, user.pass);
    if (rs === false)
        return res.render('vwAccount/login', {
            layout: false,
            err_message: 'Login failed'
        });

    delete user.pass;
    req.session.isAuthenticated = true;
    req.session.authUser = user;

    if (req.session.authUser.TypeUser === 0) {
        //admin
        res.redirect('http://localhost:3000/admin/categories')
    } else if (req.session.authUser.TypeUser === 1) {
        //seller
        res.redirect('/')
    } else if (req.session.authUser.TypeUser === 2 || req.session.authUser.TypeUser === 2) {
        //bidder or bidder waiting upgrade
        res.redirect('/')
    }


    //res.redirect('/');

})

router.post('/logout', (req, res) => {
    req.session.isAuthenticated = false;
    req.session.authUser = null;
    res.redirect(req.headers.referer);
});

module.exports = router;