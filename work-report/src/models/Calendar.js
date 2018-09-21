"use strict"
const lowdb = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
import SysConfig from "./SysConfig";

const dir = SysConfig.getUserConfigDir();
const path = `${dir}/calendar.json`

const adapter = new FileSync(path, {
    defaultValue: [],
    serialize: (array) => JSON.stringify(array),
    deserialize: (string) => JSON.parse(string)
});
export default lowdb(adapter);