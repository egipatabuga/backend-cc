const sequelize = require("sequelize");
const db = require("../config/db");
const TransactionDetails = require("./transaction_details");

const Transactions = db.define(
    "transactions",
    {
        user_id: { type: sequelize.INTEGER },
        total: { type: sequelize.STRING },
        status: { type: sequelize.ENUM("CART", "WAITING", "COMPLETE") },
    },
    {
        freezeTableName: true
    }
);

Transactions.hasMany(TransactionDetails, {
    as: "details",
    foreignKey: "transaction_id"
})

module.exports = Transactions