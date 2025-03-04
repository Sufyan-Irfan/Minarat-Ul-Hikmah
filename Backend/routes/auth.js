const express = require('express')
const router = express.Router()
const User = require('../models/User.js')
const {body , validationResult} = require('express-validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const fetchuser = require('../middleware/fetchuser')

const JWT_SECRET = 'Minarat ul hikamah'

router.post('/createuser' , [
    body('name' , 'Enter a Valid Name').isLength({min: 3}),
    body('email' , 'Enter a Valid E-mail').isEmail(),
    body('password' , 'Password must be atleast of 5 characters').isLength({min: 5})
] , async(req , res)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }
    try {
    let user = await User.findOne({email: req.body.email})
    if(user){
        return res.status(400).json({error: "Sorry a user with this email already exists"})
    }
    const salt = await bcrypt.genSalt(10)
    const secPass = await bcrypt.hash(req.body.password , salt)
     user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
        })
        const data = {
            user:{
                id:user.id
            }
        }
    const authtoken = jwt.sign(data ,  JWT_SECRET)
    res.json({authtoken})        
    } 
    catch (error) {
        console.error("Error:", error.message);
        console.error("Stack Trace:", error.stack);  // Yeh poora error trace karega
        res.status(500).send("Some Error Occurred");
    }})


    router.post('/login' , [
        body('email' , 'Enter a Valid E-mail').isEmail(),
        body('password' , 'Password Cannot be blank').exists()
    ] , async(req , res)=>{
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()})
        }
        const {email , password} = req.body

        try {
            let user = await User.findOne({email})
            if(!user){
                return res.status(400).json({error: "Please try to login with correct credentials"})
            }

            const passwordCompare = await bcrypt.compare(password , user.password)
            if(!passwordCompare){
                return res.status(400).json({error: "Please try to login with correct credentials"})
            }

            const data = {
                user:{
                    id:user.id
                }
            }
        const authtoken = jwt.sign(data ,  JWT_SECRET)
        res.json({authtoken , username: user.name})
        } 
        catch (error) {
            console.error("Error:", error.message);
            console.error("Stack Trace:", error.stack);  // Yeh poora error trace karega
            res.status(500).send("Internal Server Error");
        }})


        router.post('/getuser' , fetchuser ,  async(req , res)=>{
        try {
            userId = req.user.id
            const user = await User.findById(userId).select("-password")
            res.send(user)
        } catch (error) {
            console.error("Error:", error.message);
            res.status(500).send("Internal Server Error");
        }})


module.exports = router