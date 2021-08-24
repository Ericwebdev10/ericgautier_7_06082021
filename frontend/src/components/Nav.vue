<template>
  <div class="navigation">
    <nav class="navbar navbar-expand-md d-flex justify-content-between fixed-top bg-dark">

      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarResponsive">
        <ul class="navbar-nav ml-auto">
          <li class="nav-item active">
            <router-link class="nav-link" :to="`/user/${usersid}`">User Profile</router-link>
          </li>
          <li class="nav-item active">
            <router-link class="nav-link" to="/Home">Home</router-link>
          </li>
          <li class="nav-item active">
            <button class="nav-link btn btn-primary" @click="Logout()">Logout</button>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>
<script>
import VueJwtDecode from "vue-jwt-decode";

export default {
  name: "Nav",
  data() {
    return {
      usersid: VueJwtDecode.decode(localStorage.getItem("token")).userId,
    };
  },
  methods: {
    Logout() {
      localStorage.clear();
      this.$router.push("/");
    },
  },
};
</script>
<style scoped>
img {
  width: 10%;
}
@media (min-width: 768px) {
  img {
    width: 5%;
  }
}
button {
  border: none !important;
  background-color: rgb(235, 27, 114) !important;
}
</style>
