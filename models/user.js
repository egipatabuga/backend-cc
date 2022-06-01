const sequelize = require("sequelize");
const db = require("../config/db")
const Jenis = db.define(
    "Harga/Kg",
    {
        jenis: {type: sequelize.STRING},
        harga: {type: sequelize.INTEGER},
    },
    {
        freezeTableName: true
    }
);

module.exports = Jenis;