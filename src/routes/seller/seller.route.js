const express = require('express');
const multer = require('multer');
const sellModel = require('../../models/sell.model');

const storage = multer.diskStorage({
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    },
    destination: function (req, file, cb) {
      cb(null, `./public/imgs/`);
    },
  });
  const upload = multer({ storage });
  
  const router = express.Router();

  router.get('/upload',  (req, res)=> {
    res.render('vwSeller/sell');
  })
  
  router.post('/upload', async(req, res)=> {
    console.log(req.body);
    upload.array('fuMain[]')(req, res, err => {;
      });
      req.body.Seller=res.locals.authUser.UserID;
    const result = await sellModel.add(req.body);
    
    res.send('done');
   
  })
  
  
  module.exports = router;