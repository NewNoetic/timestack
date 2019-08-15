const authClient = require('../lib/auth');

const scopes = ['https://www.googleapis.com/auth/calendar.readonly'];

export default (req, res) => {
    const authUrl = authClient.generateAuthUrl({
        // access_type: 'offline',
        scope: scopes,
    });
    res.send(authUrl);
};