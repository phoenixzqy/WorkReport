"use strict";

export default {
    numberWithCommas(x) {
        x = x.toString();
        var pattern = /(-?\d+)(\d{3})/;
        while (pattern.test(x))
            x = x.replace(pattern, "$1,$2");
        return x;
    },

    // keep leading zeros
    pad(num, size) {
        var s = num + "";
        while (s.length < size) s = "0" + s;
        return s;
    },
    generateDate(dateModifier = 0) {
        var now = new Date();
        return new Date(
            now.getFullYear(),
            now.getMonth(),
            now.getDate() + dateModifier,
            now.getHours(),
            0,
            0
        );
    },
    // y: year, m: month, d: date
    // h: hour, i: minute, s: second
    formatDateTime(date, format) {
        date = new Date(date);
        var result = format || 'y-m-d h:i:s';
        result = result.replace('y', date.getFullYear());
        result = result.replace('m', this.pad(date.getMonth() + 1, 2));
        result = result.replace('d', this.pad(date.getDate(), 2));
        result = result.replace('h', this.pad(date.getHours(), 2));
        result = result.replace('i', this.pad(date.getMinutes(), 2));
        result = result.replace('s', this.pad(date.getSeconds(), 2));
        return result;
    },
    arrayRemoveDuplicates(a) {
        var prims = {
                "boolean": {},
                "number": {},
                "string": {}
            },
            objs = [];

        return a.filter(function (item) {
            var type = typeof item;
            if (type in prims)
                return prims[type].hasOwnProperty(item) ? false : (prims[type][item] = true);
            else
                return objs.indexOf(item) >= 0 ? false : objs.push(item);
        });
    },
    deepCopyObject(obj) {
        return JSON.parse(JSON.stringify(obj));
    },
    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    },
    debounce(fun, delay) {
        return function (args) {
            let that = this;
            let _args = args;
            clearTimeout(fun.id);
            fun.id = setTimeout(function () {
                fun.call(that, _args);
            }, delay);
        };
    },
    throttle(fun, delay) {
        let last;
        return function (args) {
            let that = this;
            let _args = args;
            let now = +new Date();
            if (!last || now >= last + delay) {
                last = now;
                fun.apply(that, _args);
            }
        };
    }

}