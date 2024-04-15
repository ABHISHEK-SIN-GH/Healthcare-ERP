const patients = ["patient1","patient2"];

const registerPatient = (req, res) => {  
    res.json({
        "message":`Patient registered successfully!`,
        "patient":req.body
    });
};

const getPatientById = (req, res) => {
    const {id} = req.params;
    res.json({
        "message":`Patient ID:${id} details fetched!`,
        "patient":patients[0]
    });
};

const getAllPatients = (req, res) => {
    res.json({
        "message":`all patients fetched!`,
        "patients":patients
    });
};

const updatePatientById = (req, res) => {
    const {id} = req.params;
    res.json({
        "message":`${id} patient updated!`,
        "patient":patients[0]
    });
}

const deletePatientById = (req, res) => {
    const { id } = req.params;
    res.json({
        "message":`${id} patient deleted!`,
        "patient":patients[0]
    });
}    

module.exports = { registerPatient, getPatientById, getAllPatients, updatePatientById, deletePatientById };
