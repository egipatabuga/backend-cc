const express = require("express")
const router = express.Router()
const cartController = require("../controllers/cart.controller")

router.get("/", cartController.getData);
router.get("/:id", cartController.getDataDetail);
router.post("/", cartController.createData);
router.put("/:id", cartController.updateData);

module.exports = router