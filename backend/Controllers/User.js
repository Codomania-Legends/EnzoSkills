const USER = require("../Models/User")
const {v4:uuid} = require("uuid")
const {nanoid} = require("nanoid")

const handle_User_Signup = async ( req, res ) => {
    try {
        if( !req.body ) throw(new Error("Body not Found"))
        const { user_name, email, user_post, password  } = req.body
        const user_id = nanoid(8)
        if( await USER.findOne({email}) ) throw( new Error("User Already Exists") )
        const newUser = await USER.create({
            user_id : user_id,
            user_name : user_name,
            email : email,
            user_post : user_post,
            password : password
        }) 
        if( !newUser ) throw( new Error("Internal Error") )
        res.json({
            msg : "User Created Successfully",
            user : newUser
        })
    
} catch (error) {
    res.end(error.message)
}
}

const handle_User_Login = async ( req, res ) => {
    try {
        if( !req.body ) throw(new Error("Body not Found"))
        
        const { user_name, email, user_post, password  } = req.body
        const findUser = await USER.find({
            user_name : user_name,
            user_post : user_post,
            password : password
        }) 
        if( !findUser ) throw( new Error("No Login Credentials Available") )
        res.json({
            msg : "User LoggedIn Successfully",
            user : findUser
        })
    } catch (error) {
        res.end(error.message)
    }
}

module.exports = {
    handle_User_Signup,
    handle_User_Login
}