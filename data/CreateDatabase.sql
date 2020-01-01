DROP DATABASE IF EXISTS auction;
create database auction;
CREATE TABLE auction.product_info(
	ProductID int not null AUTO_INCREMENT,
    CateID int NOT NULL,
    NameProduct nvarchar(100),
    Descript text,
    BuyDate datetime,
    EndDate datetime,
    Seller int NOT NULL,
    StartPricce int,
    BIN int,
    Step int,
    PRIMARY KEY (ProductID)
);
CREATE TABLE auction.Category(
	CateID int NOT NULL AUTO_INCREMENT,
    CateName nvarchar(100),
	PRIMARY KEY (CateID)
);
/*
CREATE TABLE auction.list_categories(
	CateID int NOT NULL,
	ProductID int NOT NULL,
	PRIMARY KEY (CateID,ProductID)
);
*/
CREATE TABLE auction.User(
	UserID int NOT NULL AUTO_INCREMENT,
    FullName nvarchar(100),
    pass varchar(100),
    Address nvarchar(200),
    Email varchar(50),
    PhoneNumber char(10),
    Birthday date,
    TypeUser int,
    NumberLike int,
    NumberDislike int,
    PRIMARY KEY (UserID)
    
);
CREATE TABLE auction.bidding_history(
		AuctionID int NOT NULL AUTO_INCREMENT,
		Bidder int NOT NULL,
        ProductID int NOT NULL,
        BidTime datetime NOT NULL,
        BidAmount int NOT NULL,
        PRIMARY KEY (AuctionID)
);
CREATE TABLE auction.bill_detail(
	AuctionID int NOT NULL,
    Address nvarchar(200),
    Email varchar(50),
    PhoneNumber char(10),
	PRIMARY KEY (AuctionID)
);

/*ALTER TABLE auction.list_categories
ADD CONSTRAINT FK_IDCate FOREIGN KEY (CateID) REFERENCES  auction.Category(CateID),
ADD CONSTRAINT FK_ProductID FOREIGN KEY (ProductID) REFERENCES  auction.product_info(ProductID);
*/

ALTER TABLE auction.product_info
ADD CONSTRAINT FK_Seller FOREIGN KEY (Seller) REFERENCES  auction.User(UserID);


ALTER TABLE auction.bidding_history
ADD CONSTRAINT FK_Bidder FOREIGN KEY (Bidder) REFERENCES  auction.User(UserID),
ADD CONSTRAINT FK_Product FOREIGN KEY (ProductID) REFERENCES   auction.product_info(ProductID);

ALTER TABLE auction.bill_detail
ADD CONSTRAINT FK_AuctionID FOREIGN KEY (AuctionID) REFERENCES   auction.bidding_history(AuctionID);

use auction;



