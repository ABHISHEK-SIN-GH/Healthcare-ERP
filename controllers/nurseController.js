const nurses = ["nurse1","nurse2"];

const registerNurse = (req, res) => {  
    res.json({
        "message":`Nurse registered successfully!`,
        "nurse":req.body
    });
};

const getNurseById = (req, res) => {
    const {id} = req.params;
    res.json({
        "message":`Nurse ID:${id} details fetched!`,
        "nurse":nurses[0]
    });
};

const getAllNurses = (req, res) => {
    res.json({
        "message":`all nurses fetched!`,
        "nurses":nurses
    });
};

const updateNurseById = (req, res) => {
    const {id} = req.params;
    res.json({
        "message":`${id} nurse updated!`,
        "nurse":nurses[0]
    });
}

const deleteNurseById = (req, res) => {
    const { id } = req.params;
    res.json({
        "message":`${id} nurse deleted!`,
        "nurse":nurses[0]
    });
}    

module.exports = { registerNurse, getNurseById, getAllNurses, updateNurseById, deleteNurseById };
