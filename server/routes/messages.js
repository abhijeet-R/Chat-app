const express = require("express")
const { getAllMessages , sendMessage } = require("../controllers/messagesController")

const router = express.Router()
 
router.post("/allmessages",getAllMessages)
router.post("/sendmessage",sendMessage)


module.exports = router