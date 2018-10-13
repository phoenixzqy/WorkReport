const Notifier = require('node-notifier');
const Cron = require('node-cron');
const UserConfig = require("./UserConfig").default;
const helpers = require("../utils/helpers").default;
var jobs = [];

export default {
    start() {
        var conf = UserConfig.getUserConfig();
        if (!conf.enable_alert || !conf.alerts.length || jobs.length) return;
        for (let i in conf.alerts) {
            jobs.push(
                Cron.schedule(
                    conf.alerts[i].frequency_rule,
                    ((message) => {
                        return function () {
                            Notifier.notify({
                                title: 'Work Report',
                                message: message,
                                icon: helpers.getIconPath(),
                                sound: true, // Only Notification Center or Windows Toasters
                                wait: true // Wait with callback, until user action is taken against notification
                            });
                        }
                    })(conf.alerts[i].alert_message)
                )
            );
        }
    },
    stop() {
        for (let i in jobs) {
            jobs[i].destroy();
        }
        jobs = [];
    },
    restart() {
        this.stop();
        this.start();
    }
}