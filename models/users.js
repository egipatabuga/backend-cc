const sequelize = require("sequelize");
const db = require("../config/db");
const Members = require("./members");
const Operators = require("./operators");
const Transactions = require("./transactions");
const userEnums = require("../config/userEnums");

const Users = db.define(
    "users",
    {
        username: { type: sequelize.STRING },
        email: { type: sequelize.STRING },
        password: { type: sequelize.STRING },
        type: {  type: sequelize.ENUM(userEnums.MEMBER, userEnums.ADMIN, userEnums.OPERATOR) },
    },
    {
        freezeTableName: true
    }
);

Users.hasOne(Members, {
    as: "member",
    foreignKey: "user_id"
});

Users.hasOne(Operators, {
    as: "operator",
    foreignKey: "user_id"
});

Users.hasMany(Transactions, {
    as: "transactions",
    foreignKey: "user_id"
})

module.exports = Users