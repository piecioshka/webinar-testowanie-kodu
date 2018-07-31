const { AlarmClock } = require('./alarm-clock');
const assert = require('assert');
const sinon = require('sinon');

describe('General', () => {
    it('should be defined', () => {
        assert(typeof AlarmClock === 'function');
    });

    describe('constructor', () => {
        it('should be a constructor', () => {
            try {
                new AlarmClock();
                assert(true);
            } catch (err) {
                assert(false, 'AlarmClock is not a constructor');
            }
        });

        it('should store callback', () => {
            const f = () => null;
            const c = new AlarmClock(f);
            assert(c.callback === f);
        });
    });

    describe('setAlarm', () => {
        it('should contains method "setAlarm"', () => {
            const c = new AlarmClock();
            assert(typeof c.setAlarm === 'function');
        });

        it('should store hour', () => {
            const c = new AlarmClock();
            c.setAlarm({ hour: 4 });
            assert(c.alarmHour === 4);
        });
    });

    describe('start', () => {
        it('should contains method "start"', () => {
            const c = new AlarmClock();
            assert(typeof c.start === 'function');
        });

        it('should calls setInterval', (done) => {
            const cacheSetInterval = global.setInterval;
            global.setInterval = () => {
                assert(true);
                global.setInterval = cacheSetInterval;
                done();
            };
            const c = new AlarmClock();
            c.start();
        });

        it('should calls callback when time is on', (done) => {
            sinon.stub(Date.prototype, 'getHours').callsFake(() => 8);

            const c = new AlarmClock(() => {
                console.log('ciasteczko');
                assert(true);
                // Teardown
                assert(Date.prototype.getHours.called);
                Date.prototype.getHours.restore();
                done();
            });
            c.setAlarm({ hour: 8 });
            c.start();
        });
    });
});

xdescribe('Code Coverage', () => {
    it('should calls each of method to make 100% CC', () => {
        global.Date.prototype.getHours = () => undefined;
        const instance = new AlarmClock(() => undefined);
        const methodNames = Object.getOwnPropertyNames(AlarmClock.prototype);
        methodNames.forEach((name) => {
            try {
                // Funkcję typu constructor musimy uruchomić
                // operatorem `new`
                if (name === 'constructor') {
                    return;
                }

                // Uruchomienie każdej metody pojedynczo
                instance[name]();
            } catch (err) {
                console.log(err);
            }
        });
    });
});
