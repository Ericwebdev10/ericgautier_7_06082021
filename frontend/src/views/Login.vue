<template>
  <main id="app">
    <h1>Welcome to Groupomania social network</h1>
    <form class="px-4 py-3 signin">
      <span id="notfound" class="error"> </span>
      <div class="form-group">
        <label for="email">Email</label>
        <input
          type="email"
          class="form-control"
          v-model="email"
          id="email"
          placeholder="email@gmail.com"
          aria-required="true"
          required
        /><br />
        <span class="error" v-if="!$v.email.required && $v.email.$dirty"
          >Enter a valid email</span
        >
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
      <button
        type="submit"
        class="btn btn-primary signup"
        v-on:click="loginUser()"
      >
        Login</button
      ><br />
    </form>

    <p class="dropdown-item">Not registered yet? Create your account here !</p>
    <router-link class="btn btn-primary" to="/Signup">Subscribe</router-link>

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
  name: "Login",
  components: {
    Footer,
  },
  data() {
    return {
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

        return containsUppercase && containsLowercase && containsNumber;
      },
      minLength: minLength(8),
      maxLength: maxLength(19),
    },
  },
  methods: {
    loginUser() {
      this.submited = true;
      this.$v.$touch();
      if (!this.$v.$invalid) {
        const email = document.querySelector("#email").value;
        const password = document.querySelector("#password").value;
        const user = {
          email: email,
          password: password,
        };

        axios
          .post(this.$localhost + "api/auth/login", user, {
            header: {
              "Content-Type": "application/json",
            },
          })
          .then((res) => {
            localStorage.setItem("token", res.data.token);
            this.$router.push("/Home");
          })
          .catch((error) => {
            console.log(error);
            document.getElementById("notfound").innerHTML = "User not found";
          });
      } else {
        document.getElementById("notfound").innerHTML = "User not found";
      }
    },
  },
};
</script>

<style scoped>
#app {
  text-align: center;
}
.signin {
  width: 50%;
  margin: 70px auto auto auto;
}
.signup {
  margin-bottom: 40px;
}

.error {
  color: red;
  font-size: 2em;
}
@media (max-width: 1024px) {
  .signin {
    width: 100%;
    margin: 0;
  }
}
@media (max-width: 1024px) {
  h1 {
    font-size: 1.6em;
  }
}
</style>