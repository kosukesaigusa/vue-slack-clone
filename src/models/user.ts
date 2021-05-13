import firebase from "firebase";

export interface FirestoreUserData {
  user_id: string;
  user_name: string;
  created_at: firebase.firestore.Timestamp;
}

export class User {
  userId = "";
  userName = "";
  createdAt;

  constructor(
    userId: string,
    userName: string,
    createdAt: firebase.firestore.Timestamp
  ) {
    this.userId = userId;
    this.userName = userName;
    this.createdAt = createdAt;
  }
}

export const userConverter = {
  toFirestore: function (user: User): firebase.firestore.DocumentData {
    return {
      user_id: user.userId,
      user_name: user.userName,
      created_at: user.createdAt as firebase.firestore.Timestamp,
    };
  },
  fromFirestore: function (
    snapshot: firebase.firestore.QueryDocumentSnapshot
  ): User {
    const data = snapshot.data();
    return new User(data.userId, data.userName, data.createdAt);
  },
};
