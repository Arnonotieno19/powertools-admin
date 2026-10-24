import { ROLE_PERMISSIONS } from "@/config/roles";

const staff = {
  "owner@toolmart.test": { id: 1, firstName: "Arnon", lastName: "Otieno", role: "OWNER" },
  "admin@toolmart.test": { id: 2, firstName: "Faith", lastName: "Wambui", role: "ADMIN" },
  "inventory@toolmart.test": { id: 3, firstName: "David", lastName: "Ouma", role: "INVENTORY_STAFF" },
  "orders@toolmart.test": { id: 4, firstName: "Mercy", lastName: "Njeri", role: "ORDER_STAFF" },
};

export const mockCredentials = Object.keys(staff).map((identifier) => ({ identifier, password: "Password123!", role: staff[identifier].role }));

export async function mockLogin(identifier, password) {
  await new Promise((resolve) => setTimeout(resolve, 450));
  const key = identifier.trim().toLowerCase();
  const record = staff[key];
  if (!record || password !== "Password123!") throw new Error("Invalid email/phone or password.");
  return {
    accessToken: `mock-${record.role.toLowerCase()}-token`,
    user: { ...record, email: key, permissions: ROLE_PERMISSIONS[record.role] },
  };
}
