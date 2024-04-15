const admins = ["admin1","admin2"];

const registerAdmin = (req, res) => {  
    res.json({
        "message":`Admin registered successfully!`,
        "admin":req.body
    });
};

const getAdminById = (req, res) => {
    const {id} = req.params;
    res.json({
        "message":`Admin ID:${id} details fetched!`,
        "admin":admins[0]
    });
};

const getAllAdmins = (req, res) => {
    res.json({
        "message":`all admins fetched!`,
        "admins":admins
    });
};

const updateAdminById = (req, res) => {
    const {id} = req.params;
    res.json({
        "message":`${id} admin updated!`,
        "admin":admins[0]
    });
}

const deleteAdminById = (req, res) => {
    const { id } = req.params;
    res.json({
        "message":`${id} admin deleted!`,
        "admin":admins[0]
    });
}    

module.exports = { registerAdmin, getAdminById, getAllAdmins, updateAdminById, deleteAdminById };
