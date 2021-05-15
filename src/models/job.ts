import firebase from "firebase";

export interface FirestoreJobData {
  image_url: string;
  farmer_name: string;
  description: string;
  posted_at: firebase.firestore.Timestamp;
  prefecture: string;
  city: string;
}

export class Job {
  imageUrl = "";
  farmerName = "";
  description = "";
  postedAt;
  prefecture = "";
  city = "";

  constructor(
    imageUrl: string,
    farmerName: string,
    description: string,
    postedAt: Date,
    prefecture: string,
    city: string
  ) {
    this.imageUrl = imageUrl;
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
      image_url: job.imageUrl,
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
      data.image_url,
      data.farmer_name,
      data.description,
      data.posted_at.toDate(),
      data.prefecture,
      data.city
    );
  },
};
