const sequelize = require("sequelize");

const db = new sequelize("db_kalpataru", "root", "", {
    dialect: "mysql"
});

db.sync({});

module.exports = db;