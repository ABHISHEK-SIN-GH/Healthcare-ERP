const uploadImage = async (req, res) => {
  const { patientImage } = req.files;
  const { payload } = req.body;
  const data = { patientImage, payload };
  try {
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


module.exports = { uploadImage };
