<template>
  <div :class="chatContainer">
    <div class="flex">
      <div :class="messageSection">
        {{ message.content }}
      </div>
      <div :class="extraInfoSection">
        <div class="text-xs text-gray-500">
          {{ message.read ? "既読" : "未読" }}
        </div>
        <div class="text-xs text-gray-500">{{ hhmm(message.sentAt) }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Message } from "@/models/message";
import { defineComponent } from "vue";
import { hhmm } from "@/utils/datetime";

const myChatContainer = "w-5/6 ml-auto mx-4 my-4";
const theirChatContainer = "w-5/6 mr-auto mx-4 my-4";
const myMessageSection =
  "bg-green-300 inline-block p-2 rounded-lg order-last whitespace-pre-line";
const theirMessageSection =
  "bg-gray-300 inline-block p-2 rounded-lg whitespace-pre-line";
const myExtraInfoSection = "pr-2 mt-auto ml-auto";
const theirExtraInfoSection = "pl-2 mt-auto mr-auto";

const userId = "sample_user_id";

export default defineComponent({
  name: "ChatMessage",
  data() {
    return {};
  },
  props: {
    message: Message,
  },
  methods: {
    hhmm,
  },
  computed: {
    chatContainer(): string {
      return this.$props.message?.sender === userId
        ? myChatContainer
        : theirChatContainer;
    },
    messageSection(): string {
      return this.$props.message?.sender === userId
        ? myMessageSection
        : theirMessageSection;
    },
    extraInfoSection(): string {
      return this.$props.message?.sender === userId
        ? myExtraInfoSection
        : theirExtraInfoSection;
    },
  },
});
</script>
