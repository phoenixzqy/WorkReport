# WorkReport

An Electron based app for user to record daily/weekly work report, generate weekly report by given templates and will be able to automatically submit report to company server.

## Features

* Highly Customizable weekly report template
* Highly Customizable System Alert/Reminder functionality
* Auto-saving
* Background mode.
* Portable json file based database. No need to install any DB software
* Markdown support
* Cross platform/OS: Linux, MacOS and Windows
* Open Source

## Workflow

1. You need to keep this app alive to get Reminders/Alerts work.
2. You could setup any weekly report template based on your company code. Or you can just use the default template.
3. You just need to keep daily work report with some brief description. 
4. The report page will always generate weekly report based on the template and the corresponding date you choose.

## Dependencies

* electron-vue
* element-ui
* simpleMDE
* lowdb
* node-cron
* node-notifier

## TODO

* ~~Editing page, create a side panel to show brief summary of current selected week.~~
* ~~Add brief documentation/hints in app to explain template variables.~~
* ~~Add "Delete" feature for daily report~~
* ~~Add system level alert/notification to remind user to write daily report~~
* ~~crontab based System Notification~~
* ~~Add Tray support~~
* ~~Background mode~~
* ~~Reminders can popup main window now to enforce user to finish daily report.~~
* Improve `Download` function of report page.
* crontab based auto-submission function (either email or through ajax)
  * auto-submission should be an extension like function, due to the variety of different company weekly report submission process.
* Improve Logging system.
* Maybe should add basic Auth system? This function needs some discussion with more users.

## dev and build

#### Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:9080
npm run dev

# build electron application for production
npm run build
```

[Read More](https://github.com/phoenixzqy/WorkReport/tree/master/work-report)

**Tips:**

* After building the app, you will have your app under `work-report/build`. The file named like `work-report-0.0.1-x86_64.AppImage` is your executable file.
* When you run `work-report-0.0.1-x86_64.AppImage`, it will ask you to install/register your app to system. If you want this app to be handy, please select `yes`.

**Note:**

* for Windows user, please forward to official electron documentation for detail instructions.

## Screenshots

![Editing page](https://github.com/phoenixzqy/WorkReport/blob/master/images/editing_page.png?raw=true)

![Report Page](https://github.com/phoenixzqy/WorkReport/blob/master/images/report_page.png?raw=true)

![Setting Page](https://github.com/phoenixzqy/WorkReport/blob/master/images/setting_page.png?raw=true)
