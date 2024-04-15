const configHospitalInfo = (req, res) => {
  const { HospitalIcon, HospitalLogo, HospitalStamp } = req.files;
  const uploadedFiles = {
    hospitalIcon: {
      filename: HospitalIcon[0]?.originalname,
      path: HospitalIcon[0]?.path,
    },
    hospitalLogo: {
      filename: HospitalLogo[0]?.originalname,
      path: HospitalLogo[0]?.path,
    },
    hospitalStamp: {
      filename: HospitalStamp[0]?.originalname,
      path: HospitalStamp[0]?.path,
    },
  };
  console.log(req.body);
  console.log(req.files);
  res.status(200).json({ uploadedFiles });
};

module.exports = { configHospitalInfo };
