<template>
  <div>
    <h1>Firebase を使った読み書き確認</h1>
    <div>
      <input v-model="userName" placeholder="ユーザー名を入力" />
      <button @click="addUser">ユーザーを追加</button>
    </div>
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>ユーザー名</th>
          <th>作成日</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="{ userId, userName, createdAt } in users" :key="userId">
          <td>{{ userId }}</td>
          <td>{{ userName }}</td>
          <td>{{ createdAt?.toDate() }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import firebase from "firebase";
import { User } from "@/models/user";
import { usersCollection } from "@/firebase";

interface DataType {
  userName: string;
  users: User[];
}

export default defineComponent({
  name: "Home",
  data() {
    return {
      userName: "",
      users: [],
    } as DataType;
  },
  methods: {
    async addUser(): Promise<void> {
      usersCollection.add({
        user_name: this.userName,
        created_at: firebase.firestore.FieldValue.serverTimestamp(),
      });
    },
    async loadUsers() {
      usersCollection.orderBy("created_at", "desc").onSnapshot((snapshot) => {
        this.users = snapshot.docs.map((doc) => {
          return {
            userId: doc.id,
            userName: doc.data().user_name,
            createdAt: doc.data().created_at,
          };
        });
      });
    },
  },
  async created(): Promise<void> {
    this.loadUsers();
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
