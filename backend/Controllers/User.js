const USER = require("../Models/User")
const {v4:uuid} = require("uuid")
const {nanoid} = require("nanoid")

//signup function for users
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

//function for updating all details of users
const handle_All_User_Details = async ( req, res ) => {
    try {
        if( !req.body ) throw(new Error("Body not Found"))
        const { user_id, ...updateData } = req.body
        
        const updateAllDetails = await USER.findOneAndUpdate(
            { user_id : user_id },
            { $set : updateData },
            { new : true }
        )

        if( !updateAllDetails ) throw( new Error("Error While Updating...") )
        res.json({
            msg : "Details Updated",
            details : updateAllDetails        
        })

    } catch (error) {
        res.end(error.message)
    }
}

//login function for user
const handle_User_Login = async ( req, res ) => {
    try {
        if( !req.body ) throw(new Error("Body not Found"))
        
        const { user_name, user_post, password  } = req.body
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

//getting all the users
const get_All_Users = async ( req, res ) => {
    try {
        const getUsers = await USER.find( {} )
        if( getUsers.length == 0 ) throw( new Error("No User Registered") )
        res.json({
            msg : "Users Fetched Successfully",
            allUser : getUsers
        })
    } catch (error) {
        res.end(error.message)
    }
}

//updating skills for future
const update_All_Skills = async (req, res) => {
    try {
        if (!req.body || !req.body.user_id || !req.body.new_skills) {
            return res.status(400).json({ msg: "User ID and new_skills are required" });
        }
        
        const { user_id, new_skills } = req.body; 
        
        const formattedSkills = new_skills.map(skill => ({ skills: skill }));

        const updateSkills = await USER.findOneAndUpdate(
            { user_id : user_id },
            { 
                $push: { 
                    skills_occupied: { $each: formattedSkills } 
                } 
            },
            { new: true, runValidators: true }
        );
        
        if (!updateSkills) {
            return res.status(404).json({ msg: "User not found" });
        }

        res.json({
            msg: "Skills Added Successfully",
            details: updateSkills.skills_occupied     
        });
        
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

//updating projects for future
const update_All_Projects = async (req, res) => {
    try {
        const { user_id, project_name, description, project_tech, project_repo, deployed_link } = req.body;
        
        if (!user_id || !project_name) {
            return res.status(400).json({ msg: "User ID and Project Name are required" });
        }

        const updatedUser = await USER.findOneAndUpdate(
            { user_id: user_id },
            { 
                $push: { 
                    projects: { 
                        project_name, 
                        description, 
                        project_tech, 
                        project_repo, 
                        deployed_link 
                    } 
                } 
            },
            { new: true, runValidators: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ msg: "User not found" });
        }

        res.json({
            msg: "New project added successfully",
            projects: updatedUser.projects 
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

//updating experience for future
const update_All_Experience = async ( req, res ) => {
    try {
        if (!req.body || !req.body.user_id) {
            return res.status(400).json({ msg: "User ID and experience are required" });
        }

        const { user_id, experience } = req.body;

        const update_experience = await USER.findOneAndUpdate(
            { user_id : user_id },
            { $set: { experience: experience } }, // Explicitly set the new value
            { new: true } // This returns the UPDATED document, not the old one
        );

        if (!update_experience) {
            return res.status(404).json({ msg: "User not found" });
        }

        res.json({
            msg : "User experience updated",
            details : update_experience // This will now show the NEW experience value
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    handle_User_Signup,
    handle_User_Login,
    get_All_Users,
    handle_All_User_Details,
    update_All_Skills,
    update_All_Projects,
    update_All_Experience
}