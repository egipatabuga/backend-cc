const sequelize = require("sequelize");
const db = require("../config/db");
const Trashes = require("./trashes")

const Carts = db.define(
    "carts",
    {
        user_id: { type: sequelize.INTEGER },
        trashes_id: { type: sequelize.INTEGER },
        quantity: { type: sequelize.INTEGER },
        subtotal: { type: sequelize.INTEGER },

    },
    {
        freezeTableName: true
    }
);

Carts.belongsTo(Trashes, {
    as: "trash",
    foreignKey: "trashes_id"
})

module.exports = Carts
