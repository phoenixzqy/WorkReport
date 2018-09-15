"use strict"

const fs = require("fs");
const sysConfig = require("./SysConfig").default;
var dir = sysConfig.getUserConfigDir();
var path = `${dir}/user_config.json`;
const defaultUserConfig = {
    report_format: "",
    enable_alert: false,
    email_address: "",
    frequency_rule: "0 17 * * *",
}

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
export default {
    writeUserConfig,
    getUserConfig,
    defaultUserConfig,
    resetDefault() {
        writeUserConfig(defaultUserConfig)
    }
}