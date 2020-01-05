const db = require('../utils/db');
module.exports = {
    // all: () => db.load('select * from Category'),
    // single: id => db.load(`select * from Category where CateID = ${id}`),

    // allWithDetails: _ => {
    //     const sql = 
    // `select c.CateID, c.CateName, count(p.ProductID) as num_of_products
    // from Category c left join product_info p on c.CateID = p.CateID
    // group by c.CateID, c.CateName`;
    //     return db.load(sql);
    // },
    // detai: id => db.load(`select * from product_info where CateID = ${id}`),
    watchlist: id => {
        const sql =
            `SELECT p.* 
    FROM watchlist w, product_info p
    WHERE w.UserID=${id} AND w.ProductID = p.ProductID`;
        return db.load(sql);
    },
 
    biddinglist: id => {
        const sql =
        `SELECT distinct p.*
        FROM bidding_history bh, product_info p
        WHERE bh.ProductID= p.ProductID AND bh.bidder=${id} AND p.enddate > now() ;`;
        return db.load(sql);
    },
    wonlist: id => {
        const sql =
        `SELECT  p.*
        FROM bidding_history bh, product_info p
        WHERE bh.ProductID= p.ProductID AND bh.bidder=${id} AND bh.bidamount= (SELECT MAX(bh2.bidamount)
                                                                        FROM bidding_history bh2
                                                                        WHERE bh2.ProductID= bh.ProductID)
                                                            AND p.enddate < now()`;
        return db.load(sql);
    },
    delWL: (ProID, id) => {
            db.delWL('watchlist', { ProductID:ProID }, { UserID: id });
            console.log('model');
            console.log(ProID);
            console.log(id);
    },
                                  
    search: (inputSearch, id) => {
        // console.log(inputSearch);
        // console.log(id);
        const sql =
            `SELECT p.*
    FROM watchlist w, product_info p
    WHERE w.UserID=${id} AND w.ProductID = p.ProductID AND p.NameProduct like '%${inputSearch}%'`;
        return db.load(sql);
    }
};