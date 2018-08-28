const ONE_SECOND = 1000;

class AlarmClock {

    constructor(callback) {
        this.callback = callback;
    }

    setAlarm2({ hour }) {
        this.alarmHour = hour;
    }

    start() {
        const clock = setInterval(() => {
            const currentHours = new Date().getHours();
            const itsTime = (currentHours === this.alarmHour);

            if (itsTime) {
                if (typeof this.callback === 'function') {
                    this.callback();
                }

                clearInterval(clock);
            }
        }, ONE_SECOND);
    }
}

module.exports = { AlarmClock };
