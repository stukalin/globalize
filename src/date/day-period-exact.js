define(function() {

    /**
     * Takes a date and a day period rule set and calculates the name of the day period by the time of the day which is
     * exactly specified in the ruleset.
     *
     * @param {Date} date
     * @param {*} dayPeriodRuleSet
     */
    function getDayPeriodName(date, dayPeriodRuleSet) {

        function getMinutesFromHHmmTime(time) {
            var timeArr = time.split(":").map(function(e) {
                return parseInt(e, 10);
            });

            return timeArr[ 0 ] * 60 + timeArr[ 1 ];
        }

        var totalMinutes = date.getHours() * 60 + date.getMinutes();

        return Object.keys(dayPeriodRuleSet).find(function(key) {
            var periodString = dayPeriodRuleSet[ key ];

            // we're interested in rules which have the "_at" key
            if (!periodString._at) {
                return false;
            }

            var ruleMinutes = getMinutesFromHHmmTime(periodString._at);
            return ruleMinutes === totalMinutes;
        });
    }

    return getDayPeriodName;
});

