const { google } = require("googleapis");
const { Readable } = require("stream");

const oauth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_URI
);

const getAccessTokenFromRefreshToken = async (refreshToken) => {
  oauth2Client.setCredentials({ refresh_token: refreshToken });

  const { token } = await oauth2Client.getAccessToken();
  return token;
};

const uploadToDrive = async (title, content, refreshToken) => {
  try {
    const accessToken = await getAccessTokenFromRefreshToken(refreshToken);

    oauth2Client.setCredentials({ access_token: accessToken });

    const drive = google.drive({ version: "v3", auth: oauth2Client });

    const fileMetadata = {
      name: title,
      mimeType: "application/vnd.google-apps.document",
    };

    const media = {
      mimeType: "text/html",
      body: content,
    };

    const response = await drive.files.create({
      resource: fileMetadata,
      media,
      fields: "id",
    });

    console.log("Uploaded file ID:", response.data.id);
    return response.data.id;
  } catch (error) {
    console.error("Upload to Drive failed:", error.message);
    throw error;
  }
};

const getFiles = async (refreshToken) => {
  const accessToken = await getAccessTokenFromRefreshToken(refreshToken);

  oauth2Client.setCredentials({ access_token: accessToken });

  const drive = google.drive({ version: "v3", auth: oauth2Client });

  const response = await drive.files.list({
    q: "mimeType='application/vnd.google-apps.document'",
    fields: "files(id, name)",
  });

  return response.data.files;
};

module.exports = { uploadToDrive, getFiles, getAccessTokenFromRefreshToken };
