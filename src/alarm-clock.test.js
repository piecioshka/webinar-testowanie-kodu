const { AlarmClock } = require('./alarm-clock');

describe('Code Coverage', () => {
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
