const { google } = require('googleapis');
const moment = require('moment-timezone');
const auth = require('../lib/auth');

const print = (p, m) => {
    // eslint-disable-next-line no-useless-concat
    console.log(`${m ? `${m}: ` : ''}${JSON.stringify(p)}`);
};

module.exports = async (req, res) => {
    const body = req.body || {};
    const { 
        dateStart = moment().toISOString(),
        dateEnd = moment().add(14, 'd').
            toISOString(),
        // slotDuration = '15 min'
    } = body;

    const access_token = req.headers['x-access-token'];
    const refresh_token = req.headers['x-refresh-token'];
    
    auth.setCredentials({ access_token, refresh_token });

    const calendar = google.calendar({ version: 'v3', auth });

    const response = await calendar.freebusy.query({ 
        requestBody: {
            items: [{ id: 'sidhant.gandhi@gmail.com' }],
            timeMin: dateStart,
            timeMax: dateEnd
        }
    });

    const freeTime = response.data.calendars;

    /*
     * daily slot start time UTC
     * daily slot end time UTC
     * slot duration
     */

    /*
     * start from daily slot start time
     * add slot duration
     * if it hits a busy slot, increment to end of busy slot time, start again
     * else record free slot (from start to start+slot duration)
     */

    const dateRangeStart = moment.utc('2019-08-14T00:00:00Z');
    const dateRangeEnd = moment.utc('2019-08-18T00:00:00Z');
    const dailySlotStartTime = moment.utc('01:00:00', 'HH:mm:ss');
    const dailySlotEndTime = moment.utc('10:00:00', 'HH:mm:ss');
    const slotDuration = moment.duration(15, 'minute');
    
    const freeSlots = [];

    let currentStart = dateRangeStart.clone().set({
        'hour': dailySlotStartTime.hour(),
        'minute': dailySlotStartTime.minute(),
        'second': dailySlotStartTime.second(),
    });
    
    while (currentStart.isBefore(dateRangeEnd)) {
        print(currentStart, 'current start');
        const startPlusDuration = currentStart.clone().add(slotDuration);
        print(startPlusDuration, 'start plus duration');
        const busyThatDay = freeTime['sidhant.gandhi@gmail.com'].busy.
            filter((s) => moment.utc(s.start).isSame(startPlusDuration, 'day'));

        const localCurrentStart = currentStart.clone();
        busyThatDay.forEach((b) => {
            if (!startPlusDuration.isBetween(b.start, b.end)) {
                freeSlots.push({ start: moment(localCurrentStart), end: moment(startPlusDuration) });
            }
        });

        currentStart = startPlusDuration.clone();
    }

    res.status(200).json(freeSlots);
};