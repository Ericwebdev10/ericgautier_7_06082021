const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");

const authcomm = require("../middleware/ownercomment");
const userCtrl = require("../controllers/comment");

router.post("/create", auth, userCtrl.createComment);
router.delete("/delete/:id", auth, authcomm, userCtrl.deleteComment);
router.get("/:id", auth, userCtrl.getAllComm);
router.get("/onecom/:id", auth, userCtrl.getOneComm);

module.exports = router;
