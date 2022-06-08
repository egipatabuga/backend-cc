const express = require("express")
const router = express.Router()
const transactionsController = require("../controllers/transactions.controller")

router.get("/", transactionsController.getData);
router.get("/:id", transactionsController.getDataDetail);
router.post("/", transactionsController.createData);

module.exports = router