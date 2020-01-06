const express = require('express');
const productModel = require('../models/category.model');
const config = require('../config/default.json');
const router = express.Router();




router.post('/', async(req, res) => {
    const page = req.query.page || 1;
    const input = req.body;
    console.log(input.inputSearch);
    const test = input.inputSearch;
    req.session.bug = input.inputSearch;
    const limit = config.paginate.limit;

    if (page < 1) page = 1;
    const offset = (page - 1) * config.paginate.limit;



    const [total, rows] = await Promise.all([
        productModel.countProduct(req.session.bug),
        productModel.pageProduct(req.session.bug, offset)
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

    res.render('vwProducts/allByCat', {
        products: rows,
        empty: rows.length === 0,
        page_numbers,
        prev_value: +page - 1,
        next_value: +page + 1,

    });
})

router.get('/', async(req, res) => {
    const page = req.query.page || 1;
    console.log(page);

    const limit = config.paginate.limit;

    if (page < 1) page = 1;
    const offset = (page - 1) * config.paginate.limit;



    const [total, rows] = await Promise.all([
        productModel.countProduct(req.session.bug),
        productModel.pageProduct(req.session.bug, offset)
    ]);

    let nPages = Math.floor(total / limit);
    if (total % limit > 0) nPages++;
    const page_numbers = [];
    for (i = 1; i <= nPages; i++) {
        page_numbers.push({
            value: i,
            isCurrentPage: i === +page
        })
    }

    res.render('vwProducts/allByCat', {
        products: rows,
        empty: rows.length === 0,
        page_numbers,
        prev_value: +page - 1,
        next_value: +page + 1,

    });
});


// router.post('/categories', async(req, res) => {
//     const page = req.query.page || 1;
//     const input = req.body;
//     console.log(input.inputSearch);
//     const test = input.inputSearch;
//     req.session.bug = input.inputSearch;
//     const limit = config.paginate.limit;

//     if (page < 1) page = 1;
//     const offset = (page - 1) * config.paginate.limit;



//     const [total, rows] = await Promise.all([
//         productModel.countByCat(req.session.bug),
//         productModel.pageByCat(req.session.bug, offset)
//     ]);

//     // const total = await productModel.countByCat(catId);
//     let nPages = Math.floor(total / limit);
//     if (total % limit > 0) nPages++;
//     const page_numbers = [];
//     for (i = 1; i <= nPages; i++) {
//         page_numbers.push({
//             value: i,
//             isCurrentPage: i === +page
//         })
//     }

//     res.render('vwProducts/allByCat', {
//         products: rows,
//         empty: rows.length === 0,
//         page_numbers,
//         prev_value: +page - 1,
//         next_value: +page + 1,

//     });
// })

module.exports = router;