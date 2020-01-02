const db = require('../utils/db');
//các hàm. 
//entity là object truyền vào 
module.exports = {
  all: () => db.load('select * from Category'),
  single: id => db.load(`select * from Category where CateID = ${id}`),
  add: entity => db.add('Category', entity),
  del: id => db.del('Category', { CateID: id }),
  patch: entity => {
    const condition = { CateID: entity.CateID };
    delete entity.CateID;
    return db.patch('Category', entity, condition);
  },

  allWithDetails: _ => {
    const sql = `
    select c.CateID, c.CateName, count(p.ProductID) as num_of_products
    from Category c left join product_info p on c.CateID = p.CateID
    group by c.CateID, c.CateName`;
    return db.load(sql);
  },
};
