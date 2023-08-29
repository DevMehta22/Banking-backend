const express = require('express')
const {
    addAccount,
    viewAccount
}= require('../Controllers/accControllers')

const router = express.Router()
router.post('/addaccount',addAccount);
router.post('/viewaccount',viewAccount);

module.exports = router

