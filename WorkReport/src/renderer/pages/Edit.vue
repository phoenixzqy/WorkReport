<template>
  <div>
    <Header 
    title="Editing" 
    description="Create or edit your daily report"
    />
    <div class="wrapper content-container">
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
          :min="1" :max="8"></el-input-number>
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
      <!-- buttons -->
      <div class="buttons-container">
        <el-button 
        class="items" 
        @click="save"
        type="success">Save changes</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import Calendar from "../../models/Calendar.js";
import helpers from "../../utils/helpers.js";

export default {
  data() {
    return {
      date: new Date(),
      tasks: "",
      workingHours: 8,
      progress: 0,
      comments: ""
    };
  },
  mounted() {
    this.loadReport();
  },
  watch: {
    date(val) {
      this.loadReport();
    }
  },
  methods: {
    loadReport() {
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
    },
    save() {
      var dataObj = Calendar.find({
        id: helpers.formatDateTime(this.date, "y-m-d")
      });
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
      this.$message({
        message: "Your report has been saved",
        type: "success"
      });
    }
  },
  components: {
    Header: require("@/components/Header").default
  }
};
</script>
