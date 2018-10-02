<template>
    <el-popover
  placement="right-start"
  width="400"
  trigger="hover">
  <div class="doc-box">
    <el-table :data="gridData">
        <el-table-column property="var" width="140" label="Variable"></el-table-column>
        <el-table-column property="val" label="Value"></el-table-column>
    </el-table>
  </div>
  <span style="color: #409eff; padding: 5px;display: inline-block;" slot="reference">
      <i class="el-icon-question" ></i>
  </span>
  
</el-popover>
</template>
<script>
export default {
  data() {
    return {
      gridData: [
        {
          var: "%day_of_week_n",
          val:
            "The day of the week. Where 'n' is from 1 to 7, which means from Monday to Sunday."
        },
        {
          var: "%daily_report",
          val: "Start signal of daily report loop"
        },
        {
          var: "%daily_report_end",
          val: "Stop signal of daily report loop"
        },
        {
          var: "%count",
          val: "An auto increased number(index) of daily report."
        },
        {
          var: "%date",
          val: "Date of daily report"
        },
        {
          var: "%tasks",
          val: "Tasks of daily report"
        },
        {
          var: "%progress",
          val: "% complete(progress) of daily report"
        },
        {
          var: "%working_hours",
          val: "Working hours of daily report"
        },
        {
          var: "%comments",
          val: "Extra comments of daily report"
        }
      ]
    };
  }
};
</script>
<style scoped>
.doc-box {
    display: block;
    max-height: 170px;
    overflow-y: auto;
}
</style>
