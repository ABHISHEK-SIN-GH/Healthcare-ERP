const frontdesks = ["frontdesk1","frontdesk2"];

const registerFrontdesk = (req, res) => {  
    res.json({
        "message":`Frontdesk registered successfully!`,
        "frontdesk":req.body
    });
};

const getFrontdeskById = (req, res) => {
    const {id} = req.params;
    res.json({
        "message":`Frontdesk ID:${id} details fetched!`,
        "frontdesk":frontdesks[0]
    });
};

const getAllFrontdesks = (req, res) => {
    res.json({
        "message":`all frontdesks fetched!`,
        "frontdesks":frontdesks
    });
};

const updateFrontdeskById = (req, res) => {
    const {id} = req.params;
    res.json({
        "message":`${id} frontdesk updated!`,
        "frontdesk":frontdesks[0]
    });
}

const deleteFrontdeskById = (req, res) => {
    const { id } = req.params;
    res.json({
        "message":`${id} frontdesk deleted!`,
        "frontdesk":frontdesks[0]
    });
}    

module.exports = { registerFrontdesk, getFrontdeskById, getAllFrontdesks, updateFrontdeskById, deleteFrontdeskById };
