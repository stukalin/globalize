define([
    "src/date/day-period"
], function(getDayPeriodName) {

    QUnit.module("Day Period");

    QUnit.test("should return correct period", function(assert) {
        var ruleSet = {
            afternoon1: {
                _before: "13:00",
                _from: "12:00"
            },
            afternoon2: {
                _before: "18:00",
                _from: "13:00"
            },
            evening1: {
                _before: "24:00",
                _from: "18:00"
            },
            morning1: {
                _before: "06:00",
                _from: "03:00"
            },
            morning2: {
                _before: "12:00",
                _from: "06:00"
            },
            night1: {
                _before: "01:00",
                _from: "00:00"
            },
            night2: {
                _before: "03:00",
                _from: "01:00"
            }
        };

        var date = new Date(2000, 0, 1, 0, 0, 0);

        assert.equal(getDayPeriodName(date, ruleSet), "night1");

        date.setHours(1);
        assert.equal(getDayPeriodName(date, ruleSet), "night2");

        date.setHours(2);
        assert.equal(getDayPeriodName(date, ruleSet), "night2");

        date.setHours(2, 59, 59);
        assert.equal(getDayPeriodName(date, ruleSet), "night2");

        date.setHours(23, 59, 59);
        assert.equal(getDayPeriodName(date, ruleSet), "evening1");
    });

    QUnit.test("should return correct period when night start before midnight", function(assert) {
        var ruleSet = {
            afternoon1: {
                _before: "18:00",
                _from: "14:00"
            },
            evening1: {
                _before: "22:00",
                _from: "18:00"
            },
            midnight: {
                _at: "00:00"
            },
            morning1: {
                _before: "11:00",
                _from: "04:00"
            },
            morning2: {
                _before: "14:00",
                _from: "11:00"
            },
            night1: {
                _before: "04:00",
                _from: "22:00"
            }
        };

        var date = new Date(2000, 0, 1, 0, 0, 0);

        assert.equal(getDayPeriodName(date, ruleSet), "night1");

        date.setHours(1);
        assert.equal(getDayPeriodName(date, ruleSet), "night1");

        date.setHours(22);
        assert.equal(getDayPeriodName(date, ruleSet), "night1");

        date.setHours(23);
        assert.equal(getDayPeriodName(date, ruleSet), "night1");

        date.setHours(21, 59, 59);
        assert.equal(getDayPeriodName(date, ruleSet), "evening1");
    });
});
