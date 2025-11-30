export const logoutStaff = () => {
  localStorage.removeItem("staffToken");
  localStorage.removeItem("staffRole");
  localStorage.removeItem("staffId");
  window.location.href = "/staff/login";
};
