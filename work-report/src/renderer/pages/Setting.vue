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
          <!-- <span style="color: #888; margin-top: 5px; display:block;">
            You can use Cloudy Services (like Google Drive and Dropbox)<br> to sync your data.
            </span> -->
        </div>
      </div>
      <!-- format -->
      <div class="row-container">
        <div class="left-container">
          <span>Report Template:</span>
        </div>
        <div class="right-container">
          <el-input
            type="textarea"
            size="mini"
            :rows="10"
            placeholder="Your report format"
            v-model="reportFormat">
          </el-input>
        <parser-doc/>
        </div>
      </div>
      <!-- Show/Hide weekend -->
      <div class="row-container">
        <div class="left-container">
          <span>Weekend:</span>
        </div>
        <div class="right-container">
          <el-switch
            v-model="showWeekend"
            size="mini"
            active-text="Show"
            inactive-text="Hide">
          </el-switch>
          <el-popover
            placement="right-start"
            width="300"
            trigger="hover">
            <span>By turning this on, you will include weekends in weekly summary of editing page</span>
            <span 
            style="color: #409eff; padding: 5px;display: inline-block;" 
            slot="reference">
                <i class="el-icon-question" ></i>
            </span>
          </el-popover>
        </div>
      </div>
      <!-- Hide on close -->
      <div class="row-container">
        <div class="left-container">
          <span>Hide on Close:</span>
        </div>
        <div class="right-container">
          <el-switch
            v-model="hideOnClose"
            size="mini"
            active-text="On"
            inactive-text="Off">
          </el-switch>
          <el-popover
            placement="right-start"
            width="300"
            trigger="hover">
            <span>By turning this on, app will run at background while you close it. You can always call it back from your Tray</span>
            <span 
            style="color: #409eff; padding: 5px;display: inline-block;" 
            slot="reference">
                <i class="el-icon-question" ></i>
            </span>
          </el-popover>
        </div>
      </div>
      <!-- alert -->
      <div class="row-container">
        <div class="left-container">
          <span>Reminders:</span>
        </div>
        <div class="right-container">
          <el-switch
            v-model="enableAlert"
            size="mini"
            active-text="Enable"
            inactive-text="Disable"
            >
          </el-switch>
        </div>
      </div>
      <!-- alert settings -->
      <transition name="el-zoom-in-center">
        <div class="sub-options" v-show="enableAlert">
          <table class="alert-table">
            <caption>Your Reminders</caption>
            <tr>
              <th>Frequency</th>
              <th>Message</th>
              <th>
                <el-popover
                  placement="top"
                  width="100"
                  trigger="hover">
                      <span>Force the app window to show above all the other
                         apps at the moment of your reminder.</span>
                  <span 
                  style="color: #409eff;" 
                  slot="reference">
                      <i class="el-icon-edit" ></i>
                  </span>
                </el-popover>
              </th>
              <th style="text-align: center;"> <i class="el-icon-setting"></i> </th>
            </tr>
            <!-- user added alerts -->
            <tr v-for="(alert, id) in alerts" :key="id">
              <td>{{alert.frequency_rule}}</td>
              <td>{{alert.alert_message}}</td>
              <td style="text-align: center;">
                <el-checkbox v-model="alert.focus_window"></el-checkbox>
              </td>
              <td style="text-align: center;">
                <el-button 
                type="danger" 
                icon="el-icon-delete" 
                @click="deleteAlert(id)"
                size="mini"
                circle/>
                </td>
            </tr>
            <!-- add new alert -->
            <tr>
              <td>
                <el-input 
                size="mini"
                :max="20"
                style="width: 120px;"
                placeholder="Cron style frequency rule" 
                v-model="frequencyRule"/>
                <el-popover
                  placement="right-start"
                  trigger="hover">
                      <h3 style="color: #444; margin: 0 0 5px 0; display:block;">Quick Tips: </h3>
                      <table class="alert-table">
                        <tr>
                          <th>Code</th>
                          <th>Description</th>
                          <th>Apply</th>
                        </tr>
                        <tr v-for="(tip, id) in frequencyTips" :key="id">
                          <td>{{tip.code}}</td>
                          <td>{{tip.desc}}</td>
                          <td>
                            <el-button 
                            type="primary" 
                            icon="el-icon-check" 
                            @click="frequencyRule = tip.code"
                            size="mini"
                            circle/>
                          </td>
                        </tr>
                      </table>
                  <span 
                  style="color: #409eff; padding: 5px;display:" 
                  slot="reference">
                      <i class="el-icon-question" ></i>
                  </span>
                </el-popover>
              </td>
              <td>
                <el-input
                  size="mini"
                  type="textarea"
                  :max="100"
                  :rows="2"
                  placeholder="Your alert message"
                  v-model="alertMessage">
                </el-input>
              </td>
              <td style="text-align: center;">
                <el-checkbox v-model="focusWindow"></el-checkbox>
              </td>
              <td style="text-align: center;">
                <el-button 
                  type="primary" 
                  icon="el-icon-plus" 
                  @click="addAlert"
                  size="mini"
                  circle/>
              </td>
            </tr>
          </table>
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
var cron = require("node-cron");

export default {
  data() {
    return {
      reportFormat: UserConfig.getUserConfig().report_template,
      dbPath: SysConfig.getUserConfigDir(),
      enableAlert: UserConfig.getUserConfig().enable_alert,
      showWeekend: UserConfig.getUserConfig().show_weekend,
      alerts: UserConfig.getUserConfig().alerts,
      frequencyRule: "",
      alertMessage: "",
      focusWindow: false,
      hideOnClose: UserConfig.getUserConfig().hide_on_close,
      frequencyTips: [
        {
          code: "30 16 * * *",
          desc: "Everyday at 4:30pm"
        },
        {
          code: "30 16 * * 1-5",
          desc: "Every workday at 4:30pm"
        },
        {
          code: "0 17 * * 1-5",
          desc: "Every workday at 5:00pm"
        },
        {
          code: "0 17 * * 5",
          desc: "Every Friday at 5:00pm"
        },
        {
          code: "0 17 1 * *",
          desc: "Every 1st day of month at 5:00pm"
        }
      ]
    };
  },
  methods: {
    reset() {
      // reset everything except dbPath.
      this.reportFormat = UserConfig.defaultUserConfig.report_template;
      this.enableAlert = UserConfig.defaultUserConfig.enable_alert;
      this.showWeekend = UserConfig.defaultUserConfig.show_weekend;
      this.alerts = UserConfig.defaultUserConfig.alerts;
      this.hideOnClose = UserConfig.defaultUserConfig.hide_on_close;
      SysConfig.resetDefault();
      UserConfig.resetDefault();
      this.$message({
        message: "Your settings has been reset",
        type: "success"
      });
    },
    save() {
      UserConfig.writeUserConfig({
        report_template: this.reportFormat,
        enable_alert: this.enableAlert,
        alerts: this.alerts,
        show_weekend: this.showWeekend,
        hide_on_close: this.hideOnClose
      });
      this.$message({
        message: "Your settings has been updated",
        type: "success"
      });
    },
    deleteAlert(id) {
      this.alerts.splice(id, 1);
    },
    addAlert() {
      if (this.frequencyRule && this.alertMessage) {
        if (!cron.validate(this.frequencyRule)) {
          this.$message({
            type: "error",
            message: "Invalid frequency format!"
          });
          return;
        }
        this.alerts.push({
          frequency_rule: this.frequencyRule,
          alert_message: this.alertMessage,
          focus_window: this.focusWindow
        });
        this.frequencyRule = "";
        this.alertMessage = "";
        this.focusWindow = false;
      } else {
        this.$message({
          type: "error",
          message: "Both 'Frequency Rule' and 'Alert Message' are required!"
        });
      }
    }
  },
  components: {
    Header: require("@/components/Header").default,
    ParserDoc: require("@/components/ParserDoc").default
  }
};
</script>
<style lang="scss" scoped>
.alert-table {
  border-collapse: collapse;
  width: 100%;
  caption {
    color: rgb(35, 144, 252);
    font-size: 18px;
    background-color: rgb(207, 229, 252);
    padding: 5px;
  }
  th,
  td {
    text-align: left;
    padding: 5px 10px;
    border: 1px solid #ccc;
  }
}
</style>

