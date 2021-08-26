<template>
  <div class="mx-auto">
    <div :id="art.id" v-for="(art, idx) in arts" :key="idx">
      <div class="card card-product mx-auto">
        <div class="card-body product-bod">
          <h2 class="card-title text-white bg-info rounded text-center">
            <i class="fas fa-rss"></i> {{ art.title }}
          </h2>
          <div class="dropdown-divider"></div>
          <p class="card-text price">{{ art.content }}</p>
          <div>
            <img
              class="card-img-top product-img"
              :alt="art.id"
              :src="art.image"
              v-if="art.image != 0"
            />
          </div>
          <div class="dropdown-divider"></div>
          <ul class="navbar-nav mt-2 mt-lg-0 flex-row">
            <li class="nav-item active userinfo">
              <p>
                Posted by <span> {{ art.username }}</span>
              </p>
            </li>
            <li class="nav-item">
              <span class=""> {{ datePost(art.dateCreate) }} </span>
            </li>
          </ul>
          <router-link
            class="btn btn-info mt-5 text-center d-block fontplus"
            :to="`/post/${art.id}`"
            >Comment</router-link
          >
        </div>
      </div>

      <div class="dropdown-divider"></div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import VueJwtDecode from "vue-jwt-decode";

export default {
  name: "AllPost",
  data() {
    return {
      arts: [],
      imgoff: 0,
      usersid: VueJwtDecode.decode(localStorage.getItem("token")).userId,
      isAdmin: VueJwtDecode.decode(localStorage.getItem("token")).isAdmin,
    };
  },
  mounted() {
    this.getAllPost();
  },
  methods: {
    async getAllPost() {
      const token = localStorage.getItem("token");

      if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      } else {
        axios.defaults.headers.common["Authorization"] = null;
        this.$router.push("/");
      }

      axios
        .get(this.$localhost + "api/post/", {
          headers: {
            Authorization: "bearer " + token,
          },
        })
        .then((res) => {
          this.arts = res.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    datePost(date) {
      const event = new Date(date);
      const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
      };
      return event.toLocaleDateString("fr-Fr", options);
    },
  },
};
</script>
<style scoped>
.card-product {
  display: flex;
  border-radius: 20px 20px;
  width: 50%;
}
.product-img {
  object-fit: contain;
}
.userinfo {
  margin-right: 15px;
}

.dropdown-divider {
  margin: 1em;
}
.fontplus {
  font-size: 1.5em;
}

@media (min-width: 320px) and (max-width: 1000px) {
  .card-product {
    margin: 90px auto auto auto;
    flex-direction: column;
    border-radius: 20px 20px;
    width: 80%;
  }
  .product-img {
    width: 100%;
    object-fit: contain;
  }
}
</style>



