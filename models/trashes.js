const sequelize = require("sequelize");
const db = require("../config/db");

const Trashes = db.define(
    "trashes",
    {
        jenis: { type: sequelize.STRING },
        price: { type: sequelize.INTEGER }
    },
    {
        freezeTableName: true
    }
);

module.exports = Trashes