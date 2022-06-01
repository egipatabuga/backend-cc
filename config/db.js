const sequelize = require("sequelize");

const db = new sequelize("harga_sampah", "root", "", {
    dialect: "mysql"
});

db.sync({});

module.exports = db;