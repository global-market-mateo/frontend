// Helper for API calls
export const getBearerToken = () => {
  const token = localStorage.getItem("token");
  return `Bearer ${token}`;
};
