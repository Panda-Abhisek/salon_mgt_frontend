// src/constants/roles.js

export const ROLES = {
  SUPER_ADMIN: 'ROLE_SUPER_ADMIN',
  SALON_OWNER: 'ROLE_SALON_ADMIN', // Backend says ADMIN, UI calls it OWNER
  STAFF: 'ROLE_STAFF',
  CUSTOMER: 'ROLE_USER',          // Backend says USER, UI calls it CUSTOMER
}

export const ROLE_LABELS = {
  [ROLES.SUPER_ADMIN]: 'Super Admin',
  [ROLES.SALON_OWNER]: 'Salon Owner',
  [ROLES.STAFF]: 'Staff',
  [ROLES.CUSTOMER]: 'Customer',
}