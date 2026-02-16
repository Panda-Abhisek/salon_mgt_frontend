export const hasRole = (user, role) => {
  if (!user || !user.roles) return false;
  return user.roles.includes(role);
};

export const hasAnyRole = (user, roles = []) => {
  if (!user || !user.roles) return false;
  return roles.some(r => user.roles.includes(r));
};
