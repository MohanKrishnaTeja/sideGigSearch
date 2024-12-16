const express = require ("express")
const app = express();
const cors = require("cors")
require("dotenv").config()
const authRoute = require("./routes/auth")
const createProfileRoute = require("./routes/createProfile")
const applyJobsRoute = require("./routes/applyjobs")
const jobsRoute = require("./routes/jobs")
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()
const path = require('path');

app.use(express.json())
app.use(cors())
app.use("/",authRoute)
app.use("/",createProfileRoute)
app.use("/",jobsRoute)
app.use("/",applyJobsRoute)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));





const port = 5000
app.listen(port,()=>{
    console.log(
        `server running at port ${port}`
    )
});