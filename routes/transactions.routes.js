const express = require("express")
const router = express.Router()
const transactionsController = require("../controllers/transactions.controller")
const verifyRole = require("../middleware/verifyRole")

router.get("/", transactionsController.getData);
router.get("/:id", transactionsController.getDataDetail);
router.post("/", transactionsController.createData);

router.put("/buy/:id", [
    verifyRole.checkIsOperator
], transactionsController.buyTransaction)

module.exports = router