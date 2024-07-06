import React, { useState, useEffect } from "react";
import TextInput from "../../components/forms/TextInput";
import EmailInput from "../../components/forms/EmailInput";
import NumberInput from "../../components/forms/NumberInput";
import TextareaInput from "../../components/forms/TextareaInput";
import FileInput from "../../components/forms/FileInput";
import Button from "../../components/forms/Button";
import {
  configHospital,
  getConfigHospital,
  updateConfigHospital,
} from "../../utils/apis/ConfigApi";
import { Notify } from "../../utils/notifier";
import { handleValidation } from "../../utils/helpers/Validation";

export default function Settings() {

  const [settingID, setSettingID] = useState(null);
  const [hospitalName, setHospitalName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [hospitalEmail, setHospitalEmail] = useState("");
  const [hospitalPhone, setHospitalPhone] = useState("");
  const [hospitalWD, setHospitalWD] = useState("");
  const [hospitalWT, setHospitalWT] = useState("");
  const [hospitalAddress, setHospitalAddress] = useState("");
  const [hospitalLogo, setHospitalLogo] = useState("");
  const [hospitalIcon, setHospitalIcon] = useState("");
  const [hospitalStamp, setHospitalStamp] = useState("");
  const [hospitalLogoPath, setHospitalLogoPath] = useState("");
  const [hospitalIconPath, setHospitalIconPath] = useState("");
  const [hospitalStampPath, setHospitalStampPath] = useState("");
  const [hospitalDomain, setHospitalDomain] = useState("");
  const [hospitalGST, setHospitalGST] = useState("");
  const [hospitalLicense, setHospitalLicense] = useState("");
  const [hospitalFacebook, setHospitalFacebook] = useState("");
  const [hospitalInstagram, setHospitalInstagram] = useState("");
  const [hospitalYoutube, setHospitalYoutube] = useState("");
  const [hospitalAboutUs, setHospitalAboutUs] = useState("");
  const [token, setToken] = useState(localStorage.getItem("jwt"));

  const handleHospitalConfig = async () => {
    const formData = new FormData();

    const data = {
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
    };

    if(!handleValidation(data)){
      return
    }

    formData.append("HospitalData", JSON.stringify(data));
    formData.append("HospitalLogo", hospitalLogo);
    formData.append("HospitalIcon", hospitalIcon);
    formData.append("HospitalStamp", hospitalStamp);

    try {
      const response = await configHospital(formData, token);
      Notify('success','setting updated..');
      console.log(response);
    } catch (error) {
      Notify('error','failed..');
      console.error(error);
    }
  };

  const handleUpdateHospitalConfig = async () => {
    const formData = new FormData();

    const data = {
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
      hospitalStampPath,
    };

    if(!handleValidation(data)){
      return
    }

    formData.append("HospitalData", JSON.stringify(data));
    formData.append("HospitalLogo", hospitalLogo);
    formData.append("HospitalIcon", hospitalIcon);
    formData.append("HospitalStamp", hospitalStamp);

    try {
      const response = await updateConfigHospital(settingID, formData, token);
      Notify('success','setting updated..');
      console.log(response);
    } catch (error) {
      Notify('error','failed..');
      console.error(error);
    }
  };

  const loadHospitalConfig = async () => {
    try {
      const response = await getConfigHospital(token);
      setHospitalName(response[0].hospitalName);
      setCompanyName(response[0].companyName);
      setHospitalEmail(response[0].hospitalEmail);
      setHospitalPhone(response[0].hospitalPhone);
      setHospitalWD(response[0].hospitalWD);
      setHospitalWT(response[0].hospitalWT);
      setHospitalAddress(response[0].hospitalAddress);
      setHospitalDomain(response[0].hospitalDomain);
      setHospitalGST(response[0].hospitalGST);
      setHospitalLicense(response[0].hospitalLicense);
      setHospitalFacebook(response[0].hospitalFacebook);
      setHospitalInstagram(response[0].hospitalInstagram);
      setHospitalYoutube(response[0].hospitalYoutube);
      setHospitalAboutUs(response[0].hospitalAboutUs);
      setHospitalLogo(response[0].HospitalLogoPath);
      setHospitalIcon(response[0].HospitalIconPath);
      setHospitalStamp(response[0].HospitalStampPath);
      setHospitalLogoPath(response[0].HospitalLogoPath);
      setHospitalIconPath(response[0].HospitalIconPath);
      setHospitalStampPath(response[0].HospitalStampPath);
      setSettingID(response[0]._id);
      console.log(response);
      Notify('success','setting loaded..');
    } catch (error) {
      console.error(error);
      Notify('error','setting loaded failed..');
    }
  };

  useEffect(() => {
    loadHospitalConfig();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold text-start mb-6">
        Hospital Settings
      </h1>
      <form className="mt-8 grid grid-cols-6 gap-6">
        <TextInput
          value={hospitalName}
          label={"Hospital Name"}
          placeholder={"Enter Hospital Name .."}
          action={setHospitalName}
        />
        <TextInput
          value={companyName}
          label={"Company Name"}
          placeholder={"Enter Company Name .."}
          action={setCompanyName}
        />
        <EmailInput
          value={hospitalEmail}
          label={"Hospital Email Address"}
          placeholder={"Enter Hospital Email .."}
          action={setHospitalEmail}
        />
        <NumberInput
          value={hospitalPhone}
          label={"Hospital Phone Number"}
          placeholder={"Enter Hospital Phone Number .."}
          action={setHospitalPhone}
        />
        <TextInput
          value={hospitalWD}
          label={"Hospital From Day"}
          placeholder={"Monday To Friday .."}
          action={setHospitalWD}
        />
        <TextInput
          value={hospitalWT}
          label={"Hospital From Time"}
          placeholder={"9:00AM To 5:00PM .."}
          action={setHospitalWT}
        />
        <TextareaInput
          value={hospitalAddress}
          label={"Hospital Address / Location"}
          placeholder={"Enter Hospital Address / Location .."}
          action={setHospitalAddress}
        />
        <FileInput
          value={hospitalLogoPath}
          remove={setHospitalLogoPath}
          label={"Hospital Logo"}
          placeholder={"Choose Hospital Logo .."}
          action={setHospitalLogo}
        />
        <FileInput
          value={hospitalIconPath}
          remove={setHospitalIconPath}
          label={"Hospital Icon"}
          placeholder={"Choose Hospital Icon .."}
          action={setHospitalIcon}
        />
        <FileInput
          value={hospitalStampPath}
          remove={setHospitalStampPath}
          label={"Hospital Stamp"}
          placeholder={"Choose Hospital Stamp .."}
          action={setHospitalStamp}
        />
        <br className="sm:block hidden" />
        <TextInput
          value={hospitalDomain}
          label={"Hospital Domain Name"}
          placeholder={"Enter Hospital Domain Name. .."}
          action={setHospitalDomain}
        />
        <TextInput
          value={hospitalGST}
          label={"Company GST Number"}
          placeholder={"Enter Company GST No. .."}
          action={setHospitalGST}
        />
        <TextInput
          value={hospitalLicense}
          label={"Hospital License Number"}
          placeholder={"Enter Hospital License No. .."}
          action={setHospitalLicense}
        />
        <TextInput
          value={hospitalInstagram}
          label={"Instagram Link"}
          placeholder={"Enter Instagram Link .."}
          action={setHospitalInstagram}
        />
        <TextInput
          value={hospitalFacebook}
          label={"Facebook Link"}
          placeholder={"Enter Facebook Link .."}
          action={setHospitalFacebook}
        />
        <TextInput
          value={hospitalYoutube}
          label={"Youtube Link"}
          placeholder={"Enter Youtube Link .."}
          action={setHospitalYoutube}
        />
        <TextareaInput
          value={hospitalAboutUs}
          label={"Hospital Details / About Us"}
          placeholder={"Enter About Hospital Details .."}
          action={setHospitalAboutUs}
        />
        {settingID ? (
          <Button
            label={"update"}
            color={"white"}
            bgColor={"black"}
            action={handleUpdateHospitalConfig}
          />
        ) : (
          <Button
            label={"submit"}
            color={"white"}
            bgColor={"black"}
            action={handleHospitalConfig}
          />
        )}
        <Button label={"cancel"} color={"white"} bgColor={"gray-400"} />
      </form>
    </div>
  );
}
