const db = require('../utils/db');

module.exports = {
    all: () => db.load('select * from user'),

    waitingList: () => db.load(`select * from user where TypeUser = '3'`),

    info: UserID => db.load(`select * from user where UserID = ${UserID}`),

    patch: (entity, condition) => {
        delete entity.FullName, entity.Email, entity.PhoneNumber, entity.pass;
        return db.patch('user', entity, condition);
    },

    upgrade: UserID => db.load(`update user set TypeUser = '3' where UserID = ${UserID}`),

    acceptupgrade: UserID => db.load(`update user set TypeUser = '1' where UserID = ${UserID}`),

    listseller: () => db.load(`select * from user where TypeUser = '1'`),

    downgrade: UserID => db.load(`update user set TypeUser = '2' where UserID = ${UserID}`),
};