<template>
  <div id="app">
    <header id="header">
      <img class="logo" alt="Vue logo" src="../src/assets/icon-left-font-monochrome-white.svg" />
    </header>
    <div id="testConnection"></div>
    <router-view />
  </div>
</template>
<script>
import axios from "axios";

export default {
  data() {
    return {
      conn: "",
    };
  },
  created() {
    axios
      .get(this.$localhost + "api/")

      .then((response) => (this.conn = response.data))
      .catch((error) => {
        console.log(error);
        document.getElementById("testConnection").innerHTML = "!!! Cannot reach server !!!";
      });
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

body {
  background-image: linear-gradient(60deg, #b87efb 0%, #f7ce68 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 32px;
}


#header {
  text-align: center;
}
#nav {
  padding: 0px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}
#nav a.router-link-exact-active {
  color: #42b983;
}
.logo {
  margin: 20px;
}
.navigation {
  text-align: left;
}
.btn-primary {
  background-color: #1956c8 !important;
  font-weight: 600;
}
#testConnection {
  text-align: center;
  font-size: 24px;
  color: rgb(255, 0, 64);
}
@media (min-width: 1024px) {
  .logo {
    width: 50%;
  }
}
</style>
