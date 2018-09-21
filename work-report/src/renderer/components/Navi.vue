<template>
  <el-menu 
  default-active="0" 
  style="height: 100%;"
  :collapse="true">
    <router-link 
    v-for="(item, key) in naviList" 
    :key="key"
    :to="{name: item.route}"
    >
      <el-menu-item :index="String(key)">
        <i :class="item.icon"></i>
        <span slot="title">{{item.label}}</span>
      </el-menu-item>
    </router-link>
  </el-menu>
</template>
<script>
export default {
  data() {
    return {
      naviList: [
        {
          icon: "el-icon-edit-outline",
          route: "edit-page",
          label: "Edit"
        },
        {
          icon: "el-icon-tickets",
          route: "report-page",
          label: "Generate Report"
        },
        {
          icon: "el-icon-setting",
          route: "setting-page",
          label: "Setting"
        }
      ]
    };
  }
};
</script>