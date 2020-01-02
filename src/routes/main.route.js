const express = require('express');
const productModel = require('../models/category.model');
const config = require('../config/default.json');
const router = express.Router();

router.post('/', async(req, res) => {

    const rows = await productModel.search(req.body.inputSearch);
    console.log(req.body.inputSearch);

    res.render('vwProducts/allByCat', {
        products: rows,
        empty: rows.length === 0,
    });
})

module.exports = router;