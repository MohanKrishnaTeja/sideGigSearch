const jwt = require('jsonwebtoken')

async function authenticateToken(req,res,next){
    const token = req.headers["authorization"]
    if(!token){
        return res.status(401).json({
            msg : "Access denied"
        })
    }
    jwt.verify(token,process.env.JWT_SECRET , (err,user)=>{
        if(err){
            return res.status(404).json({
                msg : "invalid token"
            })
        }
        req.user = user
        next()
    })
}

module.exports = authenticateToken