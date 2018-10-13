<template>
  <el-menu 
  :default-active="defaultActive" 
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
        },
        {
          icon: "el-icon-info",
          route: "about-page",
          label: "About"
        }
      ],
      defaultActive: "0"
    };
  },
  mounted() {
    var that = this;
    // HACK: change default active when the window is reloaded asynchronizely, since the 
    // route is changed after this component is loaded
    setTimeout(function() {
      for (var i in that.naviList) {
        if (that.naviList[i].route === that.$route.name) {
          that.defaultActive = i;
          break;
        }
      }
    }, 5);
  }
};
</script>