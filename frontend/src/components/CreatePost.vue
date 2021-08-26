<template>
  <main id="Post">
    <div>
      <form class="px-4 py-3 Post" id="formpost" encType="multipart/form-data">
        <div class="form-group">
          <label for="title">Title</label>
          <input type="text" class="form-control" id="title" v-model="title" placeholder="Add your title here" aria-required="true" required /><br>
          <span class="error" v-if="(!$v.title.required && $v.title.$dirty)">Add title</span>
        </div>
        <div class="form-group">
          <label for="content">Message</label>
          <textarea class="form-control textarea " v-model="content" rows="2" id="content" placeholder="Add your message here" aria-required="true" required></textarea>
        </div>
        <div class="form-group">
          <label class="sr-only" for="image" title="image" role="button">Image</label>
          <input type="file" accept=".png, .jpg, .jpeg, .gif, .webp" v-on:change="onSelect" ref="file" aria-required="true" id="image" />
        </div>
        <span class="error" v-if="(!$v.content.required && $v.content.$dirty)">Add your text and a picture</span><br><br>
        <span id="notfound" class="error"> </span>
        <button type="submit" class="btn btn-primary signup" @click="Postform()">Post</button>
      </form>
    </div>
  </main>
</template>

<script>
import axios from "axios";
import { required } from "vuelidate/lib/validators";
import VueJwtDecode from "vue-jwt-decode";

export default {
  name: "CreatePost",
  data() {
    return {
      title: "",
      file: "",
      content: "",
    };
  },
  validations: {
    title: {
      required,
    },
    content: {
      required,
    },
  },
  methods: {
    onSelect() {
      this.file = this.$refs.file.files[0];
      console.log(this.file);
    },

    Postform() {
      this.submited = true;
      this.$v.$touch();
      if (!this.$v.$invalid) {
        const token = localStorage.getItem("token");
        const userId = VueJwtDecode.decode(
          localStorage.getItem("token")
        ).userId;
        const title = document.querySelector("#title").value;
        const content = document.querySelector("#content").value;

        const formData = new FormData();
        formData.append("image", this.file);
        formData.append("title", title);
        formData.append("content", content);
        formData.append("user_id", userId);

        if (token) {
          axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        } else {
          axios.defaults.headers.common["Authorization"] = null;
          this.$router.push("/");
        }

        axios
          .post(this.$localhost + "api/post/create", formData, {
            headers: {
              Authorization: "bearer " + token,
            },
          })
          .then((res) => {
            if (res) {
              window.location.reload();
            }
          })
          .catch((error) => {
            console.log(error);
            document.getElementById("notfound").innerHTML =
              "Error : Server cannot save your post";
          });
      }
    },
  },
};
</script>
<style scoped>
#post {
  text-align: left;
}
.error {
  color: red;
}
</style>