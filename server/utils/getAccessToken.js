const { google } = require("googleapis");

const oauth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET
);

const getAccessTokenFromRefreshToken = async (refreshToken) => {
  oauth2Client.setCredentials({ refresh_token: refreshToken });

  const { token } = await oauth2Client.getAccessToken();
  return token;
};

module.exports = getAccessTokenFromRefreshToken;