define(function() {

    /**
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
            if (!periodString._from || !periodString._before) {
                return false;
            }

            var from = getMinutesFromHHmmTime(periodString._from);
            var before = getMinutesFromHHmmTime(periodString._before);

            if (before < from) {
                before += 24 * 60;
            }

            return from <= totalMinutes && totalMinutes < before;
        });
    }

    return getDayPeriodName;
});

