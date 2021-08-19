const express = require("express");
const router = express.Router();

const limiter = require('../middleware/express-rate-limit'); //https://www.npmjs.com/package/express-rate-limit
const userCtrl = require("../controllers/users");
const passwordValidator = require('../middleware/password-validator'); //https://www.npmjs.com/package/password-validator
const auth = require("../middleware/auth");
const isUserOwner = require("../middleware/isUserOwner");

router.post("/signup", passwordValidator, userCtrl.signup);
router.post("/login", limiter, userCtrl.login);
router.delete('/delete/:id', auth, isUserOwner, userCtrl.deleteUser);
router.get('/users', userCtrl.getAllUser);
router.get('/user/:id', userCtrl.getOneUser);
router.post('/update/:id', auth, isUserOwner, userCtrl.modifyUser);

module.exports = router;
