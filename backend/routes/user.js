const express = require("express");
const router = express.Router();

const limiter = require("../middleware/express-rate-limit");
const auth = require("../middleware/auth");
const userCtrl = require("../controllers/users");
const passwordValidator = require("../middleware/password-validator");
const owneruser = require("../middleware/owneruser");


router.post("/signup", passwordValidator, userCtrl.signup);
router.post("/login", limiter, userCtrl.login);
router.delete("/delete/:id", auth, owneruser, userCtrl.deleteUser);
router.get("/users", userCtrl.getAllUser);
router.get("/user/:id", userCtrl.getOneUser);
router.post("/update/:id", auth, owneruser, userCtrl.modifyUser);

module.exports = router;
