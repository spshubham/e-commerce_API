const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();

const User = require('../models/User');

router.get('/', async (req, res) =>{
    console.log("HIIII")
    const userList = await User.find().select('-passwordHash');

    if(!userList) {
        res.status(500).json({success:false})
    }
    res.send(userList);
})

router.post('/register', async (req, res) => {
    console.log(req)
    let user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        type: req.body.type

    })

    user = await user.save();

    if (!user)
        return res.status(404).send('User cannot be created')
    res.send(user);
})



router.post('/login', async (req, res) => {
    const user = await User.findOne({ email: req.body.email, password: req.body.password})

    if(!user) {
        return res.status(400).send('User with given Email not found');
    }

    return res.status(200).send(user);
})


module.exports = router;