const sequelize = require("sequelize");

const db = new sequelize("db_kalpataru", "root", "kalpataru", {
    host: '34.101.253.45',
    dialect: "mysql"
});

db.sync({});

module.exports = db;
