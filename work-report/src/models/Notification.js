const Notifier = require('node-notifier');
const Cron = require('node-cron');
const UserConfig = require("./UserConfig").default;
const helpers = require("../utils/helpers").default;
var jobs = [];

export default {
    start(mainWindow) {
        var conf = UserConfig.getUserConfig();
        if (!conf.enable_alert || !conf.alerts.length || jobs.length) return;
        for (let i in conf.alerts) {
            jobs.push(
                Cron.schedule(
                    conf.alerts[i].frequency_rule,
                    ((currentAlert) => {
                        return function () {
                            Notifier.notify({
                                title: 'Work Report',
                                message: currentAlert.message,
                                icon: helpers.getIconPath(),
                                sound: true, // Only Notification Center or Windows Toasters
                                wait: true // Wait with callback, until user action is taken against notification
                            });
                            if (currentAlert.focus_window) {
                                // bring main window to front
                                setTimeout(function () {
                                    mainWindow.show();
                                    mainWindow.focus();
                                }, 700);
                            }
                        };
                    })(conf.alerts[i])
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
    restart(mainWindow) {
        this.stop();
        this.start(mainWindow);
    }
}