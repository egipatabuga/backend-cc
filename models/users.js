const sequelize = require("sequelize");
const db = require("../config/db");
const Members = require("./members");
const Operators = require("./operators");
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
        freezeTableName: true,
        defaultScope: {
            attributes: { exclude: ['password'] }
        }
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

module.exports = Users