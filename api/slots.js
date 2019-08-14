import { google } from 'googleapis';
import auth from '../lib/auth';

export default async (req, res) => {
    // const { dateMin, dateMax } = req.body;

    const access_token = req.headers['x-access-token']
    const refresh_token = req.headers['x-refresh-token']
    
    auth.setCredentials({ access_token, refresh_token });

    const calendar = google.calendar({ version: 'v3', auth });

    const response = await calendar.events.list({
        calendarId: 'primary',
        timeMin: (new Date()).toISOString(),
        maxResults: 10,
        singleEvents: true,
        showDeleted: false,
        orderBy: 'startTime',
    });

    const events = response.data.items;

    res.status(200).json(events);
};