const categoryModel = require('../models/category.model');

module.exports = function (app) {
  app.use(async (req, res, next) => {
    const rows = await categoryModel.allWithDetails();
    // respond local để lưu dữ liệu lại 
    res.locals.lcCategories = rows;
    if (typeof (req.session.isAuthenticated) === 'undefined') {
      req.session.isAuthenticated = false;
    }
    res.locals.isAuthenticated = req.session.isAuthenticated;
    res.locals.authUser = req.session.authUser;
   
    //next là để có đi xuống mấy app.use ở dưới , tưởng tượng này ở ngoài app.js
    next();
  })
};

// module.exports = async (req, res, next) => {
//   const rows = await categoryModel.allWithDetails();
//   res.locals.lcCategories = rows;
//   next();
// }

