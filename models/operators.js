const sequelize = require("sequelize");
const db = require("../config/db");

const Operators = db.define(
    "operators",
    {
        user_id: { type: sequelize.INTEGER },
        name: { type: sequelize.STRING },
        points: { type: sequelize.INTEGER },
        balance: { type: sequelize.INTEGER },
        long: { type: sequelize.STRING },
        lat: { type: sequelize.STRING },
        address: { type: sequelize.TEXT }
    },
    {
        freezeTableName: true
    }
);

module.exports = Operators
