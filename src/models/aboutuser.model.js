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
    single: id => db.load(`select * from product_info p where p.ProductID = ${id}`),
    singleUser: id => db.load(`select * from user u where u.userid = ${id}`),
    patch: entity => {
        const condition = { ProductID: entity.ProductID };
        delete entity.ProductID;
        return db.patch('Product_info', entity, condition);
    },
    patchUser: entity => {
        const condition = { UserID: entity.UserID };
        delete entity.UserID;
        return db.patch('user', entity, condition);
    },
    watchlist: id => {
        const sql =
            `SELECT *
    FROM watchlist w, product_info p, user u
    WHERE w.UserID=${id} AND w.ProductID = p.ProductID AND p.Seller= u.UserID `;
        return db.load(sql);
    },
 
    biddinglist: id => {
        const sql =
        `SELECT distinct p.*, u.UserName, bh.BidAmount
        FROM bidding_history bh, product_info p, user u
        WHERE bh.ProductID= p.ProductID AND bh.bidder=${id} AND p.Seller= u.UserID  AND p.enddate > now()AND bh.BidTime >= ALL 
                                                                                            (SELECT bh2.BidTime
                                                                                            FROM bidding_history bh2
                                                                                             WHERE bh2.ProductID= bh.ProductID AND  bh2.bidder=${id}) `;
        return db.load(sql);
    },
    wonlist: id => {
        const sql =
        `SELECT  p.*, u.UserName, bh.BidAmount
        FROM bidding_history bh, product_info p, user u
        WHERE bh.ProductID= p.ProductID AND bh.bidder=${id} AND p.Seller= u.UserID AND bh.bidamount= (SELECT MAX(bh2.bidamount)
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
    SellingProduct: id => {
        const sql =
        `SELECT * FROM product_info p, user u
        WHERE p.Seller=${id} AND p.Seller= u.UserID AND p.EndDate > NOW()`;
        return db.load(sql);
    },  
    SoldProduct: id => {
        const sql =
        `SELECT  *
        FROM bidding_history bh, product_info p, user u
        WHERE bh.ProductID= p.ProductID AND p.Seller=${id} AND p.Seller= u.UserID  AND p.enddate < now() AND bh.BidAmount=
                                                                                                            (SELECT MAX(bh2.bidamount)
                                                                                                             FROM bidding_history bh2
                                                                                                            WHERE bh2.ProductID= bh.ProductID)`;
        return db.load(sql);
    },                     
    search: (inputSearch, id) => {
        // console.log(inputSearch);
        // console.log(id);
        const sql =
            `SELECT p.*
    FROM watchlist w, product_info p
    WHERE w.UserID=${id} AND w.ProductID = p.ProductID AND p.NameProduct like '%${inputSearch}%'`;
        return db.load(sql);
    },
    check: entity=> db.load(`SELECT  p.*
    FROM bidding_history bh, product_info p
    WHERE bh.ProductID= p.ProductID AND bh.ProductID=${entity.ProductID} AND bh.bidder=${entity.UserID} AND bh.bidamount= (SELECT MAX(bh2.bidamount)
                                                                    FROM bidding_history bh2
                                                                    WHERE bh2.ProductID= bh.ProductID)`),
};