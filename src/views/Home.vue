<template>
  <div class="home">
    <!-- <div class="bg-white rounded-xl shadow-md overflow-hidden mb-8">
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
        <div class="flex">
          <div class="pr-1">
            <LocationMarkerIcon class="h-6 w-6 fill-green" />
          </div>
          <div class="text-gray-500">神奈川県小田原市</div>
        </div>
      </div>
    </div> -->
    <!-- <ul>
      <li v-for="(job, index) in jobs" :key="index">{{ job.farmerName }}</li>
    </ul> -->
    <div
      class="bg-white rounded-xl shadow-md overflow-hidden mb-8"
      v-for="(job, index) in jobs"
      :key="index"
    >
      <div class="">
        <img
          class="h-48 w-full object-cover"
          src="https://www.furusato-web.jp/wordpress/wp-content/uploads/2019/09/shimokawa7.jpg"
          alt="title"
        />
      </div>
      <div class="p-4">
        <div class="text-lg font-bold pb-1">{{ job.farmerName }}</div>
        <div class="text-sm text-gray-500 pb-1">
          掲載日：{{ job.postedAt }} (木)
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
import { getJobs } from "@/firebase";

interface DataType {
  jobs: Job[];
}

export default defineComponent({
  components: { LocationMarkerIcon },
  name: "Home",
  data() {
    return { jobs: [] } as DataType;
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
