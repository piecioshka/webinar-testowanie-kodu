const ONE_SECOND = 1000;

class AlarmClock {

    constructor(callback) {
        this.callback = callback;
    }

    setAlarm({ hour }) {
        this.alarmHour = hour;
    }

    start() {
        const clock = setInterval(() => {
            const currentHours = new Date().getHours();
            const itsTime = (currentHours === this.alarmHour);

            console.log(`it's time? ${itsTime}`);

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
