<template>
  <div>
    <Header 
    title="Weekly Report" 
    description="Generate weekly report with any format you like"
    />
    <div class="wrapper content-container">
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
      report: ""
    };
  },
  mounted() {
    this.parse();
  },
  methods: {
    parse() {
      var reportArr = [];
      var format = UserConfig.getUserConfig().report_format;
      var dict = SysConfig.getDict();
      for (var i = 0; i < 7; i++) {
        var d = helpers.generateDate(-i);
        var data = Calendar.find({
          id: helpers.formatDateTime(d, "y-m-d")
        }).value();
        if (data) {
          // parse report day by day
          var tempStr = format;
          for (var j in dict) {
            switch (dict[j]) {
              case "%tasks":
                tempStr = tempStr.replace(
                  new RegExp(dict[j], "g"),
                  String(data.tasks)
                );
                break;
              case "%date":
                tempStr = tempStr.replace(
                  new RegExp(dict[j], "g"),
                  String(data.id)
                );
                break;
              case "%progress":
                tempStr = tempStr.replace(
                  new RegExp(dict[j], "g"),
                  String(data.progress)
                );
                break;
              case "%working_hours":
                tempStr = tempStr.replace(
                  new RegExp(dict[j], "g"),
                  String(data.working_hours)
                );
                break;
              case "%comments":
                tempStr = tempStr.replace(
                  new RegExp(dict[j], "g"),
                  String(data.comments)
                );
                break;
            }
          }
          reportArr.push(tempStr);
        }
        if (d.getDay() === 1) break;
      }
      reportArr = reportArr.reverse();
      for (i in reportArr) {
        reportArr[i] = reportArr[i].replace(
          new RegExp("%count", "g"),
          String(~~i + 1)
        );
      }
      this.report = reportArr.join("\n");
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
