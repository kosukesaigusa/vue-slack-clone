import firebase from "firebase";
import firebaseConfig from "./firebase_config.json";
import { Message, messageConverter } from "@/models/message";

const firebaseApp = firebase.initializeApp(firebaseConfig);
export const db = firebaseApp.firestore();

// ========================
// User
// ========================
interface User {
  id: string;
  userName: string;
}

export const usersCollection = db.collection("users");

export const createUser = (
  user: User
): Promise<
  firebase.firestore.DocumentReference<firebase.firestore.DocumentData>
> => {
  return usersCollection.add(user);
};

export const getUser = async (
  id: string
): Promise<firebase.firestore.DocumentData | undefined | null> => {
  const user = await usersCollection.doc(id).get();
  return user.exists ? user.data() : null;
};

// ========================
// Job
// ========================
export const jobsCollection = db.collection("jobs");
export const getJobs = async (): Promise<firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData> | null> => {
  const jobSnapshot = await jobsCollection.orderBy("posted_at", "desc").get();
  return jobSnapshot.empty ? null : jobSnapshot;
};

// ========================
// Chats/Messages
// ========================
export const chatsCollection = db.collection("chats");
export const messagesCollection = (
  chatId: string
): firebase.firestore.CollectionReference => {
  return chatsCollection.doc(chatId).collection("messages");
};

export const createMessage = (
  chatId: string,
  message: Message
): Promise<
  firebase.firestore.DocumentReference<firebase.firestore.DocumentData>
> => {
  const data = messageConverter.toFirestore(message);
  return messagesCollection(chatId).add(data);
};

// export const listenMessages = async (chatId: string): Promise<Message[]> => {
//   let messages: Message[] = [];
//   const close = messagesCollection(chatId)
//     .limit(30)
//     .orderBy("sent_at", "desc")
//     .onSnapshot((snapshot) => {
//       messages = snapshot.docs.map((doc) => {
//         return messageConverter.fromFirestore(doc);
//       });
//     });
//   onUnmounted(close);
//   return messages;
// };
