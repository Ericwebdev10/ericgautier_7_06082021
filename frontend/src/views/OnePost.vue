<template>
  <div class="Home">
    <h1>Groupomania social network</h1>
    <Nav />
    <div class="mx-auto">
      <div v-for="(art, idx) in arts" :key="idx">
        <div class="card card-product mx-auto">
          <div class="card-body product-body">
            <h2 class="card-title text-white bg-info rounded text-center">
              <i class="fas fa-rss"></i> {{ art.title }}
            </h2>
            <div class="dropdown-divider"></div>
            <p class="card-text price">{{ art.content }}</p>
            <div>
              <img
                class="card-img-top product-img"
                alt="imagespost"
                :src="art.image"
                v-if="art.image != 0"
              />
              <img
                class="card-img-top product-img"
                :src="art.image"
                v-else-if="imgoff"
              />
            </div>
            <div class="dropdown-divider"></div>
            <ul class="navbar-nav mt-2 mt-lg-0 flex-row">
              <li class="nav-item active userinfo">
                <p>
                  Posted by <span>{{ art.username }}</span>
                </p>
              </li>
              <li class="nav-item">
                <span class=""> {{ datePost(art.dateCreate) }} </span>
              </li>
            </ul>
            <router-link
              class="btn btn-danger mt-5"
              :to="`/update/${art.id}`"
              v-if="userId == art.user_id || admin == 1"
              >Change post</router-link
            >
          </div>
          <div class="container mb-5">
            <div class="row d-flex justify-content-center">
              <div class="col-md-10">
                <div
                  class="
                    headings
                    d-flex
                    justify-content-between
                    align-items-center
                    mb-3
                  "
                >
                  <label for="contentcomm" title="contentcomm" class="sr-only"
                    >Comment</label
                  >
                  <input
                    type="text"
                    class="form-control textarea"
                    rows="2"
                    id="contentcomm"
                    v-model="comment"
                    placeholder="Add your comment"
                    required
                  />
                  <button
                    type="submit"
                    class="btn btn-primary signup ml-2"
                    @click="PostComm()"
                  >
                    Comment
                  </button>
                </div>
                <span
                  class="error"
                  v-if="!$v.comment.required && $v.comment.$dirty"
                  >Add a comment</span
                >

                <div
                  class="card p-3 idcomm mt-4"
                  :id="comm.id"
                  v-for="(comm, indx) in comms"
                  :key="indx"
                >
                  <div
                    class="d-flex justify-content-between align-items-center"
                  >
                    <div class="user d-flex flex-row align-items-center">
                      <span
                        ><small class="font-weight-bold"
                          ><span>{{ comm.username }} </span> replied
                        </small></span
                      >
                    </div>
                  </div>
                  <div
                    class="
                      d-flex
                      justify-content-between
                      align-items-center
                      px-3
                    "
                  >
                    <div class="user d-flex flex-row align-items-center">
                      <span>
                        <small class="font-weight-bold">{{
                          comm.content
                        }}</small></span
                      >
                    </div>
                  </div>
                  <div
                    class="
                      action
                      d-flex
                      justify-content-between
                      mt-2
                      align-items-center
                    "
                  >
                    <button
                      class="btn btn-danger px-4 smallsize"
                      v-if="userId == comm.user_id || admin == 1"
                      @click="deletecomm()"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="dropdown-divider"></div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
// @ is an alias to /src
import axios from "axios";
import Nav from "@/components/Nav.vue";
import Footer from "@/components/Footer.vue";
import { required } from "vuelidate/lib/validators";
import VueJwtDecode from "vue-jwt-decode";

export default {
  name: "OnePost",
  components: {
    Nav,
    Footer,
  },
  data() {
    return {
      comment: "",
      arts: [],
      comms: [],
      imgoff: 0,
      userId: VueJwtDecode.decode(localStorage.getItem("token")).userId,
      admin: VueJwtDecode.decode(localStorage.getItem("token")).isAdmin,
    };
  },
  validations: {
    comment: {
      required,
    },
  },
  mounted() {
    this.getOnePost();
    this.getAllcomms();
  },
  methods: {
    getOnePost() {
      const token = localStorage.getItem("token");

      const idPost = this.$route.params.id;

      if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      } else {
        axios.defaults.headers.common["Authorization"] = null;
        this.$router.push("/");
      }

      axios
        .get(this.$localhost + "api/post/" + idPost, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          this.arts = res.data;
        })
        .catch((error) => {
          console.log("Cannot get post /" + error);
        });
    },

    PostComm() {
      this.submited = true;
      this.$v.$touch();
      if (!this.$v.$invalid) {
        const token = localStorage.getItem("token");
        const userId = VueJwtDecode.decode(
          localStorage.getItem("token")
        ).userId;
        const idPost = this.$route.params.id;

        const formcomm = {
          user_id: userId,
          content: this.comment,
          post_id: idPost,
        };

        console.log(formcomm);
        axios
          .post(this.$localhost + "api/comm/create", formcomm, {
            headers: {
              "Content-Type": "application/json",
              Authorization: "bearer " + token,
            },
          })
          .then((res) => {
            if (res) {
              location.reload();
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },

    getAllcomms() {
      const token = localStorage.getItem("token");
      const idPost = this.$route.params.id;

      axios
        .get(this.$localhost + "api/comm/" + idPost, {
          headers: {
            Authorization: "bearer " + token,
          },
        })
        .then((res) => {
          this.comms = res.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    deletecomm() {
      const token = localStorage.getItem("token");
      const div1 = document.querySelector(".idcomm");
      const comment_id = div1.getAttribute("id");

      axios
        .delete(this.$localhost + "api/comm/delete/" + comment_id, {
          headers: {
            Authorization: "bearer " + token,
          },
        })
        .then((res) => {
          if (res) {
            location.reload();
          }
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
      return event.toLocaleDateString("en-En", options);
    },
  },
};
</script>
<style scoped>
.card-product {
  display: flex;
  width: 100%;
  width: 50%;
}
.product-img {
  width: 100%;
  object-fit: contain;
}
.userinfo {
  margin-right: 15px;
}
h1 {
  text-align: center;
  font-size: 1.6em;
}

.error {
  color: red;
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