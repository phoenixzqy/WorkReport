<template>
  <div>
    <Header 
    title="Setting" 
    description="Enhance your personality"
    />
    <div class="wrapper">
      <!-- Email alert -->
      <div class="row">
        <div class="left-container">
          <span>Email Alert:</span>
        </div>
        <div class="right-container">
          <el-switch
            v-model="enableAlert"
            active-text="Enable"
            inactive-text="Disable">
          </el-switch>
        </div>
      </div>
      <!-- alert settings -->
      <div class="sub-options" v-show="enableAlert">
        <div class="row">
          <div class="left-container">
            <span>Target Email:</span>
          </div>
          <div class="right-container">
            <el-input 
            placeholder="Your email address to receive alerts" 
            v-model="emailAddress"></el-input>
          </div>
        </div>
        <div class="row">
          <div class="left-container">
            <span>Frequency Rule:</span>
          </div>
          <div class="right-container">
            <el-input 
            placeholder="Cron style frequency rule" 
            v-model="frequencyRule"></el-input>
            <span style="color: #888; margin-top: 5px; display:block;">Tips: <br>
            Everyday at 5:00pm: 0 17 * * * <br>
            Every friday at 5:00pm: 0 17 * * 5 <br>
            </span>
            
          </div>
        </div>
      </div>
      <!-- db path -->
      <div class="row">
        <div class="left-container">
          <span>Database Path:</span>
        </div>
        <div class="right-container">
          <el-input 
          placeholder="Your database path" 
          v-model="dbPath"></el-input>
          <span style="color: #888; margin-top: 5px; display:block;">
            You can use Cloudy Services (like Google Drive and Dropbox)<br> to sync your data.
            </span>
        </div>
      </div>
      <!-- format -->
      <div class="row">
        <div class="left-container">
          <span>Report Format:</span>
        </div>
        <div class="right-container">
          <el-input
            type="textarea"
            :rows="10"
            placeholder="Your report format"
            v-model="reportFormat">
          </el-input>
        </div>
      </div>
      <!-- buttons -->
      <div class="row">
        <div class="left-container"></div>
        <div class="right-container">
          <div class="buttons-container">
            <el-button class="items" type="warning">Reset to default</el-button>
            <el-button class="items" type="success">Save changes</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      reportFormat: "",
      dbPath: "",
      enableAlert: true,
      enableDailyAlert: true,
      emailAddress: "",
      frequencyRule: ""
    };
  },
  components: {
    Header: require("@/components/Header").default
  }
};
</script>
<style lang="scss" scoped>

.row {
  display: flex;
  width: 100%;
  margin: 10px 0;
  .left-container {
    flex-basis: 150px;
  }
  .right-container {
    flex-grow: 1;
  }
}
.sub-options {
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 20px;
}
.buttons-container {
  display: inline-block;
  width: 100%;
  margin: 10px 0;
  align-content: center;
  text-align: center;
}
</style>
