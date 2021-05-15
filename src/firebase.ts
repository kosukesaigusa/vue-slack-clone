import firebase from "firebase";
import firebaseConfig from "./firebase_config.json";

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
  const jobSnapshot = await jobsCollection.orderBy("posted_at", "desc").get();
  return jobSnapshot.empty ? null : jobSnapshot;
};
