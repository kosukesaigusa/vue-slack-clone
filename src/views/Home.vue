<template>
  <div class="home">
    <div class="bg-white rounded-xl shadow-md overflow-hidden">
      <div class="md:flex-shrink-0">
        <img class="h-48 w-full object-cover" src="/" alt="title" />
      </div>
      <div class="p-4">
        <div class="tracking-wide text-sm font-semibold"></div>
        <p class="mt-2 text-gray-500"></p>
        <div class="pt-2">
          <button
            class="py-1 px-2 bg-transparent hover:bg-gray-500 hover:text-white border rounded"
          ></button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Home",
  data() {
    return {};
  },
  methods: {},
  mounted() {
    const title = "案件一覧";
    const description = "案件一覧画面の練習";
    document.title = title;
    document
      ?.querySelector("meta[property='og:title']")
      ?.setAttribute("content", title);
    document
      ?.querySelector("meta[name='description']")
      ?.setAttribute("content", description);
    document
      ?.querySelector("meta[property='og:description']")
      ?.setAttribute("content", description);
  },
});
</script>
