<template>
  <div>
    <Header 
    title="Weekly Report" 
    description="Generate weekly report with any format you like"
    />
    <div class="wrapper content-container">
      <p v-show="showHint">Your settings or calendar data has been changed. Would you like to 
        <a href="javascript:;" @click="refresh">refresh</a>
        this report? 
        <span style="color: red;">You will lose your changes by doing this.</span></p>
      <!-- date -->
      <div class="row-container">
          <span style="margin-right: 15px; padding-top: 8px;">Date: </span>
          <el-date-picker
            size="mini"
            v-model="date"
            type="date"
            placeholder="Pick a date">
          </el-date-picker>
      </div>
      <!-- simple MDE -->
      <SimpleMDE v-model="report" />
    </div>
  </div>
</template>
<script>
import Calendar from "../../models/Calendar.js";
import helpers from "../../utils/helpers.js";
import UserConfig from "../../models/UserConfig.js";
import SysConfig from "../../models/SysConfig.js";

export default {
  data() {
    return {
      report: "",
      date: new Date(),
      showHint: false,
    };
  },
  mounted() {
    this.parse();

    var that = this;
    UserConfig.onChange(() => {
      that.showHint = true;
    });
    Calendar.onChange(() => {
      that.showHint = true;
    })
  },
  watch: {
    date() {
      this.parse();
      
      this.$message({
        message: "Your report has been regenerated",
        type: "success"
      });
    }
  },
  methods: {
    loopParser(str) {
      var loopStartSign = "%daily_report\n";
      var loopEndSign = "\n%daily_report_end";
      if (str.indexOf(loopStartSign) < 0 || str.indexOf(loopEndSign) < 0) {
        return str;
      }
      var strBeforeLoop = str.substring(0, str.indexOf(loopStartSign));
      var strAfterLoop = str.substring(
        str.indexOf(loopEndSign) + loopEndSign.length,
        str.length
      );
      var loopBody = str.substring(
        str.indexOf(loopStartSign) + loopStartSign.length,
        str.indexOf(loopEndSign)
      );
      var loopArr = [];
      var count = 1;
      for (var i = 1; i <= 7; i++) {
        var d = helpers.getDayOfWeek(this.date, i);
        var data = Calendar.database.find({
          id: helpers.formatDateTime(d, "y-m-d")
        }).value();
        if (data) {
          var tempStr = loopBody;
          tempStr = tempStr.replace(new RegExp("%count", "g"), String(count++));
          tempStr = tempStr.replace(
            new RegExp("%tasks", "g"),
            String(data.tasks)
          );
          tempStr = tempStr.replace(new RegExp("%date", "g"), String(data.id));
          tempStr = tempStr.replace(
            new RegExp("%progress", "g"),
            String(data.progress)
          );
          tempStr = tempStr.replace(
            new RegExp("%working_hours", "g"),
            String(data.working_hours)
          );
          tempStr = tempStr.replace(
            new RegExp("%comments", "g"),
            String(data.comments)
          );
          loopArr.push(tempStr);
        }
      }
      return this.loopParser(strBeforeLoop + loopArr.join("\n") + strAfterLoop);
    },
    parse() {
      var reportArr = [];
      var format = UserConfig.getUserConfig().report_template;
      // replace non-loop variables
      // day_of_week
      for (var d = 0; d <= 7; d++) {
        format = format.replace(
          new RegExp(`%day_of_week_${d}`, "g"),
          helpers.formatDateTime(helpers.getDayOfWeek(this.date, d), "y-m-d")
        );
      }
      // replace the loop variables
      this.report = this.loopParser(format);
    },
    refresh() {
      this.parse();
      this.showHint = false;
    }
  },
  components: {
    Header: require("@/components/Header").default,
    SimpleMDE: require("@/components/SimpleMDE").default
  }
};
</script>
<style lang="scss" scoped>
</style>
