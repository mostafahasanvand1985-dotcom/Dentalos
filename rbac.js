// نقش جاری در localStorage نگه داشته می‌شود:
export const Roles = Object.freeze({
  manager:'manager', reception:'reception', doctor:'doctor', assistant:'assistant'
});

export function currentRole(){
  return localStorage.getItem('role') || Roles.manager;
}

export function setRole(role){
  localStorage.setItem('role', role);
  document.getElementById('roleChip').textContent = role;
}

// ماسک دیدن برخی سکشن‌ها (نمونه)
export function canAccess(section){
  const role = currentRole();
  const matrix = {
    appointments: ['manager','reception','doctor','assistant'],
    patients    : ['manager','reception','doctor'],
    finance     : ['manager'],
    lab         : ['manager','reception','doctor'],
    inventory   : ['manager','assistant'],
    implant     : ['manager','doctor'],
    doctors     : ['manager'],
    settings    : ['manager']
  };
  return (matrix[section]||[]).includes(role);
}
