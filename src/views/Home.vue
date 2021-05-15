<template>
  <div class="home">
    <div class="pb-4">
      <button :class="tokyoButtonCSS" @click="toggleTokyo">東京</button>
      <button :class="kanagawaButtonCSS" @click="toggleKanagawa">神奈川</button>
    </div>
    <div
      class="bg-white rounded-xl shadow-md overflow-hidden mb-8"
      v-for="(job, index) in jobs"
      :key="index"
    >
      <div class="">
        <img class="h-48 w-full object-cover" :src="job.imageUrl" alt="title" />
      </div>
      <div class="p-4">
        <div class="text-lg font-bold pb-1">{{ job.farmerName }}</div>
        <div class="text-sm text-gray-500 pb-1">
          掲載日：{{ formatDate(job.postedAt) }} ({{
            japaneseDayOfWeek(job.postedAt)
          }})
        </div>
        <p class="text-gray-500">
          {{ job.description }}
        </p>
        <div class="flex">
          <div class="pr-1">
            <LocationMarkerIcon class="h-6 w-6 fill-green" />
          </div>
          <div class="text-gray-500">{{ job.prefecture }}{{ job.city }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { LocationMarkerIcon } from "@heroicons/vue/solid";
import { Job, jobConverter } from "@/models/job";
import { getJobs, jobsCollection } from "@/firebase";
import { japaneseDayOfWeek, formatDate } from "@/utils/datetime";

interface DataType {
  jobs: Job[];
  tokyo: boolean;
  kanagawa: boolean;
  tokyoButtonCSS: string;
  kanagawaButtonCSS: string;
}

const selectedButtonCSS =
  "bg-blue-500 text-white font-bold py-1 px-2 mr-2 rounded-full";
const unselectedButtonCSS =
  "bg-transparent text-blue-700 font-semibold py-1 px-2 mr-2 border border-blue-500 rounded-full";

export default defineComponent({
  components: { LocationMarkerIcon },
  name: "Home",
  data() {
    return {
      jobs: [],
      tokyo: false,
      kanagawa: false,
      tokyoButtonCSS: unselectedButtonCSS,
      kanagawaButtonCSS: unselectedButtonCSS,
    } as DataType;
  },
  methods: {
    japaneseDayOfWeek,
    formatDate,
    toggleTokyo(): void {
      this.tokyo = !this.tokyo;
      this.tokyoButtonCSS = this.tokyo
        ? selectedButtonCSS
        : unselectedButtonCSS;
      this.filter();
    },
    toggleKanagawa(): void {
      this.kanagawa = !this.kanagawa;
      this.kanagawaButtonCSS = this.kanagawa
        ? selectedButtonCSS
        : unselectedButtonCSS;
      this.filter();
    },
    async filter(): Promise<void> {
      this.jobs = [];
      let query = jobsCollection.limit(30);
      if (this.tokyo) {
        query = query.where("prefecture", "==", "東京都");
      }
      if (this.kanagawa) {
        query = query.where("prefecture", "==", "神奈川県");
      }

      const jobSnapshot = await query.get();
      jobSnapshot?.docs.map((doc) => {
        this.jobs.push(jobConverter.fromFirestore(doc));
      });
    },
  },
  async created(): Promise<void> {
    this.jobs = [];
    const jobSnapshot = await getJobs();
    jobSnapshot?.docs.map((doc) => {
      this.jobs.push(jobConverter.fromFirestore(doc));
    });
  },
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
