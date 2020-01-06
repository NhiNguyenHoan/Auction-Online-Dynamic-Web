const express = require('express');
const categoryModel = require('../../models/category.model');

const router = express.Router();

router.get('/', async(req, res) => {
    const rows = await categoryModel.all();
    res.render('vwAdmin/vwCategories/index', {
        categories: rows,
        empty: rows.length === 0
    });
})

router.get('/add', (req, res) => {
    res.render('vwAdmin/vwCategories/add');
})

router.post('/add', async(req, res) => {
    const result = await categoryModel.add(req.body);
    res.render('vwAdmin/vwCategories/add');
})

router.get('/err', (req, res) => {
    throw new Error('error occured');
})

router.get('/:id/edit', async(req, res) => {
    const rows = await categoryModel.single(req.params.id);
    if (rows.length === 0) {
        throw new Error('Invalid category id');
    }

    res.render('vwAdmin/vwCategories/edit', {
        category: rows[0]
    });
})

router.post('/patch', async(req, res) => {
    const result = await categoryModel.patch(req.body);
    res.redirect('/admin/categories');
})

router.post('/del', async(req, res) => {
    const result = await categoryModel.del(req.body.CateID);
    res.redirect('/admin/categories');
})

router.get('/:id/detail', async(req, res) => {
    try {
        // const rows = await db.load('select * from categories');
        const rows = await categoryModel.detai(+req.params.id);
        res.render('vwAdmin/vwCategories/detail', {
            categories: rows,
            empty: rows.length === 0
        });
    } catch (err) {
        console.log(err);
        //res.end('View error log in console.');
        res.render('error', { layout: false });
    }
})

router.get('/:cateID/detail/:productID/delete', async(req, res) => {
    const result = await categoryModel.delP(req.params.productID);
    res.redirect('/admin/categories');
})

module.exports = router;