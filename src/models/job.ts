import firebase from "firebase";

export interface FirestoreJobData {
  farmer_name: string;
  description: string;
  posted_at: firebase.firestore.Timestamp;
  prefecture: string;
  city: string;
}

export class Job {
  farmerName = "";
  description = "";
  postedAt;
  prefecture = "";
  city = "";

  constructor(
    farmerName: string,
    description: string,
    postedAt: firebase.firestore.Timestamp,
    prefecture: string,
    city: string
  ) {
    this.farmerName = farmerName;
    this.description = description;
    this.postedAt = postedAt;
    this.prefecture = prefecture;
    this.city = city;
  }
}

export const jobConverter = {
  toFirestore: function (job: Job): firebase.firestore.DocumentData {
    return {
      farmer_name: job.farmerName,
      description: job.description,
      posted_at: job.postedAt,
      prefecture: job.prefecture,
      city: job.city,
    };
  },
  fromFirestore: function (
    snapshot: firebase.firestore.QueryDocumentSnapshot
  ): Job {
    const data = snapshot.data();
    return new Job(
      data.farmer_name,
      data.description,
      data.posted_at,
      data.prefecture,
      data.city
    );
  },
};
