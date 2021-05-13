<template>
  <div>
    <nav id="nav" class="flex my-4 pl-4">
      <div class="my-auto">
        <ul class="flex">
          <li class="p-4"><router-link to="/">Home</router-link></li>
          <li class="p-4"><router-link to="/chat">Chat</router-link></li>
          <li class="p-4"><router-link to="/about">About</router-link></li>
        </ul>
      </div>
    </nav>
  </div>
  <div class="container px-4">
    <router-view />
  </div>
</template>

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
}
</style>
