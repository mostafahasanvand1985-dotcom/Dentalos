export const Roles = Object.freeze({ manager:'manager', reception:'reception', doctor:'doctor', assistant:'assistant' });

export function currentRole(){ return localStorage.getItem('role') || Roles.manager; }

export function setRole(role){
  localStorage.setItem('role', role);
  const chip = document.getElementById('roleChip');
  if (chip) chip.textContent = role;
}

export function canAccess(section){
  const role = currentRole();
  const matrix = {
    events   : ['manager','reception','doctor','assistant'],
    patients : ['manager','reception','doctor'],
    finance  : ['manager'],
    lab      : ['manager','reception','doctor'],
    inventory: ['manager','assistant'],
    implant  : ['manager','doctor'],
    doctors  : ['manager'],
    settings : ['manager']
  };
  return (matrix[section]||[]).includes(role);
}
