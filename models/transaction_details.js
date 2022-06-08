const sequelize = require("sequelize");
const db = require("../config/db");
const Trashes = require("./trashes")

const TransactionDetails = db.define(
    "transaction_details",
    {
        transaction_id: { type: sequelize.INTEGER },
        trashes_id: { type: sequelize.INTEGER },
        quantity: { type: sequelize.INTEGER },
        subtotal: { type: sequelize.INTEGER },
    },
    {
        freezeTableName: true
    }
);

TransactionDetails.belongsTo(Trashes, {
    as: "trash",
    foreignKey: "trashes_id"
})

module.exports = TransactionDetails