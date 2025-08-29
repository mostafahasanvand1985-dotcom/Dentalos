const roles = {
  manager: { patients:true, finance:true, lab:true, inventory:true, implants:true, doctors:true },
  reception: { patients:true, appointments:true },
  doctor: { patients:true, implants:true, finance:false },
  assistant: { lab:true, inventory:true }
};

let currentRole = "manager";

function can(role, section) {
  return roles[role]?.[section] === true;
}