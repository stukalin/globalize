define([
    "src/date/day-period-exact"
], function(getDayPeriodName) {

    QUnit.module("Day Period (exact match)");

    QUnit.test("should return correct period", function(assert) {
        var ruleSet = {
            "midnight": {
                "_at": "00:00"
            },
            "some-weird-one": {
                "_at": "19:30"
            },
            "noon": {
                "_at": "12:00"
            }
        };

        var date = new Date(2000, 0, 1, 0, 0, 0);

        assert.equal(getDayPeriodName(date, ruleSet), "midnight");

        date.setHours(1);
        assert.strictEqual(getDayPeriodName(date, ruleSet), undefined);

        date.setHours(19, 30, 59);
        assert.equal(getDayPeriodName(date, ruleSet), "some-weird-one");

        date.setHours(12, 00, 59);
        assert.equal(getDayPeriodName(date, ruleSet), "noon");
    });
});
