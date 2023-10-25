const router = require('express').Router();
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

//registering user
router.post('/auth/register', async (req,res)=> {
    const {name, email, password} = req.body
    try {
        let user = await User.findOne({email});
        if(user) {
            return res.status(400).json({error: 'User already exists'})
        }
        const hashed_password = await bcrypt.hash(password, 10);
        user = new User({
            name,
            email,
            password: hashed_password
        });
        await user.save();
        return res.status(201).json({message: 'User created successfully!'})
    } catch (err) {
        console.log(err)
    }
});

//logging user in
router.post('/auth/login', async (req, res)=> {
    const {email, password} = req.body;
    try {
        //test to see if user exists
        let user= await User.findOne({email})
        if(!user) {
            return res.status(400).json({error: 'Invalid email address'});
        }
     //compare password for valid user
     const isMatch = await bcrypt.compare(password, user.password);
     if(!isMatch) {
        return res.status(400).json({error: 'Invalid password'});
    }
    const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET, {
        expiresIn: '1h'
    });
    return res.json(token);
    } catch (err) {
        console.log(err.message)
    }
});

module.exports = router;