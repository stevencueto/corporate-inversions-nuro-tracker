const express = require('express')
const router = express.Router()
const Something = require('../models/something')
const catchErr = require('../middleware/serverError')
const  __history = {
    event: 'created',
    user: undefined, // An object id of the user that generate the event
    reason: undefined,
    data: undefined, // Additional data to save with the event
    type: undefined, // One of 'patch', 'minor', 'major'. If undefined defaults to 'major'
    method: 'newTank' // Optional and intended for method reference
  }


router.post('/',  async (req, res)=>{
    try {
        const newUser = await Something.create({...req.body, __history})
        return res.send({
            success: true,
            data: newUser
        })
    }catch(err){
        catchErr(err, res, 'Interal Server Error')
    }
})

router.put('/:id',  async (req, res)=>{
    try {
        const newUser = await Something.findByIdAndUpdate(req.params.id, req.body)
        return res.send({
            success: true,
            data: newUser
        })
    }catch(err){
        catchErr(err, res, 'Interal Server Error')
    }
})



module.exports = router;