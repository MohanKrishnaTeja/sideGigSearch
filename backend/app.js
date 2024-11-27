const express = require ("express")
const app = express();
const cors = require("cors")
require("dotenv").config()
const authRoute = require("./routes/auth")
const createProfileRoute = require("./routes/createProfile")
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()

app.use(express.json())
app.use(cors())
app.use("/",authRoute)
app.use("/api",createProfileRoute)





const port = 4000
app.listen(port,()=>{
    console.log(
        `server running at port ${port}`
    )
});