const db = require('../utils/db');

module.exports = {
    info: () => db.load(`select * from user where UserID = '1'`),
    patch: entity => {
        const condition = {
            FullName: entity.FullName,
            Email: entity.Email,
            PhoneNumber: entity.PhoneNumber,
            pass: entity.pass
        };
        delete entity.FullName, entity.Email, entity.PhoneNumber, entity.passs;
        return db.patch('user', entity, condition);
    },
};