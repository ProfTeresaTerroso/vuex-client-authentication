// root container for this application that contains navigation bar
<template>
  <div id="app">
    <nav class="navbar navbar-expand navbar-dark bg-dark">
      <a href class="navbar-brand" @click.prevent>VueX Client</a>
      <div class="navbar-nav mr-auto">
        <li class="nav-item">
          <router-link to="/home" class="nav-link">
            <font-awesome-icon icon="home" />Home
          </router-link>
        </li>
        <!-- <li v-if="showAdminBoard" class="nav-item"> -->
        <li v-if="loggedUser" class="nav-item">
          <router-link to="/admin" class="nav-link">Admin Page</router-link>
        </li>
        <li v-if="loggedUser" class="nav-item">
          <router-link to="/user" class="nav-link">User Page</router-link>
        </li>
      </div>

      <div v-if="!loggedUser" class="navbar-nav ml-auto">
        <li class="nav-item">
          <router-link to="/register" class="nav-link">
            <font-awesome-icon icon="user-plus" />Sign Up
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/login" class="nav-link">
            <font-awesome-icon icon="sign-in-alt" />Login
          </router-link>
        </li>
      </div>

      <div v-if="loggedUser" class="navbar-nav ml-auto">
        <li class="nav-item">
          <a class="nav-link" href @click.prevent="logOut">
            <font-awesome-icon icon="sign-out-alt" />LogOut
          </a>
        </li>
      </div>
    </nav>

    <div class="container">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  // computed properties
  computed: {
    loggedUser: function () {
      // console.log(
      //   "APP loggedUser user ($store.state.loggedUser)?  " +
      //     this.$store.state.loggedUser
      // );
      // console.log(
      //   "APP loggedUser user ($store.getters.getLoggedUser)?  " +
      //     this.$store.getters.getLoggedUser
      // );
      // return this.$store.state.auth.user;
      return this.$store.getters.getLoggedUser;
    },

    showAdminBoard: function () {
      // console.log("APP showAdminBoard? " + this.loggedUser);
      if (this.loggedUser && this.loggedUser.role) {
        return this.loggedUser.role === "ADMIN";
      }
      return false;
    },
  },
  methods: {
    logOut() {
      //dispatches logout action from store ( removes localstorage data from logged user and commits mutation logout)
      this.$store.dispatch("logout");
      this.$router.push("/login");
    },
  },
};
</script>
