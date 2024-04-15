const users = ["user1","user2"];

const registerUser = (req, res) => {  
    res.json({
        "message":`User registered successfully!`,
        "user":req.body
    });
};

const getUserById = (req, res) => {
    const {id} = req.params;
    res.json({
        "message":`User ID:${id} details fetched!`,
        "user":users[0]
    });
};

const getAllUsers = (req, res) => {
    res.json({
        "message":`all users fetched!`,
        "users":users
    });
};

const updateUserById = (req, res) => {
    const {id} = req.params;
    res.json({
        "message":`${id} user updated!`,
        "user":users[0]
    });
}

const deleteUserById = (req, res) => {
    const { id } = req.params;
    res.json({
        "message":`${id} user deleted!`,
        "user":users[0]
    });
}    

module.exports = { registerUser, getUserById, getAllUsers, updateUserById, deleteUserById };
