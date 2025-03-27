const getAuthToken = () => {
  const token = localStorage.getItem("jwtToken");
  if (!token) {
    console.error("something is wrong No authentication token found");
    return null;
  }
  return token;
};

module.exports = getAuthToken
