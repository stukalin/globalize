define(function() {

    /**
     * Takes a date and a day period rule set and calculates the name of the day period by the time of the day which
     * falls at one or another time range.
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
            // there are day periods at a strict time which are noted by the "_at: key; these do not have
            // "_from" or "_before"
            if (!periodString._from || !periodString._before) {
                return false;
            }

            var from = getMinutesFromHHmmTime(periodString._from);
            var before = getMinutesFromHHmmTime(periodString._before);

            if (before < from) {
                // this is the case we spill over midnight, e.g.
                // night1: { _before: "04:00", _from: "22:00" }
                // let's check 2 intervals: [from, 24:00) and [00:00, before)
                return from <= totalMinutes && totalMinutes < 24 * 60 ||
                    0 <= totalMinutes && totalMinutes < before;
            } else {
                return from <= totalMinutes && totalMinutes < before;
            }
        });
    }

    return getDayPeriodName;
});
