// 配置数据库
const mysql = require('mysql');

const db = mysql.createPool({
  host: 'localhost', // 数据库所在的ip
  user: 'root',
  password: 'admin123',
  database: 'my_db_01'
})

module.exports = db;