<template>
  <div id="app">
    <div class="app-box">
      <Navi/>
    </div>
    <div class="app-box">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'work-report',
    data() {
      return {}
    },
    components: {
      Navi: require('@/components/Navi').default
    }
  }
</script>

<style lang="scss">
#app {
  display: flex;
  height: 100%;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  .app-box {
    height: 100%;
    overflow-y: auto;
    &:nth-child(1) {
      flex-basis: auto;
    }
    &:nth-child(2) {
      flex-grow: 2;
      background-color: #eee;
    }
  }
}
.wrapper {
  max-width: 600px;
  margin: auto;
}
</style>

