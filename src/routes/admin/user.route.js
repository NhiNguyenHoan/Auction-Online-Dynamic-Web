const express = require('express');
const categoryModel = require('../../models/user.model');

const router = express.Router();

router.get('/', async(req, res) => {

    try {
        // const rows = await db.load('select * from categories');
        const rows = await categoryModel.all();
        res.render('vwAdmin/vwUsers/index', {
            users: rows,
            empty: rows.length === 0
        });
        // res.render('error', {
        //     layout: false,
        //     users: rows,
        //     empty: rows.length === 0
        // })
    } catch (err) {
        console.log(err);
        // res.end('View error log in console.');
        res.render('error', { layout: false, });
    }

})

router.get('/waitinglist', async(req, res) => {

    try {
        const rows = await categoryModel.waitingList();
        res.render('vwAdmin/vwUsers/waitinglist', {
            users: rows,
            empty: rows.length === 0
        });
    } catch (err) {
        console.log(err);
        //res.end('View error log in console.');
        res.render('error', { layout: false, });
    }

})

router.get('/waitinglist/:userID/upgrade', async(req, res) => {
    const result = await categoryModel.acceptupgrade(req.params.userID);
    res.redirect('/admin/users/waitinglist');

})

router.get('/seller', async(req, res) => {

    try {
        const rows = await categoryModel.listseller();
        res.render('vwAdmin/vwUsers/downgrade', {
            users: rows,
            empty: rows.length === 0
        });
    } catch (err) {
        console.log(err);
        // res.end('View error log in console.');
        res.render('error', { layout: false });
    }

})

router.get('/seller/:userID/downgrade', async(req, res) => {
    const result = await categoryModel.downgrade(req.params.userID);
    res.redirect('/admin/users/seller');

})

module.exports = router;