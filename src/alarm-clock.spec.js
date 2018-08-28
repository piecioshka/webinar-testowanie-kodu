const { AlarmClock } = require('./alarm-clock');
// const sinon = require('sinon');

let root = null;

if (typeof global !== 'undefined') {
    root = global;
} else {
    root = window;
}

describe('General', () => {
    it('should be defined', () => {
        expect(typeof AlarmClock).toBe('function');
    });

    describe('constructor', () => {
        it('should be a constructor', () => {
            try {
                new AlarmClock();
                expect(true).toBeTruthy();
            } catch (err) {
                throw 'AlarmClock is not a constructor';
            }
        });

        it('should store callback', () => {
            const f = () => null;
            const c = new AlarmClock(f);
            expect(c.callback).toBe(f);
        });
    });

    describe('setAlarm', () => {
        it('should contains method "setAlarm"', () => {
            const c = new AlarmClock();
            expect(typeof c.setAlarm).toBe('function');
        });

        it('should store hour', () => {
            const c = new AlarmClock();
            c.setAlarm({ hour: 4 });
            expect(c.alarmHour).toBe(4);
        });
    });

    describe('start', () => {
        it('should contains method "start"', () => {
            const c = new AlarmClock();
            expect(typeof c.start).toBe('function');
        });

        it('should calls setInterval', (done) => {
            const cacheSetInterval = root.setInterval;
            root.setInterval = () => {
                expect(true).toBeTruthy();
                root.setInterval = cacheSetInterval;
                done();
            };
            const c = new AlarmClock();
            c.start();
        });

        xit('should calls callback when time is on', (done) => {
            // sinon.stub(Date.prototype, 'getHours').callsFake(() => 8);

            const c = new AlarmClock(() => {
                console.log('ciasteczko');
                expect(true).toBeTruthy();
                // Teardown
                expect(Date.prototype.getHours.called);
                Date.prototype.getHours.restore();
                done();
            });
            c.setAlarm({ hour: 8 });
            c.start();
        });
    });
});
