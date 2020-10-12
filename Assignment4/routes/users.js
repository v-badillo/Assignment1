const path = require('path')

const express = require('express')

const userData = require('./home')

const router = express.Router()

router.get('/users', (req, res, next) => {
    const userList = userData.userList
    res.render('users', {users : userList, pageTitle: 'Users', hasUsers : userList.length > 0})
})

module.exports = router