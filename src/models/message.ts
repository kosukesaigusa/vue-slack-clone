import firebase from "firebase";

export interface FirestoreMessageData {
  content: string;
  sent_at: firebase.firestore.Timestamp;
  sender: string;
  read: boolean;
}

export class Message {
  content = "";
  sentAt;
  sender = "";
  read = false;

  constructor(content: string, sentAt: Date, sender: string, read: boolean) {
    this.content = content;
    this.sentAt = sentAt;
    this.sender = sender;
    this.read = read;
  }
}

export const messageConverter = {
  toFirestore: function (message: Message): firebase.firestore.DocumentData {
    return {
      content: message.content,
      sent_at: message.sentAt,
      sender: message.sender,
      read: message.read,
    };
  },
  fromFirestore: function (
    snapshot: firebase.firestore.QueryDocumentSnapshot
  ): Message {
    const data = snapshot.data();
    return new Message(
      data.content.replace(/\\n/g, "\n"),
      data.sent_at.toDate(),
      data.sender,
      data.read
    );
  },
};
