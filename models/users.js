const sequelize = require("sequelize");
const db = require("../config/db");
const Members = require("./members");
const Transactions = require("./transactions");

const Users = db.define(
    "users",
    {
        username: { type: sequelize.STRING },
        email: { type: sequelize.STRING },
        password: { type: sequelize.STRING },
        type: {  type: sequelize.ENUM("MEMBER", "ADMIN") },
    },
    {
        freezeTableName: true
    }
);

Users.hasOne(Members, {
    as: "member",
    foreignKey: "user_id"
});

Users.hasMany(Transactions, {
    as: "transactions",
    foreignKey: "user_id"
})

module.exports = Users