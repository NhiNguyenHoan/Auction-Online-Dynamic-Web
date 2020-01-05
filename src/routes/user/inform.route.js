const express = require('express');
const AboutUserModel = require("../../models/aboutuser.model");

const router = express.Router();

router.get('/', async(req, res) => {
    const rows = await AboutUserModel.all();
    res.render('vwAboutUser/index', {
        categories: rows,
        empty: rows.length === 0
    });
})
//
// xem ds watchlist theo id user :id
//dấu : để hiện giá trị
router.get('/:id/watchlist', async (req, res) => {
    const rows = await AboutUserModel.watchlist(+req.params.id);
    res.render('vwAboutUser/watchlist', {
        categories: rows,
        empty: rows.length === 0
    });
})
router.get('/:id/biddinglist', async (req, res) => {
    const rows = await AboutUserModel.biddinglist(+req.params.id);
    res.render('vwAboutUser/biddinglist', {
        categories: rows,
        empty: rows.length === 0
    });
})

router.post('/:id/watchlist/search', async(req, res) => {
    const rows = await AboutUserModel.search(req.body.inputSearchWL,+req.params.id);
    console.log(req.body.inputSearchWL);
    console.log(+req.params.id);
    res.render('vwAboutUser/watchlist', {
        categories: rows,
        empty: rows.length === 0
    });
})
router.post('/:id/watchlist/delete/:ProductID', async(req, res) => {
    const result = await AboutUserModel.delWL(+req.params.ProductID,+req.params.id);
   console.log('route');
    console.log(+req.param.ProductID);
    console.log(+req.params.id);
    res.redirect('/user/:id/watchlist');
})
module.exports = router;