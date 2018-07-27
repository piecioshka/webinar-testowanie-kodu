const { AlarmClock } = require('./alarm-clock');

const budzik = new AlarmClock(() => {
    console.log('ciasteczko');
});
budzik.setAlarm(8);
budzik.start();
