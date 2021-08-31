<template>
  <main id="app">
    <h1>Welcome to Groupomania social network</h1>
    <form class="px-4 py-3 signin">
      <span id="ErrorHandler" class="error"> </span>
      <div class="form-group">
        <label for="email">Email</label>
        <input
          type="email"
          class="form-control"
          v-model="email"
          id="email"
          placeholder="email@example.com"
          aria-required="true"
          required
        /><br />
        <span class="error" v-if="!$v.email.required && $v.email.$dirty"
          >Enter a valid email</span
        >
      </div>
      <div class="form-group">
        <label for="username">First name - last name</label>
        <input
          type="text"
          class="form-control"
          id="username"
          v-model="username"
          name="username"
          placeholder="John Doe"
          aria-required="true"
          required
        /><br />
        <span class="error" v-if="!$v.username.required && $v.username.$dirty"
          >Add your first name and last name
        </span>
      </div>

      <div class="form-group">
        <label for="password">Password</label>
        <input
          type="password"
          class="form-control"
          v-model="password"
          id="password"
          placeholder="Password"
          aria-required="true"
          required
        /><br />
        <span class="error" v-if="!$v.password.required && $v.password.$dirty"
          >Min length : 8, 1 uppercase, 1 lowercase. no space, 1 digit
        </span>
        <span class="error" v-if="!$v.password.valid && !$v.password.minLength"
          >Min length : 8, 1 uppercase, 1 lowercase. no space, 1 digit
        </span>
      </div>
      <!--https://vuelidate.js.org/#sub-without-v-model-->
      <button
        type="submit"
        class="btn btn-primary signup"
        @click="createUser()"
      >
        Register here
      </button>
    </form>
    <div class="dropdown-divider"></div>
    <p class="dropdown-item encouragement">
      Already have an account? connect here !
    </p>
    <router-link class="btn btn-primary" to="/">Connect</router-link>

    <Footer />
  </main>
</template>
<script>
import Footer from "@/components/Footer.vue";
import axios from "axios";
import {
  required,
  email,
  minLength,
  maxLength,
} from "vuelidate/lib/validators";

export default {
  name: "Signup",
  components: {
    Footer,
  },
  data() {
    return {
      email: "",
      username: "",
      password: "",
    };
  },
  validations: {
    email: {
      required,
      email,
    },
    username: {
      required,
    },
    password: {
      required,
      valid: function (value) {
        const containsUppercase = /[A-Z]/.test(value);
        const containsLowercase = /[a-z]/.test(value);
        const containsNumber = /[0-9]/.test(value);
        return containsUppercase && containsLowercase && containsNumber;
      },
      minLength: minLength(8),
      maxLength: maxLength(30),
    },
  },
  methods: {
    createUser() {
      this.submited = true;
      this.$v.$touch();
      if (!this.$v.$invalid) {
        const email = document.querySelector("#email").value;
        const password = document.querySelector("#password").value;
        const username = document.querySelector("#username").value;
        let users = {
          email: email,
          password: password,
          username: username,
        };
        // check all required fields
        if (users.email == "" || users.password == "" || users.username == "") {
          users = {
            userVerification: false,
          };
        } // Post new user
        axios
          .post(this.$localhost + "api/auth/signup", users)
          .then((res) => {
            console.log(res);
            this.$router.push("/Login");
          })
          .catch((error) => {
            console.log(error);
            document.getElementById("ErrorHandler").innerHTML =
              "Cannot create user / email must be unique";
            alert("Cannot create user / email must be unique");
          });
      }
    },
  },
};
</script>
<style scoped>
#app {
  text-align: center;
}
.error {
  color: red;
  font-size: 2em;
}
</style>