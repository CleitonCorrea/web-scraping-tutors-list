var Cron = {
    jobs: [],
    process: function process() {
        var now = new Date();
        for (var i = 0; i < Cron.jobs.length; i++) {
            if (
                Cron.jobs[i].minute == "*" ||
                parseInt(Cron.jobs[i].minute) == now.getMinutes()
            )
                if (
                    Cron.jobs[i].hour == "*" ||
                    parseInt(Cron.jobs[i].hour) == now.getHours()
                )
                    if (
                        Cron.jobs[i].date == "*" ||
                        parseInt(Cron.jobs[i].date) == now.getDate()
                    )
                        if (
                            Cron.jobs[i].month == "*" ||
                            parseInt(Cron.jobs[i].month) - 1 == now.getMonth()
                        )
                            if (
                                Cron.jobs[i].day == "*" ||
                                parseInt(Cron.jobs[i].day) == now.getDay()
                            )
                                Cron.jobs[i].run();
        }
        now = null;
        return process;
    },
    id: 0,
    start: function() {
        Cron.stop();
        Cron.id = setInterval(Cron.process(), 60000);
    },
    stop: function() {
        clearInterval(Cron.id);
    },
    Job: function(cronstring, fun) {
        var _Job = this;
        var items = cronstring.match(
            /^([0-9]+|\*{1})[ \n\t\b]+([0-9]+|\*{1})[ \n\t\b]+([0-9]+|\*{1})[ \n\t\b]+([0-9]+|\*{1})[ \n\t\b]+([0-9]+|\*{1})[ \n\t\b]*$/
        );
        _Job.minute = items[1];
        _Job.hour = items[2];
        _Job.date = items[3];
        _Job.month = items[4];
        _Job.day = items[5];
        _Job.run = fun;
        Cron.jobs.push(_Job);
        _Job = null;
        items = null;
    },
};

module.exports = Cron;