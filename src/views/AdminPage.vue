// AdminPage page fetchs a list of all users (ADMIN route)

<template>
  <!-- <div class="container">
    <header class="jumbotron">
      <h3>{{ content }}</h3>
    </header>
  </div> -->
  <div class="list row">
    <div v-if="loading"><h4>Loading...</h4></div>
    <div v-else class="col-md-4">
      <h4>Users List</h4>
      <ul class="list-group">
        <li class="list-group-item" v-for="(user, index) in users" :key="index">
          {{ user.username }}
        </li>
      </ul>
    </div>
    <div v-if="message" class="alert alert-danger" role="alert">
      {{ message }}
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "User",
  data() {
    return {
      message: "",
      loading: false,
      users: [],
    };
  },
  computed: {
    ...mapGetters(["getMessage", "getUsers"]),
  },
  methods: {
    async getUsersList() {
      this.loading = true;
      // console.log("AdminPage - GET USERS started...");
      try {
        await this.$store.dispatch("getAllUsers");
        // console.log("AdminPage - GET USERS: " + this.$store.getters.getUsers.length);
        this.users = this.getUsers;
      } catch (error) {
        // console.log(error);
        this.message =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();
      } finally {
        this.loading = false;
      }
    },
  },
  mounted() {
    this.getUsersList();
  },
};
</script>