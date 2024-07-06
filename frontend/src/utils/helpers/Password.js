export const generatePassword = (dob) => {
    let passDate = new Date(dob);
    let dd = passDate.getDate();
    let mm = passDate.getMonth() + 1;
    let yyyy = passDate.getFullYear();
    if (dd < 10) {
        dd = "0" + dd;
    }
    if (mm < 10) {
        mm = "0" + mm;
    }
    return dd.toString() + mm.toString() + yyyy.toString();
}
