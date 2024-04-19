const { configModel } = require("../models/configModel");

const getHospitalInfo = async (req, res) => {
  try {
    const config = await configModel.find();
    res.status(200).json(config);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

const configHospitalInfo = async (req, res) => {
  const { HospitalIcon, HospitalLogo, HospitalStamp } = req.files;
  const HospitalIconPath = HospitalIcon[0]?.originalname;
  const HospitalLogoPath = HospitalLogo[0]?.originalname;
  const HospitalStampPath = HospitalStamp[0]?.originalname;
  const {
    hospitalName,
    companyName,
    hospitalEmail,
    hospitalPhone,
    hospitalWD,
    hospitalWT,
    hospitalAddress,
    hospitalDomain,
    hospitalGST,
    hospitalLicense,
    hospitalFacebook,
    hospitalInstagram,
    hospitalYoutube,
    hospitalAboutUs,
  } = JSON.parse(req.body.HospitalData);
  const payload = {
    hospitalName,
    companyName,
    hospitalEmail,
    hospitalPhone,
    hospitalWD,
    hospitalWT,
    hospitalAddress,
    hospitalDomain,
    hospitalGST,
    hospitalLicense,
    hospitalFacebook,
    hospitalInstagram,
    hospitalYoutube,
    hospitalAboutUs,
    HospitalIconPath,
    HospitalLogoPath,
    HospitalStampPath,
  };
  try {
    const config = new configModel(payload);
    await config.save();
    res.status(201).json(config);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateHospitalInfo = async (req, res) => {
  let {
    hospitalName,
    companyName,
    hospitalEmail,
    hospitalPhone,
    hospitalWD,
    hospitalWT,
    hospitalAddress,
    hospitalDomain,
    hospitalGST,
    hospitalLicense,
    hospitalFacebook,
    hospitalInstagram,
    hospitalYoutube,
    hospitalAboutUs,
    hospitalIconPath,
    hospitalLogoPath,
    hospitalStampPath
  } = JSON.parse(req.body.HospitalData);

  const { HospitalIcon, HospitalLogo, HospitalStamp } = req.files;
  const HospitalIconPath = (HospitalIcon)?HospitalIcon[0]?.originalname:hospitalIconPath;
  const HospitalLogoPath = (HospitalLogo)?HospitalLogo[0]?.originalname:hospitalLogoPath;
  const HospitalStampPath = (HospitalStamp)?HospitalStamp[0]?.originalname:hospitalStampPath;

  const payload = {
    hospitalName,
    companyName,
    hospitalEmail,
    hospitalPhone,
    hospitalWD,
    hospitalWT,
    hospitalAddress,
    hospitalDomain,
    hospitalGST,
    hospitalLicense,
    hospitalFacebook,
    hospitalInstagram,
    hospitalYoutube,
    hospitalAboutUs,
    HospitalIconPath,
    HospitalLogoPath,
    HospitalStampPath,
  };

  try {
    const {id} = req.params;
    const config = await configModel.findByIdAndUpdate(id,payload);
    if (!config) {
      return res.status(404).json({ message: 'Config not found' });
    }
    res.status(200).json(config);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getHospitalInfo ,configHospitalInfo, updateHospitalInfo };
