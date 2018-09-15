<template>
  <div>
    <Header 
    title="Setting" 
    description="Enhance your personality"
    />
    <div class="wrapper content-container">
      <!-- db path -->
      <div class="row-container">
        <div class="left-container">
          <span>Database Path:</span>
        </div>
        <div class="right-container">
          <el-input 
          placeholder="Your database path" 
          disabled
          size="mini"
          v-model="dbPath"></el-input>
          <span style="color: #888; margin-top: 5px; display:block;">
            You can use Cloudy Services (like Google Drive and Dropbox)<br> to sync your data.
            </span>
        </div>
      </div>
      <!-- format -->
      <div class="row-container">
        <div class="left-container">
          <span>Report Format:</span>
        </div>
        <div class="right-container">
          <el-input
            type="textarea"
            size="mini"
            :rows="10"
            placeholder="Your report format"
            v-model="reportFormat">
          </el-input>
        </div>
      </div>
      <!-- Email alert -->
      <div class="row-container">
        <div class="left-container">
          <span>Email Alert:</span>
        </div>
        <div class="right-container">
          <el-switch
            v-model="enableAlert"
            size="mini"
            active-text="Enable"
            inactive-text="Disable">
          </el-switch>
        </div>
      </div>
      <!-- alert settings -->
      <transition name="el-zoom-in-center">
        <div class="sub-options" v-show="enableAlert">
          <div class="row-container">
            <div class="left-container">
              <span>Target Email:</span>
            </div>
            <div class="right-container">
              <el-input 
              size="mini"
              placeholder="Your email address to receive alerts" 
              v-model="emailAddress"></el-input>
            </div>
          </div>
          <div class="row-container">
            <div class="left-container">
              <span>Frequency Rule:</span>
            </div>
            <div class="right-container">
              <el-input 
              size="mini"
              placeholder="Cron style frequency rule" 
              v-model="frequencyRule"></el-input>
              <span style="color: #888; margin-top: 5px; display:block;">Tips: <br>
              Everyday at 5:00pm: 0 17 * * * <br>
              Every friday at 5:00pm: 0 17 * * 5 <br>
              </span>
              
            </div>
          </div>
        </div>
       </transition>
      <!-- buttons -->
      <div class="buttons-container">
        <el-button 
        class="items" 
        @click="reset"
        type="warning">Reset to default</el-button>
        <el-button 
        class="items" 
        @click="save"
        type="success">Save changes</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import UserConfig from "../../models/UserConfig.js";
import SysConfig from "../../models/SysConfig.js";

export default {
  data() {
    return {
      reportFormat: UserConfig.getUserConfig().report_format,
      dbPath: SysConfig.getUserConfigDir(),
      enableAlert: UserConfig.getUserConfig().enable_alert,
      emailAddress: UserConfig.getUserConfig().email_address,
      frequencyRule: UserConfig.getUserConfig().frequency_rule
    };
  },
  methods: {
    reset() {
      // reset everything except dbPath.
      this.reportFormat = UserConfig.defaultUserConfig.report_format;
      this.enableAlert = UserConfig.defaultUserConfig.enable_alert;
      this.emailAddress = UserConfig.defaultUserConfig.email_address;
      this.frequencyRule = UserConfig.defaultUserConfig.frequency_rule;
      SysConfig.resetDefault();
      UserConfig.resetDefault();
      this.$message({
        message: "Your settings has been reset",
        type: "success"
      });
    },
    save() {
      UserConfig.writeUserConfig({
        report_format: this.reportFormat,
        enable_alert: this.enableAlert,
        email_address: this.emailAddress,
        frequency_rule: this.frequencyRule
      });
      this.$message({
        message: "Your settings has been updated",
        type: "success"
      });
    }
  },
  components: {
    Header: require("@/components/Header").default
  }
};
</script>
