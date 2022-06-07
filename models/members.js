const sequelize = require("sequelize");
const db = require("../config/db");

const Members = db.define(
    "members",
    {
        user_id: { type: sequelize.INTEGER },
        name: { type: sequelize.STRING },
        email: { type: sequelize.STRING },
        points: { type: sequelize.INTEGER },
        balance: { type: sequelize.INTEGER },
    },
    {
        freezeTableName: true
    }
);

module.exports = Members
