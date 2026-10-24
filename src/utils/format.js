export const formatCurrency = (value) => `KES ${Number(value || 0).toLocaleString("en-KE")}`;
export const formatRole = (role = "") => role.split("_").map((part) => part[0] + part.slice(1).toLowerCase()).join(" ");
