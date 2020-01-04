const express = require('express');
const userModel = require('../../models/user.model');

const router = express.Router();

router.get('/', async(req, res) => {
    const rows = await userModel.info();
    res.render('vwUsers/info', {
        user: rows[0],
        empty: rows.length === 0,
    });
})

router.get('/edit', async(req, res) => {
    const rows = await userModel.info();
    if (rows.length === 0) {
        throw new Error('Invalid category id');
    }

    res.render('vwUsers/edit', {
        user: rows[0]
    });
})

router.post('/patch', async(req, res) => {
    const result = await categoryModel.patch(req.body);
    res.redirect('/admin/categories');
})

module.exports = router;