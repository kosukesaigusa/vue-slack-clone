// functions ディレクトリ下で
// `npm run admin-script` を実行する

import * as admin from "firebase-admin";
import * as serviceAccountKey from "../../service_account_key.json";
import * as jobs from "./data/jobs.json";

const serviceAccount = {
  type: serviceAccountKey.type,
  projectId: serviceAccountKey.project_id,
  privateKeyId: serviceAccountKey.private_key_id,
  privateKey: serviceAccountKey.private_key.replace(/\\n/g, "\n"),
  clientEmail: serviceAccountKey.client_email,
  clientId: serviceAccountKey.client_id,
  authUri: serviceAccountKey.auth_uri,
  tokenUri: serviceAccountKey.token_uri,
  authProviderX509CertUrl: serviceAccountKey.auth_provider_x509_cert_url,
  clientX509CertUrl: serviceAccountKey.client_x509_cert_url,
};

// Firebase Admin SDK の初期化
// https://firebase.google.com/docs/functions/config-env?hl=ja
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: `https://${serviceAccount.projectId}.firebaseio.com`,
});

const jobsCollection = admin.firestore().collection("jobs");

// jobs コレクションにシードデータのドキュメントを投入
async function main(): Promise<void> {
  for (const job of jobs) {
    await jobsCollection.add({
      image_url: job.image_url,
      farmer_name: job.farmer_name,
      description: job.description,
      posted_at: new Date(job.posted_at),
      prefecture: job.prefecture,
      city: job.city,
    });
  }
}

main();
