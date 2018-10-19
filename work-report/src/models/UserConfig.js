"use strict"

const fs = require("fs");
const sysConfig = require("./SysConfig").default;
var dir = sysConfig.getUserConfigDir();
var path = `${dir}/user_config.json`;
const defaultUserConfig = {
    report_template: `Weekly Report
==
**Submitted by** Name

**Period** %day_of_week_1 → %day_of_week_5

Urgent!
--

> Immediate feedback or action is needed

Reminder
--

> Still waiting for...
> Waiting for...since...
> Waiting for...until...

Issues
--

> You shall report here the problems encountered during the reporting period and expected to be resolved in a regular way, with no need for the additional resources.Suggest an action plan.

Daily work
--

> You shall list here your own activities as well as activities of the unit that reports to you for the reporting period.Support your report with facts and numbers highlighting the achieved results.

> | Index | Date | Task | Progress | Working Hours | Extra Comments |
|---|---|---|---|---|---|
%daily_report
| %count |%date | %tasks | %progress% | %working_hours | %comments |
%daily_report_end

Plans for next week
--

> You shall briefly specify what are your next priorities for the next reporting period.Rank them as: important and urgent, just important, and just urgent.

Requests and proposals
--

> Ideas, suggestions, enquiries for complementary information or requests for the allocation of additional resources.`,
    enable_alert: true,
    show_weekend: false,
    email_address: "",
    alerts: [{
        frequency_rule: "0 17 * * *",
        alert_message: "Hi, don't forget to record your work report! :D",
        focus_window: true
    }],
    hide_on_close: true,
};

function checkUserConfig() {
    if (!fs.existsSync(path)) {
        writeUserConfig(defaultUserConfig)
    }
}
// instant checking user config file
checkUserConfig();

function writeUserConfig(data) {
    fs.writeFileSync(path, JSON.stringify(data));
}

function getUserConfig() {
    return JSON.parse(fs.readFileSync(path));
}
function onChange(cb) {
    fs.watchFile(path,{
        interval: 1000
    }, cb);
}
export default {
    writeUserConfig,
    getUserConfig,
    defaultUserConfig,
    onChange,
    resetDefault() {
        writeUserConfig(defaultUserConfig)
    }
}