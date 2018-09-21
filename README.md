# WorkReport

An Electron based app for user to record daily/weekly work report, generate weekly report by given templates and will be able to automatically submit report to company server.

## How it works

1. You just need to keep daily work report with some brief description. 
2. You could setup any weekly report template based on your company code. Or you can just use the default template.
3. The report page will always generate weekly report based on the template and the corresponding date you choose.

## Dependencies

* electron-vue
* element-ui
* simpleMDE
* lowdb
* node-cron

## TODO

* Editing page, create a side panel to show brief summary of current selected week.
* crontab based System Notification/Email Alert function
* crontab based auto-submission function (either email or through ajax)

## dev and build

[Readme](https://github.com/phoenixzqy/WorkReport/tree/master/work-report)

**Tips:**

* After building the app, you will have your app under `work-report/build`. The file named `work-report-0.0.1-x86_64.AppImage` is your executable file.
* When you run `work-report-0.0.1-x86_64.AppImage`, it will ask you to install/register you app to yor system. If you want this app to be handy, you can select `yes`.

**Note:**

* for Windows user, please forward to official electron documentation for detail instructions.

## Screenshots

![Editing page](https://github.com/phoenixzqy/WorkReport/blob/master/images/editing_page.png?raw=true)

![Report Page](https://github.com/phoenixzqy/WorkReport/blob/master/images/report_page.png?raw=true)

![Setting Page](https://github.com/phoenixzqy/WorkReport/blob/master/images/setting_page.png?raw=true)