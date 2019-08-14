import { google } from 'googleapis';

const redirectUris = [
    "urn:ietf:wg:oauth:2.0:oob",
    "http://localhost:3000/postAuthentication"
];
const oAuth2Client = new google.auth.OAuth2(process.env.client_id, process.env.client_secret, redirectUris[1]);

export default oAuth2Client;