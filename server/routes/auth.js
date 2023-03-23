const express = require('express');
const router = express.Router();
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator')
const fetchUser = require('../middleware/fetchUser');
const User = require('../models/User');

dotenv.config()

// ? Route to sign up i.e. create an account
router.post("/register", [
    body('firstName', 'Enter a valid first name').exists(),
    body('lastName', 'Enter a valid last name').exists(),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be atleast 5 characters').isLength({ min: 5 }),
], async (req, res) => {

    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success:success,errors: errors.array() });
    }
    const {firstName, lastName, email, password} = req.body;

    try {
        let user = await User.findOne({email: email})
        if(user){
            return res.status(400).json({ success:success,error:"User already exists",msg:"User already exists"});
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password,salt);

        user = await User.create({
            firstName,
            lastName,
            email,
            password: hashedPassword
        });

        const data = {
            user: {
                id: user.id
            }
        };

        const authToken = jwt.sign(data, process.env.JWT_SECRET_KEY);
        success = true
        res.json({ success:success,authToken:authToken});
        
        

    }
    catch(error){
        res.status(500).json({ success:success,error:"Internal Server Error",msg:error.message});
    }

})

// ? Route to login 
router.post("/login", [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password cannot be blank').exists(),
], async (req, res) => {


    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success:success,errors: errors.array() });
    }

    const {email, password} = req.body;
    try {

        const user = await User.findOne({email})
        if(!user){
            return res.status(400).json({ success:success,error:"Invalid Credentials",msg:"Invalid Credentials"});
        }

        const passwordCompare = await bcrypt.compare(password, user.password);
        if(!passwordCompare){
            return res.status(400).json({ success:success,error:"Invalid Credentials",msg:"Invalid Credentials"});
        }

        const data = {
            user: {
                id: user.id
            }
        };

        const authToken = jwt.sign(data, process.env.JWT_SECRET_KEY);
        success = true
        res.json({ success:success,authToken:authToken});

    }
    catch(error){
        res.status(500).json({ success:success,error:"Internal Server Error",msg:error.message});
    }
})

// ? Route to details of logged in user

router.get("/getuser", fetchUser, async (req, res) => {

    let success = false;
    
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select('-password');
        success = true
        res.send({ success:success,User:user});

    }
    catch(err){
        res.status(500).json({ success:success,error:"Internal Server Error",msg:err.message});
    }
})

// ? Route to delete account
router.delete("/deleteAccount/",fetchUser,async(req, res) => {

    let success = false;
    try {
        // TODO: Delete notes of the deleted user
        const userId = req.user.id;
        const user = await User.findById(userId);
        if(!user){
            return res.status(400).json({ success:success,error:"User not found",msg:"User not found"});
        }

        await User.findByIdAndDelete(userId);
        success = true
        res.json({ success:success,msg:"User deleted successfully"});
        
    }
    catch(err){
        res.status(500).json({ success:success,error:"Internal Server Error",msg:err.message});
    }
})

module.exports = router;