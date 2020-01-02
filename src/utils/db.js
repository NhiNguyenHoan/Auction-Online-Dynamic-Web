const mysql = require('mysql');
const util = require('util');
//pool để giới hạn truy cập
const pool = mysql.createPool({
<<<<<<< HEAD
  connectionLimit: 50,
  host:'localhost',
  port:3306,
  user:'root',
  password:'Kyquan479#',
  database:'auction'
=======
    connectionLimit: 50,
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'ntcmy1142#',
    database: 'auction'
>>>>>>> 40ab8f9c155c333b2bb9ba6b749257d1f19b3693
});

const mysql_query = util.promisify(pool.query).bind(pool);

module.exports = {
    load: sql => mysql_query(sql),
    add: (tableName, entity) => mysql_query(`insert into ${tableName} set ?`, entity),
    del: (tableName, condition) => mysql_query(`delete from ${tableName} where ?`, condition),
    patch: (tableName, entity, condition) => mysql_query(`update ${tableName} set ? where ?`, [entity, condition]),
};