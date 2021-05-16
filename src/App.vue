<template>
  <div class="container flex flex-col min-h-screen px-4 bg-gray-100">
    <nav-bar />
    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import NavBar from "@/components/NavBar.vue";

export default defineComponent({
  components: {
    "nav-bar": NavBar,
  },
});
</script>

<style>
* {
  color: #222222;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

.container {
  margin: 0 auto;
  min-height: 100vh;
}
</style>
