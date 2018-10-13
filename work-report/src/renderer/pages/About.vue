<template>
    <div>
        <Header 
        title="About" 
        description="Something about this app"
        />
        <div class="wrapper content-container">
            <h2>About App</h2>
            <hr>
            <h3>What it is</h3>
            <p>This is an app for user to record daily/weekly work report, generate weekly report by given templates and will be able to automatically submit report to company server.</p>
            <h3>Features</h3>
            <ol>
                <li>Highly Customizable weekly report template</li>
                <li>Highly Customizable System Alert/Reminder functionality</li>
                <li>Auto-saving</li>
                <li>Background mode</li>
                <li>Portable json file based database. No need to install any DB software</li>
                <li>Markdown support</li>
                <li>Cross platform/OS: Linux, MacOS and Windows</li>
                <li>Open Source</li>
            </ol>
            <h3>Workflow</h3>
            <ol>
                <li>You need to keep this app alive to get Reminders/Alerts work.</li>
                <li>You could setup any weekly report template based on your company code. Or you can just use the default template.</li>
                <li>You just need to keep daily work report with some brief description.</li>
                <li>The report page will always generate weekly report based on the template and the corresponding date you choose.</li>
            </ol>
            <h3>More</h3>
            <p>To read <a href="javescript:;" @click="openLink('https://github.com/phoenixzqy/WorkReport')">more</a> about this project.</p>
            
            
            <h2>About Auther</h2>
            <hr>
            <p>
                Name: Felix Zhao <br>
                Github: 
                <a 
                href="javescript:;" 
                @click="openLink('https://github.com/phoenixzqy')">
                    https://github.com/phoenixzqy
                </a> <br>
                LinkedIn: 
                <a 
                href="javescript:;" 
                @click="openLink('https://www.linkedin.com/in/qiyu-zhao-b02352b6/')">
                    https://www.linkedin.com/in/qiyu-zhao-b02352b6/
                </a> <br>
                Blog: 
                <a 
                href="javescript:;" 
                @click="openLink('https://phoenixzqy.github.io')">
                    https://phoenixzqy.github.io
                </a> <br>
            </p>

            <h2>LICENSE</h2>
            <hr>
            <p>
                <a 
                href="javescript:;" 
                @click="openLink('https://github.com/phoenixzqy/WorkReport/blob/master/LICENSE')">
                    MIT License
                </a>
            </p>
            <p>Copyright (c) 2018 Felix Zhao</p>
        </div>
    </div>
</template>
<script>
const { shell } = require("electron");

export default {
  data() {
    return {};
  },
  components: {
    Header: require("@/components/Header").default
  },
  methods: {
    openLink(link) {
      shell.openExternal(link);
    }
  }
};
</script>
<style scoped>
h2 {
  text-align: center;
}
hr {
  margin-top: -15px;
}
</style>
