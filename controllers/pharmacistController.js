const pharmacists = ["pharmacist1","pharmacist2"];

const registerPharmacist = (req, res) => {  
    res.json({
        "message":`Pharmacist registered successfully!`,
        "pharmacist":req.body
    });
};

const getPharmacistById = (req, res) => {
    const {id} = req.params;
    res.json({
        "message":`Pharmacist ID:${id} details fetched!`,
        "pharmacist":pharmacists[0]
    });
};

const getAllPharmacists = (req, res) => {
    res.json({
        "message":`all pharmacists fetched!`,
        "pharmacists":pharmacists
    });
};

const updatePharmacistById = (req, res) => {
    const {id} = req.params;
    res.json({
        "message":`${id} pharmacist updated!`,
        "pharmacist":pharmacists[0]
    });
}

const deletePharmacistById = (req, res) => {
    const { id } = req.params;
    res.json({
        "message":`${id} pharmacist deleted!`,
        "pharmacist":pharmacists[0]
    });
}    

module.exports = { registerPharmacist, getPharmacistById, getAllPharmacists, updatePharmacistById, deletePharmacistById };
