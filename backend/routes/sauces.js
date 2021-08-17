const express = require("express");
const router = express.Router();

const saucesCtrl = require("../controllers/sauces");
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

router.post("/", auth, multer, saucesCtrl.createSauce);
router.put("/:id", auth, multer, saucesCtrl.modifySauce);
router.delete("/:id", auth, saucesCtrl.deleteSauce);
router.get("/", auth, saucesCtrl.getAllsauces);
router.get("/:id", auth, saucesCtrl.getOneSauce);
router.post('/:id/like', auth, saucesCtrl.updateLikeDislike);

module.exports = router;
