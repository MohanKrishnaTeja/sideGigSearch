const express = require("express")
const router = express.Router()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { prismaClient } = require('@prisma/client')
const prisma = new prismaClient()

router.post('/signup',async(req,res)=>{
    const{ fullname , email , password , role = "USER"} = req.body
    const hashedPassword = await bcrypt.hash(password,10)
    try{
        const response = await prisma.user.create({
            data : {
                fullname,
                email,
                password : hashedPassword,
                role
            }
        })
        res.json({
            msg : "user created successfully",
            response
        })
    }catch(error){
        console.log(error)
        res.status(500).json({
            msg : "error creating user",
            error
        })
    }
})


router.post("/signin",async(req,res)=>{
    const {email, password} = req.body
    try{
        const response = await prisma.user.findUnique({
            where : {
                email
            }
        })
        if(!response){
            return res.json({
                 msg : "user doesnot exit"
             })
        }
        const comparePassword = await bcrypt.compare(password,response.password)
        if(!comparePassword){
            return res.json({
                msg : "entered incorrect password"
            })
        }
        const token = jwt.sign({
            id : response.id,
            role : response.role,
            email : response.email
        },process.env.JWT_SECRET,{expiresIn : "1hr"})
        res.status(200).json({
            msg : "signed in successfully",
            token
        })
    }catch(error){
        console.log(error)
        res.status(500).json({
            msg : "error in signin",
            error
        })
    }
})

module.exports = router