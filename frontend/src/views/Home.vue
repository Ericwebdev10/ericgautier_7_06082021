<template>
  <div class="home">
<!--   <img id="logo" alt="logo" src="../assets/icon-above-font.png"> --> 
    <h1>Welcome to Groupomania social network</h1>
    <Nav />
  </div>
</template>

<script>
// @ is an alias to /src
import Nav from '@/components/Nav.vue'

export default {
  name: 'Home',
  components: {
    Nav
  }
}
</script>

<style>

#logo {
  width: 300px;
  padding-top: -50px;
}

</style>