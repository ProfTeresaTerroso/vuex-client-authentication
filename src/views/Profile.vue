// This page gets current User from Vuex Store and show information. 
// If the User is not logged in, it directs to Login Page
<template>
  <div class="container">
    <header class="jumbotron">
      <h3>
        <strong>{{ loggedUser.username }}</strong> Profile
      </h3>
    </header>
    
    <p>
      <strong>Id:</strong>
      {{ loggedUser.id }}
    </p>
    <p>
      <strong>Email:</strong>
      {{ loggedUser.email }}
    </p>
    <p>
      <strong>Password:</strong>
      {{ loggedUser.password }}
    </p>
    <p>
      <strong>Role:</strong>
      {{ loggedUser.role }}
    </p>
    <p>
      <strong>Token:</strong>
      {{ loggedUser.accessToken.substring(0, 20) }} ...
      {{ loggedUser.accessToken.substr(loggedUser.accessToken.length - 20) }}
    </p>
  </div>
</template>

<script>
export default {
  name: "Profile",
  computed: {
    loggedUser() {
      //check user logged using Vuex Store!
      return this.$store.getters.getLoggedUser;
    },
  },
 
};
</script>