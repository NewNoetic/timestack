import { google } from 'googleapis';
import moment from 'moment-timezone';
import auth from '../lib/auth';

export default async (req, res) => {
    const body = req.body || {};
    const { 
        dateStart = moment().toISOString(),
        dateEnd = moment().add(14, 'd').toISOString(),
        slotDuration = '15 min'
    } = body;

    const access_token = req.headers['x-access-token']
    const refresh_token = req.headers['x-refresh-token']
    
    auth.setCredentials({ access_token, refresh_token });

    const calendar = google.calendar({ version: 'v3', auth });

    const response = await calendar.freebusy.query({ 
        requestBody: {
            items: [
                { id: 'sidhant.gandhi@gmail.com' }
            ],
            timeMin: dateStart,
            timeMax: dateEnd
        }
    })

    const freeTime = response.data.calendars;

    console.log(JSON.stringify(freeTime));

    res.status(200).json(freeTime);
};