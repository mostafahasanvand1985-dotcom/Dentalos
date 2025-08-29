// RBAC پایه
const RBAC = {
  role: localStorage.getItem('role') || 'manager', // manager | reception | doctor | assistant
  can(route){
    const map = {
      manager  : ['*'],
      reception: ['appointments','patients','update'],
      doctor   : ['patients','appointments','implant','finance'],
      assistant: ['appointments','patients']
    };
    const allow = map[this.role] || [];
    return allow.includes('*') || allow.includes(route);
  }
};
