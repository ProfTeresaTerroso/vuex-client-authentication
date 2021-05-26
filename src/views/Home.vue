// This is a public page

<template>
  <div class="container">
    <header class="jumbotron">
      <h3>{{ content }}</h3>
    </header>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Home",
  data() {
    return {
      content: "",
    };
  },
  computed: {
    ...mapGetters(["getMessage"]),
  },
  methods: {
    async getPublicContent() {
      try {
        await this.$store.dispatch("getAPIRoot");
      } catch (error) {
        console.log(error);
        this.content =
          (error.response && error.response.data) ||  error.message || error.toString();
      } finally {
        // calls getter getMessage and result is put inside content component data
        this.content = this.getMessage;
      }
    }
  },
  mounted() {
    this.getPublicContent();
  },
};
</script>