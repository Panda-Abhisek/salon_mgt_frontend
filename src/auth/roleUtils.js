export const getPrimaryRole = (hasRole) => {
  if (hasRole("ROLE_SALON_ADMIN")) return "ADMIN";
  if (hasRole("ROLE_STAFF")) return "STAFF";
  if (hasRole("ROLE_USER")) return "USER";
  return "GUEST";
};
