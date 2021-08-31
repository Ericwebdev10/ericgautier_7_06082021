const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");

const userCtrl = require("../controllers/post");
const multer = require("../middleware/multer-config");
const authpost = require("../middleware/ownerpost");

router.post("/create", auth, multer, userCtrl.createPost);
router.post("/update/:id", auth, multer, authpost, userCtrl.modifyPost);
router.delete("/delete/:id", auth, authpost, userCtrl.deletePost);
router.get("/", auth, userCtrl.getAllPost);
router.get("/:id", auth, userCtrl.getOnePost);

module.exports = router;
