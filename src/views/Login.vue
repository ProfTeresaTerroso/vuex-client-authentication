// Login Page.
// For form submission, dispatch 'login' Vuex Action

<template>
  <div class="col-md-12">
    <div class="card card-container">
      <img
        id="profile-img"
        src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
        class="profile-img-card"
      />
      <form name="form" @submit.prevent="handleLogin">
        <div class="form-group">
          <label for="username">Username</label>
          <input
            v-model="user.username"
            type="text"
            class="form-control"
            name="username"
          />
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input
            v-model="user.password"
            type="password"
            class="form-control"
            name="password"
            autocomplete="off"
          />
        </div>
        <div class="form-group">
          <button class="btn btn-primary btn-block" :disabled="loading">
            <span
              v-show="loading"
              class="spinner-border spinner-border-sm"
            ></span>
            <span>Login</span>
          </button>
        </div>

        <div class="form-group">
          <div 
            v-if="message" 
            class="alert alert-danger" 
            role="alert">
            {{ message }}
          </div>
        </div>
   
        <p v-if="errors.length">
          <b>Please correct the following error(s):</b>
          <ul>
            <li v-for="(error, index)  in errors" :key="index">{{ error }}</li>
          </ul>
        </p>

      </form>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

// To make code clear and easy to read, define User model
class User {
  constructor(username, password) {
    this.username = username;
    this.password = password;
  }
}

export default {
  name: "Login",

  data() {
    return {
      user: new User("", "", ""),
      loading: false,
      message: "",
      errors: [],
    };
  },

  computed: {
    //check user logged in status using Vuex Store
    ...mapGetters(["getMessage", "getLoggedIn", "getLoggedUser"]),
  },
  methods: {
    //dispatch 'login' Action to Vuex Store
    async handleLogin() {
      this.loading = true;
      this.errors = [];
      if (this.user.username && this.user.password) {
        //makes request by dispatching an action
        try {
          await this.$store.dispatch("login", this.user);
          // console.log("LOGIN: AFTER AWAIT: " + this.getLoggedIn);

          // if successfull login, navigate to pages corresponding to logged user role
          if (this.$store.getters.getLoggedUser.role == "ADMIN")
            this.$router.push("/admin");
          else 
            this.$router.push("/user");
        } catch (error) {
          // console.log("LOGIN: ERROR: " + this.getLoggedIn);
          this.message =
            (error.response && error.response.data) ||
            error.message ||
            error.toString();
        } finally {
          this.loading = false;
        }
      } else {
        this.loading = false;
        if (!this.user.username) {
          this.errors.push("Username required.");
        }
        if (!this.user.password) {
          this.errors.push("Password required.");
        }
      }
    },
  },
};
</script>

<style scoped>
label {
  display: block;
  margin-top: 10px;
}

.card-container.card {
  max-width: 350px !important;
  padding: 40px 40px;
}

.card {
  background-color: #f7f7f7;
  padding: 20px 25px 30px;
  margin: 0 auto 25px;
  margin-top: 50px;
  -moz-border-radius: 2px;
  -webkit-border-radius: 2px;
  border-radius: 2px;
  -moz-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  -webkit-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
}

.profile-img-card {
  width: 96px;
  height: 96px;
  margin: 0 auto 10px;
  display: block;
  -moz-border-radius: 50%;
  -webkit-border-radius: 50%;
  border-radius: 50%;
}
</style>