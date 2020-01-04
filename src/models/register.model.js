const db = require('../utils/db');

module.exports = {
  all: () => db.load('select * from User'),
  single: id => db.load(`select * from User where UserID = ${id}`),
  singleByUsername: async username =>
  {
    const rows = await db.load(`select* from User where UserName='${username}'`);
    if(rows.length===0)
    return null;

    return rows[0];
  },
  add: entity => db.add('User', entity),
  del: id => db.del('User', { UserID: id }),
};
