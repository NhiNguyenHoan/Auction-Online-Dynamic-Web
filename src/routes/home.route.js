const express = require('express');
const homeModel = require('../models/home.model');
const config = require('../config/default.json');

const router = express.Router();

router.get('/', async (req, res) => {

  const rows = await homeModel.topbid();
  const rows2 =await homeModel.topprice();
  const rows3 =await homeModel.topend();
  res.render('home', {
    products: rows,
    products2: rows2,
    products3: rows3,
  });
})


module.exports = router;