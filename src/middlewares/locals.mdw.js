const categoryModel = require('../models/category.model');

module.exports = function (app) {
  app.use(async (req, res, next) => {
    const rows = await categoryModel.allWithDetails();
    // respond local để lưu dữ liệu lại 
    res.locals.lcCategories = rows;
    //next là để có đi xuống mấy app.use ở dưới , tưởng tượng này ở ngoài app.js
    next();
  })
};

// module.exports = async (req, res, next) => {
//   const rows = await categoryModel.allWithDetails();
//   res.locals.lcCategories = rows;
//   next();
// }

