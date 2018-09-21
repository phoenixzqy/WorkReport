"use strict"

const fs = require("fs");
const homedir = require('os').homedir();

const dir = `${homedir}/Documents/WorkReport`;
const path = `${dir}/sys_config.json`;
const defaultSysConfig = {
    user_config_dir: `${dir}`,
}

function checkSysConfig() {
    if(!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }
    if (!fs.existsSync(path)) {
        writeSysConfig(defaultSysConfig)
    }
}
// instant checking system config file
checkSysConfig();

function getSysConfig() {
    return JSON.parse(fs.readFileSync(path));
}

function writeSysConfig(data) {
    fs.writeFileSync(path, JSON.stringify(data));
}

export default {
    getUserConfigDir() {
        return getSysConfig().user_config_dir
    },
    writeUserConfigDir(uPath) {
        var config = getSysConfig();
        config.user_config_dir = uPath;
        writeSysConfig(config);
    },
    defaultSysConfig,
    resetDefault() {
        writeSysConfig(defaultSysConfig)
    }
}