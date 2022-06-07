const sequelize = require("sequelize");
const db = require("../config/db")
const Jenis = db.define(
    "harga/kg",
    {
        jenis: {type: sequelize.STRING},
        harga: {type: sequelize.INTEGER},
    },
    {
        freezeTableName: true
    }
);

const History = db.define(
    "history_transaksi",
    {
        username: {type: sequelize.STRING},
        payed: {type: sequelize.INTEGER},
        date:{type: sequelize.DATE},
        time:{type: sequelize.TIME},
    },
    {
        freezeTableName: true
    }
);
module.exports = {Jenis, History};
