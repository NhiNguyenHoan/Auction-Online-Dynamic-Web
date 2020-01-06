const express = require('express');
const bcrypt = require('bcryptjs');
const userModel = require('../../models/user.model');

const router = express.Router();

router.get('/', async(req, res) => {
    const rows = await userModel.info(res.locals.authUser.UserID);
    res.render('vwUsers/info', {
        user: rows[0],
        empty: rows.length === 0,
    });
})

router.get('/edit', async(req, res) => {
    const rows = await userModel.info(res.locals.authUser.UserID);
    console.log(res.locals.authUser.UserID);
    if (rows.length === 0) {
        throw new Error('Invalid user id');
    }
    res.render('vwUsers/edit', {
        user: rows[0]
    });

})

router.post('/patch', async(req, res) => {
    const condition = { UserID: res.locals.authUser.UserID };
    const N = 10;
    if (req.body.raw_password === null || req.body.raw_password === '') {
        res.locals.authUser.pass = res.locals.authUser.pass;
    } else {
        res.locals.authUser.pass = req.body.raw_password;
    }
    const hash = bcrypt.hashSync(req.body.raw_password, N);
    const entity = req.body;
    entity.pass = hash;
    // 0 la admin , 1 la seller, 2 la bidder, 3 la bidder cho duyet len seller

    delete entity.raw_password;

    const result = await userModel.patch(entity, condition);
    res.redirect('/');
})

router.get('/upgrade', async(req, res) => {
    const condition = { UserID: res.locals.authUser.UserID };
    console.log(condition.UserID);
    if (res.locals.authUser.UserID === 2) {
        const result = await userModel.upgrade(condition.UserID);
    }
    res.redirect('/');
})

module.exports = router;