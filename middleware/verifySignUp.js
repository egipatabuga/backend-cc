const { Users } = require("../models")
const { Op } = require("sequelize")

const checkDuplicateUsernameorEmail = async (req, res, next) => {
    let { username, email, name, password } = req.body

    const isExist = await Users.findOne({
        where: {
            [Op.or]: [{username: username}, {email: email}]
        }
    })

    if(isExist){
        res.status(400).send({
            message: "Gagal, email atau username sudah digunakan!"
        });
        return;
    }

    next()
}

module.exports = {
    checkDuplicateUsernameorEmail
}