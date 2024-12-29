const express=require("express");
const router=express.Router(); // For Routes
const {login}=require("../controllers/user");
const {register}=require("../controllers/user");

router.route("/login").post(login);
router.route("/register").post(register);
router.route("/add_to_activity")
router.route("/get_all_activity")

module.exports = router;