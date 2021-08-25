<template>
  <div class="Home">
    <h1>Groupomania social network</h1>
    <Nav />
    <CreatePost />
    <AllPost />
    <Footer />
  </div>
</template>

<script>
// @ is an alias to /src

import Nav from "@/components/Nav.vue";
import Footer from "@/components/Footer.vue";
import CreatePost from "@/components/CreatePost.vue";
import AllPost from "@/components/AllPost.vue";
export default {
  name: "Home",
  components: {
    Nav,
    CreatePost,
    AllPost,
    Footer,
  },
};
</script>
<style scoped>
h1 {
  text-align: center;
  font-size: 18px;
}
</style>
