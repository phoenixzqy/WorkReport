<template>
    <div class="banner slanted-banner">
        <div class="wrapper">
          <h1>{{title}}</h1>
          <p v-if="description">{{description}}</p>
        </div>
    </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: false,
      default: ""
    }
  },
  data() {
    return {};
  }
};
</script>
<style lang="scss" scoped>
.banner {
  // background-image: linear-gradient(
  //   120deg,
  //   rgb(76, 2, 95),
  //   rgba(140, 3, 204, 0.73),
  //   rgba(210, 129, 250, 0.73)
  // );
  background-image: url("../assets/header_bg.jpg");
  color: rgb(255, 255, 255);
  padding: 5px 30px;
  margin-bottom: 25px;
  
  p {
    margin-top: -15px;
  }
  h1 {
    margin: 15px 0;
  }
}
</style>
