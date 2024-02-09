const express = require("express")
const { register, login, setavatar, getAllUsers } = require("../controllers/userControllers")

const router = express.Router()
 
router.get("/allusers/:id",getAllUsers)
router.post("/register",register)
router.post("/login",login)
router.post("/setavatar/:id",setavatar)


module.exports = router