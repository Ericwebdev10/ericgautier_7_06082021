<template>
  <div id="updatePost">
    <Nav />
    <div>
      <h2>Modifier votre Post</h2>
      <form class="px-4 py-3 Post" id="formpost" encType="multipart/form-data">
        <div class="form-group">
          <label for="title">Titre</label>
          <input type="text" class="form-control" v-model="title" id="title" placeholder="votre titre" aria-required="true" required />
          <span class="error" v-if="(!$v.title.required && $v.title.$dirty)">Veuillez ajouter un titre</span>
        </div>
        <div class="form-group">
          <label for="content">Texte</label>
          <textarea class="form-control textarea " rows="3" id="content" placeholder="Modifier votre text...ou modifier votre image" aria-required="true"></textarea>
        </div>
        <div class="form-group">
          <label for="image" class="sr-only" title="image" role="button">images</label>
          <input type="file" accept=".png, .jpg, .jpeg, .gif, .webp" v-on:change="onSelect" aria-required="true" ref="file" id="image" />
        </div>
        <button type="submit" class="btn btn-danger signup" @click="updateForm()">Modifier</button><button type="submit" class="btn btn-danger signup ml-5" @click="deleteForm()">Supprimer</button>
      </form>
      <Footer />
    </div>
  </div>
</template>
<script>
import axios from "axios";
import Nav from "@/components/Nav.vue";
import Footer from "@/components/Footer.vue";
import { required } from "vuelidate/lib/validators";
import VueJwtDecode from "vue-jwt-decode";

export default {
  name: "Update",
  components: {
    Nav,
    Footer,
  },
  data() {
    return {
      title: "",
      file: "",
    };
  },
  validations: {
    title: {
      required,
    },
  },
  methods: {
    onSelect() {
      this.file = this.$refs.file.files[0];
    },
    updateForm() {
      this.submited = true;
      this.$v.$touch();
      if (!this.$v.$invalid) {
        const token = localStorage.getItem("token");
        const userId = VueJwtDecode.decode(
          localStorage.getItem("token")
        ).userId;
        const title = document.querySelector("#title").value;
        const content = document.querySelector("#content").value;
        const idPost = this.$route.params.id;

        if (token) {
          axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        } else {
          axios.defaults.headers.common["Authorization"] = null;
          this.$router.push("/");
        }

        const formData = new FormData();
        formData.append("image", this.file);
        formData.append("title", title);
        formData.append("content", content);
        formData.append("user_id", userId);

        axios
          .post(this.$localhost + "api/post/update/" + idPost, formData, {
            headers: {
              Authorization: "bearer " + token,
            },
          })
          .then((res) => {
            if (res) {
              this.$router.push("../Home");
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
    deleteForm() {
      const token = localStorage.getItem("token");
      const idPost = this.$route.params.id;
      axios
        .delete(this.$localhost + "api/post/delete/" + idPost, {
          headers: {
            Authorization: "bearer " + token,
          },
        })
        .then((res) => {
          if (res) {
            this.$router.push("../Home");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
<style scoped>
#updatePost {
  text-align: left;
}
h2 {
  padding: 20px;
  font-size: 18px;
}
.Post {
  margin-top: 45px;
  margin-bottom: 125px;
}
</style>
