const express = require('express');
const productModel = require('../models/category.model');
const config = require('../config/default.json');
const router = express.Router();

// router.post('/', async(req, res) => {

//     const rows = await productModel.search(req.body.inputSearch);
//     console.log(req.body.inputSearch);

//     res.render('vwProducts/allByCat', {
//         products: rows,
//         empty: rows.length === 0,
//     });
// })

//const input = "";

router.post('/', async(req, res) => {
    const input = req.body.inputSearch;
    console.log(req.body.inputSearch);
    //console.log(input);
    res.locals.inputSearch = req.body.inputSearch;

    // for (const c of res.locals.lcCategories) {
    //     if (c.CatID === +req.params.id) {
    //         c.isActive = true;
    //     }
    // }

    // const catId = req.params.id;
    const limit = config.paginate.limit;

    const page = req.query.page || 1;
    if (page < 1) page = 1;
    const offset = (page - 1) * config.paginate.limit;



    const [total, rows] = await Promise.all([
        productModel.countByCat(req.body.inputSearch),
        productModel.pageByCat(req.body.inputSearch, offset)
    ]);

    // const total = await productModel.countByCat(catId);
    let nPages = Math.floor(total / limit);
    if (total % limit > 0) nPages++;
    const page_numbers = [];
    for (i = 1; i <= nPages; i++) {
        page_numbers.push({
            value: i,
            isCurrentPage: i === +page
        })
    }


    // const rows = await productModel.search(req.body.inputSearch);
    // console.log(req.body.inputSearch);

    res.render('vwProducts/allByCat', {
        products: rows,
        empty: rows.length === 0,
        page_numbers,
        prev_value: +page - 1,
        next_value: +page + 1,
    });
})


router.get('/', async(req, res) => {
    for (const c of res.locals.lcCategories) {
        if (c.CatID === +req.params.id) {
            c.isActive = true;
        }
    }

    const catId = req.params.id;
    const limit = config.paginate.limit;

    const page = req.query.page || 1;
    if (page < 1) page = 1;
    const offset = (page - 1) * config.paginate.limit;

    const [total, rows] = await Promise.all([
        productModel.countByCat(res.locals.inputSearch),
        productModel.pageByCat(res.locals.inputSearchs, offset)
    ]);

    console.log(res.locals.inputSearch);

    // const total = await productModel.countByCat(catId);
    let nPages = Math.floor(total / limit);
    if (total % limit > 0) nPages++;
    const page_numbers = [];
    for (i = 1; i <= nPages; i++) {
        page_numbers.push({
            value: i,
            isCurrentPage: i === +page
        })
    }


    // const rows = await productModel.search(req.body.inputSearch);
    // console.log(req.body.inputSearch);

    res.render('vwProducts/allByCat', {
        products: rows,
        empty: rows.length === 0,
        page_numbers,
        prev_value: +page - 1,
        next_value: +page + 1,
    });

})

module.exports = router;