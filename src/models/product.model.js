const db = require('../utils/db');
const config = require('../config/default.json');
//các hàm. 
//entity là object truyền vào 
module.exports = {
    all: () => db.load('select * from product_info'),
    allByCat: catId => db.load(`select * from product_info where CateID = ${catId}`),
    countByCat: async catId => {
        const rows = await db.load(`select count(*) as total from product_info where CateID = ${catId}`)
        return rows[0].total;
    },
    pageByCat: (catId, offset) => db.load(`select * from product_info where CateID = ${catId} limit ${config.paginate.limit} offset ${offset}`),
    single: id => db.load(`select * from product_info where ProductID = ${id}`),
    single_info_seller: id => db.load(`select * from product_info as p join user as u on p.Seller =u.UserID where ProductID = ${id}`),
    add: entity => db.add('product_info', entity),
    del: id => db.del('product_info', { ProductID: id }),
    patch: entity => {
        const condition = { ProductID: entity.ProductID };
        delete entity.ProductID;
        return db.patch('product_info', entity, condition);
    }
};