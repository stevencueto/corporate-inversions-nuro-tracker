const express = require('express')
const router = express.Router()
const User = require('../models/User')
const userExists = require('../middleware/userExists')
const { hashedPassword, comparePassword} = require('../middleware/passwordHasser')
const catchErr = require('../middleware/serverError')



router.post('/', userExists,  async (req, res)=>{
    req.body.password = hashedPassword(req.body.password)
    try {
        const newUser = await User.create(req.body)
        return res.send({
            success: true,
            data: newUser
        })
    }catch(err){
        catchErr(err, res, 'Interal Server Error')
    }
})




module.exports = router;