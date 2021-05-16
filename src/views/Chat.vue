<template>
  <div class="flex-grow mb-20">
    <div class="flex mb-2">
      <div class="pr-2">
        <ChevronLeftIcon class="h-6 w-6" />
      </div>
      <h1>{{ chatRoomName }}</h1>
    </div>
    <div class="chats">
      <div class="chat-container w-3/4 ml-auto">
        <div class="bg-green-300 inline-block mx-4 p-2 rounded-lg">
          こんにちは！MOTTAI
          ファームさんのお仕事のお手伝いに興味があります。お話をお聞かせいただけませんか？
        </div>
        <div>10:58</div>
      </div>
      <div class="chat-container w-3/4 mr-auto">
        <div class="bg-gray-300 inline-block mx-4 my-2 p-2 rounded-lg">
          ご連絡ありがとうございます。
        </div>
      </div>
      <div class="chat-container w-3/4 mr-auto">
        <div class="bg-gray-300 inline-block mx-4 my-2 p-2 rounded-lg">
          5/30 (土) 13:00〜17:00
          でのみかんの収穫作業をお願いしたいのですが、ご都合はいかがですか？
        </div>
      </div>
    </div>
  </div>
  <div class="flex justify-between fixed w-full left-0 bottom-0 bg-gray-300">
    <textarea
      class="flex-grow my-2 mx-4 py-2 px-4 rounded-xl border-gray-300 bg-gray-200 resize-none"
      rows="1"
      placeholder="Message..."
    ></textarea>
    <PaperAirplaneIcon class="h-6 w-6 my-auto mr-4" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { ChevronLeftIcon, PaperAirplaneIcon } from "@heroicons/vue/solid";
import firebase from "firebase";

interface DataType {
  chatRoomName: string;
}

export default defineComponent({
  name: "Chat",
  components: { ChevronLeftIcon, PaperAirplaneIcon },
  data() {
    return {
      chatRoomName: "MOTTAI ファーム",
    } as DataType;
  },
  methods: {
    // async loadUsers() {
    //   usersCollection.orderBy("created_at", "desc").onSnapshot((snapshot) => {
    //     this.users = snapshot.docs.map((doc) => {
    //       return {
    //         userId: doc.id,
    //         userName: doc.data().user_name,
    //         createdAt: doc.data().created_at,
    //       };
    //     });
    //   });
    // },
  },
  async created(): Promise<void> {
    // this.loadUsers();
  },
  mounted() {
    const title = "チャット";
    const description = "チャット画面の練習";
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
