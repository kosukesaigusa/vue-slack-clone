<template>
  <div class="home">
    <div class="bg-white rounded-xl shadow-md overflow-hidden">
      <div class="">
        <img
          class="h-48 w-full object-cover"
          src="https://www.furusato-web.jp/wordpress/wp-content/uploads/2019/09/shimokawa7.jpg"
          alt="title"
        />
      </div>
      <div class="p-4">
        <div class="text-lg font-bold pb-1">MOTTAI ファーム</div>
        <div class="text-sm text-gray-500 pb-1">掲載日：2021-05-13 (木)</div>
        <p class="text-gray-500">
          MOTTAI
          ファームは神奈川県小田原にある、家族経営の小さな農家です。現在、みかんの収穫を手伝ってくれる方を募集しています。お礼に収穫したばかりのみかんと自家製みかんジャムをお渡ししています。私たちと一緒にみかんの収穫を...
        </p>
        <div class="pt-2">
          <button
            class="py-1 px-2 bg-transparent hover:bg-gray-500 hover:text-white border rounded"
          >
            詳しく見る
          </button>
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
