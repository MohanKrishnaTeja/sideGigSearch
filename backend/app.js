const express = require ("express")
const app = express();
const cors = require("cors")
require("dotenv").config()
app.use(express.json())
app.use(cors)





const port = 3000
app.listen(port,()=>{
    console.log(
        `server running at port ${port}`
    )
});