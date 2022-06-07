const express = require("express")
const router = express.Router()
const trashController = require("../controllers/trashes.controller")

router.post("/get-price-prediction", trashController.getPrice);
router.get("/", trashController.getData);
router.get("/:id", trashController.getDetail);
router.post("/", trashController.createData);
router.put("/:id", trashController.updateData);
router.delete("/:id", trashController.deleteData);

module.exports = router