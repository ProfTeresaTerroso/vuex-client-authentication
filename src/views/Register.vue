// This page is similar to Login Page.
// For form submission, dispatch 'register' Vuex Action

<template>
  <div class="col-md-12">
    <div class="card card-container">
      <img
        id="profile-img"
        src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
        class="profile-img-card"
      />
      <form name="form" @submit.prevent="handleRegister">
        <div v-if="!successful">
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
            <label for="email">Email</label>
            <input
              v-model="user.email"
              type="email"
              class="form-control"
              name="email"
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
              <span>Sign Up</span>
            </button>
          </div>
        </div>
      </form>

      <div
        v-if="message"
        class="alert"
        :class="successful ? 'alert-success' : 'alert-danger'"
      >
        {{ message }}
      </div>

     
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

// to make code clear and easy to read, define User model
class User {
  constructor(username, email, password) {
    this.username = username;
    this.email = email;
    this.password = password;
  }
}

export default {
  name: "Register",
  data() {
    return {
      user: new User(null, null, null),
      successful: false,
      message: "",
      loading: false,
      errors: []
    };
  },
  computed: {
    ...mapGetters(["getMessage", "getLoggedIn"]),
  },

  methods: {
    //dispatch 'register' Action to Vuex Store
    async handleRegister() {
      this.message = "";
      this.loading = true;
      this.successful = false;
       this.errors = [];
      if (this.user.username && this.user.password) {
            //makes request by dispatching an action
      try {
        await this.$store.dispatch("register", this.user);
        // console.log("REGISTER OK");
        this.message = this.$store.getters.getMessage;
        this.successful = true;
      } catch (error) {
        console.log(error)
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