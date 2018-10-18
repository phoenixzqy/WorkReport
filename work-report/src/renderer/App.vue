<template>
  <div id="app">
    <div class="app-box">
      <Navi/>
    </div>
    <div class="app-box">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
  </div>
</template>

<script>
export default {
  name: "work-report",
  data() {
    return {};
  },
  components: {
    Navi: require("@/components/Navi").default
  }
};
</script>

<style lang="scss">
#app {
  display: block;
  height: 100%;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  .app-box {
    height: 100%;
    overflow-y: auto;
    &:nth-child(1) {
      position: relative;
      float: left;
    }
    &:nth-child(2) {
      position: relative;
      background-color: rgb(249, 248, 255);
      background-image: url("./assets/app_bg.jpg");
    }
  }
}
.wrapper {
  width: 650px;
  margin: auto;
}
.content-container {
  background-color: #f8fcff;
  padding: 20px;
  border-radius: 5px;
  margin-bottom: 25px;
  -webkit-box-shadow: 0px 0px 20px 1px rgba(0, 0, 0, 0.1);
  -moz-box-shadow: 0px 0px 20px 1px rgba(0, 0, 0, 0.1);
  box-shadow: 0px 0px 20px 1px rgba(0, 0, 0, 0.1);
}
.row-container {
  display: flex;
  width: 100%;
  margin: 30px 0;
  .left-container {
    flex-basis: 120px;
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
  margin: 30px 0;
  align-content: center;
  text-align: center;
}
</style>

