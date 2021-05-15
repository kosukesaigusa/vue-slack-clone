import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyAU6LNmfMm1HFBUbFXkL0TPNaq30zhJFes",
  authDomain: "vue-slack-clone-tutorial.firebaseapp.com",
  projectId: "vue-slack-clone-tutorial",
  storageBucket: "vue-slack-clone-tutorial.appspot.com",
  messagingSenderId: "952125196351",
  appId: "1:952125196351:web:0076b77a0db21a3b6dd08a",
  measurementId: "G-4GLMSB0P6L",
};
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
interface Job {
  id: string;
  farmerName: string;
  postedAt: firebase.firestore.Timestamp;
  prefecture: string;
  city: string;
}

export const jobsCollection = db.collection("jobs");
export const getJobs = async (): Promise<firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData> | null> => {
  const jobSnapshot = await jobsCollection.get();
  return jobSnapshot.empty ? jobSnapshot : null;
};
