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
router.get('/watchlist', async (req, res) => {
    const rows = await AboutUserModel.watchlist(res.locals.authUser.UserID);
    res.render('vwAboutUser/watchlist', {
        categories: rows,
        empty: rows.length === 0
    });
})
router.get('/biddinglist', async (req, res) => {
    const rows = await AboutUserModel.biddinglist(res.locals.authUser.UserID);
    res.render('vwAboutUser/biddinglist', {
        categories: rows,
        empty: rows.length === 0
    });
})

router.post('/watchlist/search', async(req, res) => {
    const rows = await AboutUserModel.search(req.body.inputSearchWL,res.locals.authUser.UserID);
    console.log(req.body.inputSearchWL);
    console.log(res.locals.authUser.UserID);
    res.render('vwAboutUser/watchlist', {
        categories: rows,
        empty: rows.length === 0
    });
})
router.post('/watchlist/delete/:ProductID', async(req, res) => {
    const result = await AboutUserModel.delWL(+req.params.ProductID,res.locals.authUser.UserID);
   console.log('route');
    console.log(+req.param.ProductID);
    console.log(res.locals.authUser.UserID);
    const userid=res.locals.authUser.UserID;
    console.log(userid);
    res.redirect('/user/watchlist');
})
module.exports = router;
