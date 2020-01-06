const db = require('../utils/db');
const config = require('../config/default.json');
//các hàm. 
//entity là object truyền vào 
module.exports = {
    topbid:()=>db.load(`select* from product_info as p join (
        select ProductID,count(AuctionID)  as BidNum from bidding_history group by ProductID) as b 
        on p.ProductID=b.ProductID 
        order by BidNum DESC
        limit ${config.limithome}`),
    topprice:()=>db.load(`select* from product_info as p join (
        select ProductID,sum(BidAmount) as BidAmount from bidding_history group by ProductID) as b 
        on p.ProductID=b.ProductID 
        order by BidAmount DESC
        limit ${config.limithome} `),
    topend:()=> db.load(`select* from product_info as p join (
        select distinct ProductID from bidding_history) as b 
        on p.ProductID=b.ProductID 
        order by BuyDate DESC
        limit ${config.limithome}  `),



   
   
};