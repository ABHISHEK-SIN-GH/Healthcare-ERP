const doctors = ["doctor1","doctor2"];

const registerDoctor = (req, res) => {  
    res.json({
        "message":`Doctor registered successfully!`,
        "doctor":req.body
    });
};

const getDoctorById = (req, res) => {
    const {id} = req.params;
    res.json({
        "message":`Doctor ID:${id} details fetched!`,
        "doctor":doctors[0]
    });
};

const getAllDoctors = (req, res) => {
    res.json({
        "message":`all doctors fetched!`,
        "doctors":doctors
    });
};

const updateDoctorById = (req, res) => {
    const {id} = req.params;
    res.json({
        "message":`${id} doctor updated!`,
        "doctor":doctors[0]
    });
}

const deleteDoctorById = (req, res) => {
    const { id } = req.params;
    res.json({
        "message":`${id} doctor deleted!`,
        "doctor":doctors[0]
    });
}    

module.exports = { registerDoctor, getDoctorById, getAllDoctors, updateDoctorById, deleteDoctorById };
