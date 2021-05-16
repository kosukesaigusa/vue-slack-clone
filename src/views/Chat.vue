<template>
  <div class="flex-grow mb-20">
    <div class="flex mb-2">
      <div class="pr-2">
        <ChevronLeftIcon class="h-7 w-7" />
      </div>
      <h1 class="text-lg font-bold">
        {{ chatRoomName }}
      </h1>
    </div>
    <div class="chats">
      <chat-message
        v-for="(message, index) in reverse(messages)"
        :key="index"
        :message="message"
      />
    </div>
  </div>
  <div class="flex justify-between fixed w-full left-0 bottom-0 bg-gray-300">
    <textarea
      class="flex-grow my-2 mx-4 py-2 px-4 rounded-xl border-gray-300 bg-gray-200"
      rows="1"
      placeholder="Message..."
    ></textarea>
    <PaperAirplaneIcon class="h-6 w-6 my-auto mr-4" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { ChevronLeftIcon, PaperAirplaneIcon } from "@heroicons/vue/solid";
import ChatMessage from "@/components/ChatMessage.vue";
import { messagesCollection } from "@/firebase";
import { Message, messageConverter } from "@/models/message";

interface DataType {
  chatRoomName: string;
  messages: Message[];
}

export default defineComponent({
  name: "Chat",
  components: { ChevronLeftIcon, PaperAirplaneIcon, ChatMessage },
  data() {
    return {
      chatRoomName: "MOTTAI ファーム",
      messages: [],
    } as DataType;
  },
  methods: {
    async listenMessages() {
      messagesCollection("SqEjmLUDy7bbz3VT1Xa0")
        .orderBy("sent_at", "desc")
        .limit(30)
        .onSnapshot((snapshot) => {
          this.messages = snapshot.docs.map((doc) => {
            const message = messageConverter.fromFirestore(doc);
            return message;
          });
        });
    },
    reverse(messages: Message[]) {
      return messages.slice().reverse();
    },
  },
  async created() {
    this.listenMessages();
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
