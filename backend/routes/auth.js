const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

router.post('/signup', async (req, res) => {
    const { fullName, email, password, role = "USER" } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const user = await prisma.user.create({
            data: {
                fullName,
                email,
                password: hashedPassword,
                role
            }
        });
        res.status(201).json({
            msg: "User created successfully",
            user
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: "Error creating user",
            error: error.message
        });
    }
});

router.post("/signin", async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await prisma.user.findUnique({
            where: { email }
        });

        if (!user) {
            return res.status(404).json({
                msg: "User does not exist"
            });
        }

        const comparePassword = await bcrypt.compare(password, user.password);

        if (!comparePassword) {
            return res.status(401).json({
                msg: "Incorrect password"
            });
        }

        const token = jwt.sign({
            id: user.id,
            role: user.role,
            email: user.email
        }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.status(200).json({
            msg: "Signed in successfully",
            token,
            user
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: "Error in sign-in",
            error: error.message
        });
    }
});

module.exports = router;
