const registrationPermission = {
    view:["admin","frontdesk"]
}
const opdPermission = {
    add:["admin","frontdesk"],
    view:["admin","doctor","nurse","pharmacist","frontdesk"],
    edit:["admin","frontdesk"],
    delete:["admin"]
}
const ipdPermission = {
    add:["admin","frontdesk"],
    view:["admin","doctor","nurse","pharmacist","frontdesk"],
    edit:["admin","frontdesk"],
    delete:["admin"]
}
const patientsPermission = {
    add:["admin","frontdesk"],
    view:["admin","doctor","nurse","pharmacist","frontdesk"],
    edit:["admin","frontdesk"],
    delete:["admin"]
}
const patientDetailsPermission = {
    add:["admin","doctor","nurse"],
    view:["admin","doctor","nurse","pharmacist"],
    edit:["admin","doctor","nurse"],
    delete:["admin"]
}
const doctorsPermission = {
    add:["admin"],
    view:["admin"],
    edit:["admin"],
    delete:["admin"]
}
const nursesPermission = {
    add:["admin"],
    view:["admin"],
    edit:["admin"],
    delete:["admin"]
}
const pharmacistsPermission = {
    add:["admin"],
    view:["admin"],
    edit:["admin"],
    delete:["admin"]
}
const medicinesPermission = {
    add:["admin","pharmacist"],
    view:["admin","doctor","nurse","pharmacist","frontdesk"],
    edit:["admin","pharmacist"],
    delete:["admin"]
}
const frontdesksPermission = {
    add:["admin"],
    view:["admin"],
    edit:["admin"],
    delete:["admin"]
}
const adminsPermission = {
    add:["admin"],
    view:["admin"],
    edit:["admin"],
    delete:["admin"]
}
const usersPermission = {
    add:["admin"],
    view:["admin"],
    edit:["admin"],
    delete:["admin"]
}
const configPermission = {
    add:["admin"],
    view:["admin"],
    edit:["admin"],
    delete:["admin"]
}
export default Permissions = {
    registrationPermission,
    opdPermission,
    ipdPermission,
    patientsPermission,
    patientDetailsPermission,
    doctorsPermission,
    nursesPermission,
    pharmacistsPermission,
    medicinesPermission,
    frontdesksPermission,
    adminsPermission,
    usersPermission,
    configPermission,
}