<template>
  <div>
    <Header 
    title="Editing" 
    description="Create or edit your daily report"
    />
    <span class="saving-loader" v-show="saving"><i class="el-icon-loading"></i> Saving</span>
    <div class="editer-container">
      <div class="left-penal">
        <!-- clock timer -->
        <span style="color: #67c23a;">Now: {{clock}}</span>
        <!-- date -->
        <div class="row-container">
          <div class="left-container">
            <span>Date:</span>
          </div>
          <div class="right-container">
            <el-date-picker
              size="mini"
              v-model="date"
              type="date"
              placeholder="Pick a date">
            </el-date-picker>
          </div>
        </div>
        <!-- tasks -->
        <div class="row-container">
          <div class="left-container">
            <span>Tasks:</span>
          </div>
          <div class="right-container">
            <el-input
              type="textarea"
              size="mini"
              :rows="2"
              placeholder="Breifly describe your tasks"
              v-model="tasks">
            </el-input>
          </div>
        </div>
        <!-- working hours -->
        <div class="row-container">
          <div class="left-container">
            <span>Working Hours:</span>
          </div>
          <div class="right-container">
            <el-input-number 
            v-model="workingHours" 
            size="mini"
            :min="1" :max="24"></el-input-number>
          </div>
        </div>
        <!-- % complete -->
        <div class="row-container">
          <div class="left-container">
            <span>% Complete:</span>
          </div>
          <div class="right-container">
            <el-input-number 
            v-model="progress" 
            size="mini"
            :min="0" :max="100"></el-input-number>
          </div>
        </div>
        <!-- extra comments -->
        <div class="row-container">
          <div class="left-container">
            <span>Extra Comments:</span>
          </div>
          <div class="right-container">
            <el-input
              type="textarea"
              size="mini"
              :rows="10"
              placeholder="Some detailed comments and descriptions"
              v-model="comments">
            </el-input>
          </div>
        </div>
      </div>
      <div class="right-penal">
        <h2>Weekly Summary</h2>
        <div v-for="(report, id) in weekData" :key="id">
          <div v-if="report.data" 
          class="summary-card" 
          :class="{'summary-weekend' : report.is_weekend}">
            <span class="summary-title">{{report.date}}</span>
            <span class="summary-hours">{{report.data.working_hours}}h</span>
            <table class="summary-table">
              <tr>
                <td><b>Tasks:</b></td>
                <td>{{report.data.tasks}}</td>
              </tr>
              <tr>
                <td><b>Progress:</b></td>
                <td>{{report.data.progress}}%</td>
              </tr>
              <tr>
                <td><b>Comments:</b></td>
                <td>{{report.data.comments}}</td>
              </tr>
            </table>
          </div>
          <div v-else
          class="summary-card" 
          :class="{'summary-weekend' : report.is_weekend}">
             <span class="summary-title summary-empty">{{report.date}}</span>
             <p v-if="report.is_weekend">Enjoy Your Weekend! :D</p>
             <p v-else>It's empty here :(</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Calendar from "../../models/Calendar.js";
import helpers from "../../utils/helpers.js";
import UserConfig from "../../models/UserConfig.js";

export default {
  data() {
    return {
      date: new Date(),
      tasks: "",
      workingHours: 8,
      progress: 0,
      comments: "",
      saving: false,
      weekData: [],

      clock: helpers.formatDateTime(new Date(), "y-m-d h:i:s"),
      showWeekend: UserConfig.getUserConfig().show_weekend
    };
  },
  mounted() {
    this.loadReport();
    var lastDate = this.date;
    this.$watch(
      function() {
        var p = this.progress ? this.progress.toString() : "0";
        var w = this.workingHours ? this.workingHours.toString() : "0";
        return (
          this.tasks +
          w +
          p +
          this.comments
        );
      },
      function(val) {
        if (lastDate == this.date) {
          helpers.debounce(this.save, 500)();
        }
        lastDate = this.date;
      }
    );
    this.$watch("date", function() {
      this.loadReport();
    });

    // clock timer
    var that = this;
    setInterval(function() {
      that.clock = helpers.formatDateTime(new Date(), "y-m-d h:i:s");
    }, 1000);
  },
  methods: {
    loadReport() {
      // load current day
      var data = Calendar.find({
        id: helpers.formatDateTime(this.date, "y-m-d")
      }).value();
      if (data) {
        this.tasks = data.tasks;
        this.workingHours = data.working_hours;
        this.progress = data.progress;
        this.comments = data.comments;
      } else {
        this.tasks = "";
        this.workingHours = 8;
        this.progress = 0;
        this.comments = "";
      }
      this.loadWeeklySummary();
    },
    loadWeeklySummary() {
      // load current week
      this.weekData = [];
      var dayEnd = this.showWeekend ? 7 : 5;
      for (var i = 1; i <= dayEnd; i++) {
        var d = helpers.getDayOfWeek(this.date, i);
        var data = Calendar.find({
          id: helpers.formatDateTime(d, "y-m-d")
        }).value();
        this.weekData.push({
          date: `${
            ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][d.getDay()]
          } (${helpers.formatDateTime(d, "y-m-d")})`,
          is_weekend: d.getDay() == 0 || d.getDay() == 6,
          data
        });
      }
    },
    save() {
      this.saving = true;
      var that = this;
      setTimeout(function() {
        that.saving = false;
      }, 1000);

      if (!this.tasks && !this.progress && !this.comments) {
        // remove empty log from db
        Calendar.remove({
          id: helpers.formatDateTime(this.date, "y-m-d")
        }).write();
      } else {
        var dataObj = Calendar.find({
          id: helpers.formatDateTime(this.date, "y-m-d")
        });
        // create or update
        if (dataObj.value()) {
          // update existing data
          dataObj
            .set("tasks", this.tasks)
            .set("working_hours", this.workingHours)
            .set("progress", this.progress)
            .set("comments", this.comments)
            .write();
        } else {
          // create new data
          Calendar.push({
            id: helpers.formatDateTime(this.date, "y-m-d"),
            tasks: this.tasks,
            working_hours: this.workingHours,
            progress: this.progress,
            comments: this.comments
          }).write();
        }
      }

      that.loadWeeklySummary();
    }
  },
  components: {
    Header: require("@/components/Header").default
  }
};
</script>
<style lang="scss">
.saving-loader {
  color: #1ea71e;
  position: absolute;
  right: 30px;
  bottom: 20px;
  display: inline-block;
  background: #fff;
  padding: 5px 10px;
  border: 1px solid rgb(176, 255, 144);
  border-radius: 5px;
}
.editer-container {
  display: flex;
  margin-top: -25px;
  height: calc(100vh - 96px);
  .left-penal,
  .right-penal {
    overflow-y: auto;
    padding: 25px;
    flex-basis: 50%;
  }
  .left-penal {
    // flex-grow: 2;

    -webkit-box-shadow: 4px 3px 18px -6px rgba(0, 0, 0, 0.75);
    -moz-box-shadow: 4px 3px 18px -6px rgba(0, 0, 0, 0.75);
    box-shadow: 4px 3px 18px -6px rgba(0, 0, 0, 0.75);
    background-color: #f8fcff;
  }
  .right-penal {
    color: #fff;
  }
}

.summary-card {
  border: 2px solid #6d3d0c;
  border-radius: 10px;
  margin-bottom: 17px;
  padding: 15px 5px 5px;
  position: relative;
  color: #e4e7ed;
  .summary-title,
  .summary-hours {
    position: absolute;
    top: -13px;
    padding: 2.5px 12px;
    background-color: #0c0c0c;
    border: 2px solid #6d3d0c;
    color: #53d633;
    border-radius: 8px;
  }
  .summary-empty {
    // background-color: #ea8b29 !important;
    color: #d65454;
  }
  .summary-title {
    left: 15px;
  }
  .summary-hours {
    right: 15px;
  }
  .summary-table {
    td {
      vertical-align: initial;
    }
  }
}
.summary-weekend {
  border-color: #1b560a;
  .summary-title,
  .summary-hours {
    border-color: #1b560a;
  }
  .summary-empty {
    color: #67c23a;
  }
}
</style>

