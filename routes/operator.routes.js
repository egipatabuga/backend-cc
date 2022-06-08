const express = require("express")
const router = express.Router()
const transactionsController = require("../controllers/transactions.controller")
const verifyToken = require("../middleware/authJwt")
const verifyRole = require("../middleware/verifyRole")

router.get("/transactions", [
    verifyToken.verifyToken,
    verifyRole.checkIsOperator
], transactionsController.getDataOperator)

router.get("/transactions/:id", [
    verifyToken.verifyToken,
    verifyRole.checkIsOperator
], transactionsController.getDataOperatorDetail)

router.put("/transactions/buy/:id", [
    verifyToken.verifyToken,
    verifyRole.checkIsOperator
], transactionsController.buyTransaction)

router.put("/transactions/complete/:id", [
    verifyToken.verifyToken,
    verifyRole.checkIsOperator
], transactionsController.completeTransaction)

module.exports = router