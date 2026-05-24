const USER = require("../Models/User")
const { v4: uuid } = require("uuid")
const { nanoid } = require("nanoid")

const HISTORY = require("../Models/History");

//signup function for users
const handle_User_Signup = async (req, res) => {
    console.log("Got user Details")
    try {
        if (!req.body) throw (new Error("Body not Found"))
        const { user_name, email, user_post, password } = req.body
        const user_id = nanoid(8)
        if (await USER.findOne({ email })) throw (new Error("User Already Exists"))
        const newUser = await USER.create({
            user_id: user_id,
            user_name: user_name,
            email: email,
            user_post: user_post,
            password: password
        })
        if (!newUser) throw (new Error("Internal Error"))

        // Log action
        await HISTORY.create({
            user_id: newUser.user_id,
            action_title: "Account Created",
            action_description: `Welcome to EnzoSkills, ${newUser.user_name}! Your account was successfully created.`
        });

        res.json({
            msg: "User Created Successfully",
            user: newUser
        })

    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

//login function for user
const handle_User_Login = async (req, res) => {
    try {
        if (!req.body) throw (new Error("Body not Found"))

        const { user_name, user_post, password } = req.body
        const findUser = await USER.findOne({ // Fixed to findOne so we get a single object back instead of an array
            user_name: user_name,
            user_post: user_post,
            password: password
        })
        if (!findUser) throw (new Error("No Login Credentials Available"))

        // Log action
        await HISTORY.create({
            user_id: findUser.user_id,
            action_title: "Logged In",
            action_description: "Successfully logged into your account."
        });

        res.json({
            msg: "User LoggedIn Successfully",
            user: findUser
        })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

//function for updating all details of users
const handle_All_User_Details = async (req, res) => {
    try {
        if (!req.body) throw (new Error("Body not Found"))
        let { user_id, phone, skills, ...updateData } = req.body;

        if (phone) updateData.phone_num = phone;
        if (skills) {
            updateData.skills_occupied = skills.split(',').map(skill => ({ skills: skill.trim() })).filter(s => s.skills);
        }

        const updateAllDetails = await USER.findOneAndUpdate(
            { user_id: user_id },
            { $set: updateData },
            { new: true }
        )

        if (!updateAllDetails) throw (new Error("Error While Updating..."))
        res.json({
            msg: "Details Updated",
            details: updateAllDetails
        })

    } catch (error) {
        res.status(400).json({ error: error.message })
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
            { user_id: user_id },
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
const update_All_Experience = async (req, res) => {
    try {
        if (!req.body || !req.body.user_id) {
            return res.status(400).json({ msg: "User ID and experience are required" });
        }

        const { user_id, experience } = req.body;

        const update_experience = await USER.findOneAndUpdate(
            { user_id: user_id },
            { $set: { experience: experience } }, // Explicitly set the new value
            { new: true } // This returns the UPDATED document, not the old one
        );

        if (!update_experience) {
            return res.status(404).json({ msg: "User not found" });
        }

        res.json({
            msg: "User experience updated",
            details: update_experience // This will now show the NEW experience value
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

//getting a single user by user_id
const get_Single_User = async (req, res) => {
    try {
        const userId = req.params.id;
        const getUser = await USER.findOne({ user_id: userId });
        if (!getUser) throw new Error("User Not Found");
        res.json({
            msg: "User Fetched Successfully",
            user: getUser
        });
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
}

//getting all the users
const get_All_Users = async (req, res) => {
    try {
        const getUsers = await USER.find({})
        if (getUsers.length == 0) throw (new Error("No User Registered"))
        res.json({
            msg: "Users Fetched Successfully",
            allUser: getUsers
        })
    } catch (error) {
        res.end(error.message)
    }
}

//updating gamification features (badges, awards, streak)
const update_User_Gamification = async (req, res) => {
    try {
        const { user_id, badge, award, streak } = req.body;

        if (!user_id) {
            return res.status(400).json({ msg: "User ID is required" });
        }

        let updateQuery = {};
        let pushQuery = {};

        if (streak !== undefined) {
            updateQuery.streak = streak;
        }
        if (badge) {
            pushQuery.badges = badge;
        }
        if (award) {
            pushQuery.awards = award;
        }

        let updateCommand = {};
        if (Object.keys(updateQuery).length > 0) updateCommand.$set = updateQuery;
        if (Object.keys(pushQuery).length > 0) updateCommand.$push = pushQuery;

        if (Object.keys(updateCommand).length === 0) {
            return res.status(400).json({ msg: "No gamification data provided to update" });
        }

        const updatedUser = await USER.findOneAndUpdate(
            { user_id: user_id },
            updateCommand,
            { new: true, runValidators: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ msg: "User not found" });
        }

        res.json({
            msg: "User gamification updated successfully",
            gamification: {
                badges: updatedUser.badges,
                awards: updatedUser.awards,
                streak: updatedUser.streak
            }
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    handle_User_Signup,
    handle_User_Login,
    get_All_Users,
    get_Single_User,
    handle_All_User_Details,
    update_All_Skills,
    update_All_Projects,
    update_All_Experience,
    update_User_Gamification
}