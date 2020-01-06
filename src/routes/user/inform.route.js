const express = require('express');
const AboutUserModel = require("../../models/aboutuser.model");
const categoriesmodel =  require("../../models/category.model");
const router = express.Router();

router.get('/', async (req, res) => {
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
    rows.forEach(async element => {
        var bool = await AboutUserModel.check({
            UserID: res.locals.authUser.UserID,
            ProductID: +element.ProductID
        });
        console.log(bool);
        element.check = (bool.length > 0);
    });
    //console.log(rows);
    res.render('vwAboutUser/biddinglist', {
        categories: rows,
        empty: rows.length === 0
    });
})
router.get('/wonlist', async (req, res) => {


    const rows = await AboutUserModel.wonlist(res.locals.authUser.UserID);
    
    res.render('vwAboutUser/wonlist', {
        categories: rows,
        empty: rows.length === 0
    });
})
router.get('/wonlist/like/:id', async (req, res) => {


    const rows = await AboutUserModel.singleUser(+req.params.id);

    rows[0].NumberLike=   rows[0].NumberLike+1;
    console.log("Seller: ",req.params.id);
    console.log(rows[0].NumberLike);
    await AboutUserModel.patchUser(rows[0]);
    res.redirect('/user/wonlist');
})
router.get('/wonlist/dislike/:id', async (req, res) => {

    console.log("hello");
    const rows = await AboutUserModel.singleUser(+req.params.id);
    console.log("Seller: ",req.params.id);
    rows[0].NumberDislike=   rows[0].NumberDislike+1;
    console.log(rows[0].NumberDislike);
    await AboutUserModel.patchUser(rows[0]);
    res.redirect('/user/wonlist');
})
// Selling
router.get('/selling', async (req, res) => {


    const rows = await AboutUserModel.SellingProduct(res.locals.authUser.UserID);

    res.render('vwAboutUser/selling', {
        categories: rows,
        empty: rows.length === 0
    });
})
router.post('/selling/edit', async (req, res) => {

    const rows = await AboutUserModel.single(req.body.editSell);
    console.log(rows);
    if (rows.length === 0) {
        throw new Error('Invalid category id');
    }
    res.render('vwAboutUser/editmyproduct', {
        product: rows[0]
    });
})
router.post('/edit/:id', async (req, res) => {

    const rows = await AboutUserModel.single(+req.params.id);
    console.log(rows);
    rows[0].Descript= req.body.FullDes;
    console.log( rows[0].Descript);
    await AboutUserModel.patch(rows[0]);
    res.redirect('/user/selling');
})

// SOLD
router.get('/sold', async (req, res) => {
    const rows = await AboutUserModel.SoldProduct(res.locals.authUser.UserID);
    
   
    res.render('vwAboutUser/sold', {
        categories: rows,
        empty: rows.length === 0
    });
})
router.get('/sold/like/:id', async (req, res) => {


    const rows = await AboutUserModel.singleUser(+req.params.id);

    rows[0].NumberLike=   rows[0].NumberLike+1;
    console.log("Bidder: ",req.params.id);
    console.log(rows[0].NumberLike);
    await AboutUserModel.patchUser(rows[0]);
    res.redirect('/user/sold');
})

router.get('/sold/dislike/:id', async (req, res) => {

  
    const rows = await AboutUserModel.singleUser(+req.params.id);

    rows[0].NumberDislike=   rows[0].NumberDislike+1;
    console.log("Bidder: ",req.params.id);
    console.log(rows[0].NumberDislike);
    await AboutUserModel.patchUser(rows[0]);
    res.redirect('/user/sold');
})
router.post('/watchlist/search', async (req, res) => {
    const rows = await AboutUserModel.search(req.body.inputSearchWL, res.locals.authUser.UserID);
    console.log(req.body.inputSearchWL);
    console.log(res.locals.authUser.UserID);
    res.render('vwAboutUser/watchlist', {
        categories: rows,
        empty: rows.length === 0
    });
})
router.post('/watchlist/delete/:ProductID', async (req, res) => {
    const result = await AboutUserModel.delWL(+req.params.ProductID, res.locals.authUser.UserID);
    console.log('route');
    console.log(+req.param.ProductID);
    console.log(res.locals.authUser.UserID);
    res.redirect('/user/watchlist');
})
module.exports = router;
