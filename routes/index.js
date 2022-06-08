const express = require("express")
const router = express.Router()
const authJwt = require("../middleware/authJwt")

const Auth = require("./auth.routes")
const Transactions = require("./transactions.routes")
const Trash = require("./trash.routes")
const Cart = require("./cart.routes")
const Operator = require("./operator.routes")

router.use('/auth', Auth)
router.use('/transactions', [authJwt.verifyToken], Transactions)
router.use('/trash', [authJwt.verifyToken], Trash)
router.use('/cart', [authJwt.verifyToken], Cart)

//Operator Route
router.use('/operator', [authJwt.verifyToken], Operator)

module.exports = router