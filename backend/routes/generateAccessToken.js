const jwt = require("jsonwebtoken")
function generateAccessToken (email) {
// return jwt.sign(email, process.env.ACCESS_TOKEN_SECRET, {expiresIn: "15m"})
return jwt.sign(email, "" + process.env.JWT_SECRET_KEY, {expiresIn: "15m"})

}
module.exports=generateAccessToken