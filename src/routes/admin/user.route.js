const express = require('express');
const categoryModel = require('../../models/user.model');

const router = express.Router();

router.get('/', async(req, res) => {

    try {
        // const rows = await db.load('select * from categories');
        const rows = await categoryModel.all();
        res.render('vwUsers/index', {
            users: rows,
            empty: rows.length === 0
        });
    } catch (err) {
        console.log(err);
        res.end('View error log in console.');
    }

})

module.exports = router;