const db = require('../utils/db');
const config = require('../config/default.json');
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
    detai: id => db.load(`select * from product_info where CateID = ${id}`),
    delP: id => db.del('product_info', { ProductID: id }),
    search: inputSearch => db.load(`select * from product_info where NameProduct like '%${inputSearch}%'`),
    countByCat: async inputSearch => {
        const rows = await db.load(`select count(*) as total from product_info where NameProduct like '%${inputSearch}%'`)
        return rows[0].total;
    },
    pageByCat: (inputSearch, offset) => db.load(`select * from product_info where NameProduct like '%${inputSearch}%' limit ${config.paginate.limit} offset ${offset}`),
};