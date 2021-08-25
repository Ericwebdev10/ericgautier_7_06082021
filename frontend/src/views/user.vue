<template>
  <div class="Profil">
    <h1>Groupomania social network</h1>
    <Nav />
    <div class="mx-auto">

      <div v-for="(user,idx) in users" :key="idx">

        <div class="card card-product mx-auto">

          <div class="card-body product-body">
            <h2 class="card-title name">{{user.username}}</h2>

            <div class="dropdown-divider"></div>
            <div class="mt-5">

              <div class="form-group">
                <label for="email">Changer mon Adresse Email</label>
                <input type="email" class="form-control" v-model="email" id="email" placeholder="email@example.com" required /><br>
                <span class="error" v-if="(!$v.email.required && $v.email.$dirty)">Veuillez ajouter un email valide</span>
              </div>

              <div class="form-group">
                <label for="password">Changer mon Mot de passe</label>
                <input type="password" class="form-control" v-model="password" id="password" placeholder="Password" required /><br>
                <span class="error" v-if="(!$v.password.required && $v.password.$dirty )">Mot de passe requis : 8 caractères minimun. Au moins 1 Majuscule, 1 minuscule. Sans espaces et 1 chiffres </span>
                <span class="error" v-if="(!$v.password.valid && !$v.password.minLength )">Mot de passe requis : 8 caractères minimun. Au moins 1 Majuscule, 1 minuscule. Sans espaces et 1 chiffres </span>
              </div>
            </div>
            <button class="btn btn-danger mr-5 mt-2" v-if="userId == user.id || admin == 1" @click="updateUser()">modifier mon compte</button>
            <button class="btn btn-danger mt-2" v-if="userId == user.id || admin == 1" @click="deleteuser()">Supprimer mon compte</button>

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
import VueJwtDecode from "vue-jwt-decode";

import {
  required,
  email,
  minLength,
  maxLength,
} from "vuelidate/lib/validators";

export default {
  name: "user",
  components: {
    Nav,

    Footer,
  },
  data() {
    return {
      users: [],
      userId: "",
      isAdmin: 0,
      email: "",
      password: "",
    };
  },
  validations: {
    email: {
      required,
      email,
    },
    password: {
      required,
      valid: function (value) {
        const containsUppercase = /[A-Z]/.test(value);
        const containsLowercase = /[a-z]/.test(value);
        const containsNumber = /[0-9]/.test(value);
        const containsSpecial = /[#?!@$%^&*-]/.test(value);
        return (
          containsUppercase &&
          containsLowercase &&
          containsNumber &&
          containsSpecial
        );
      },
      minLength: minLength(9),
      maxLength: maxLength(19),
    },
  },
  mounted() {
    this.getOneUser();
    this.userId = VueJwtDecode.decode(localStorage.getItem("token")).userId;
    this.admin = VueJwtDecode.decode(localStorage.getItem("token")).isAdmin;
  },
  methods: {
    getOneUser() {
      const token = localStorage.getItem("token");

      const iduser = this.$route.params.id;

      if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      } else {
        axios.defaults.headers.common["Authorization"] = null;
        this.$router.push("/");
      }

      axios
        .get(this.$localhost + "api/auth/user/" + iduser, {
          headers: {
            Authorization: "bearer " + token,
          },
        })
        .then((res) => {
          this.users = res.data;
        })
        .catch((error) => {
          console.log("Cannot get user /" + error);
        });
    },
    deleteuser() {
      const token = localStorage.getItem("token");
      const idUser = this.$route.params.id;

      axios
        .delete(this.$localhost + "api/auth/delete/" + idUser, {
          headers: {
            "Content-Type": "application/json",
            Authorization: "bearer " + token,
          },
        })
        .then((res) => {
          if (res) {
            localStorage.clear();
            this.$router.push("../Signup");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    updateUser() {
      this.submited = true;
      this.$v.$touch();
      if (!this.$v.$invalid) {
        const token = localStorage.getItem("token");
        const idUser = this.$route.params.id;
        const email = document.querySelector("#email").value;
        const password = document.querySelector("#password").value;

        let users = {
          email: email,
          password: password,
        };

        axios
          .post(this.$localhost + "api/auth/update/" + idUser, users, {
            headers: {
              "Content-Type": "application/json",
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
  },
};
</script>
<style scoped>
h1 {
  text-align: center;
  font-size: 18px;
}

.card-product {
  display: flex;
  border-radius: 20px 20px;
  width: 60%;
}

.name {
  color: #fd2d01;
}
.userinfo {
  margin-right: 15px;
}
h1 {
  text-align: center;
  font-size: 18px;
}
.error {
  color: red;
}
@media (min-width: 320px) and (max-width: 1600px) {
  .card-product {
    margin: 80px auto auto auto;
    flex-direction: column;
    border-radius: 20px 20px;
    width: 80%;
  }
}
</style>