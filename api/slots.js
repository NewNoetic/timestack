const { google } = require('googleapis');
const moment = require('moment-timezone');
const auth = require('../lib/auth');

const printDate = (p, m) => {
    console.log(`${m}: ${moment(p).format('LLL')}`);
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

    const timeZone = 'America/Los_Angeles';
    const dateRangeStart = moment.tz('2019-08-15T00:00:00', timeZone);
    const dateRangeEnd = moment.tz('2019-08-17T00:00:00', timeZone);
    const dailySlotStartOffsetFromStart = moment.duration(9, 'hours');
    const dailySlotEndOffsetFromStartOffset = moment.duration(8, 'hours');
    const slotDuration = moment.duration(30, 'minute');
    
    const freeSlots = [];

    let currentStart = dateRangeStart
        .clone()
        .add(dailySlotStartOffsetFromStart);
    
    while (currentStart.isBefore(dateRangeEnd)) {
        printDate(currentStart, 'current start');
        const startPlusDuration = currentStart.clone().add(slotDuration);
        printDate(startPlusDuration, 'start plus duration');
        const { busy } = freeTime['sidhant.gandhi@gmail.com'];
        // .filter((s) => moment.utc(s.start).isSame(startPlusDuration, 'day'));

        const localCurrentStart = currentStart.clone();
        let inBusySlot = false;
        busy.forEach((b) => {
            if (startPlusDuration.isBetween(moment.utc(b.start), moment.utc(b.end), null, '(]')) {
                inBusySlot = true;
            }
        });
        if (!inBusySlot) {
            freeSlots.push({ start: moment(localCurrentStart), end: moment(startPlusDuration) });
            printDate(moment(localCurrentStart), 'free slot start');
            printDate(moment(startPlusDuration), 'free slot end');
        }
        
        const todaysSlotEndTime = currentStart.clone()
            .hours(0)
            .minutes(0)
            .seconds(0)
            .add(dailySlotStartOffsetFromStart)
            .add(dailySlotEndOffsetFromStartOffset);

        printDate(todaysSlotEndTime, 'todays slot end time');

        if (startPlusDuration.isSameOrAfter(todaysSlotEndTime)) {
            currentStart
                .hours(0)
                .minutes(0)
                .seconds(0)
                .add(1, 'day')
                .add(dailySlotStartOffsetFromStart);
        } else {
            currentStart = startPlusDuration.clone();
        }
    }

    res.status(200).json(freeSlots);
};