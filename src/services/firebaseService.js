const admin = require('firebase-admin');
const { Storage } = require('@google-cloud/storage');
const path = require('path');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

// Inisialisasi Firebase Admin SDK
const serviceAccount = require('../../serviceAccountKey.json');

try {
  // Inisialisasi Firebase Admin
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
  console.log("Firebase admin initialized successfully");
} catch (error) {
  console.error("Error initializing Firebase admin:", error);
}

// Inisialisasi Google Cloud Storage
let storage;
try {
  // Inisialisasi Google Cloud Storage menggunakan service account key
  storage = new Storage({
    keyFilename: path.join(__dirname, '../../serviceAccountKey.json'), // Path ke file kunci service account
  });
  console.log("Google Cloud Storage initialized successfully");
} catch (error) {
  console.error("Error initializing Google Cloud Storage:", error);
}

// Ambil nama bucket dari .env
const bucketName = process.env.GOOGLE_CLOUD_STORAGE_BUCKET;

if (!bucketName) {
  console.error('Google Cloud Storage bucket name is missing in .env');
  process.exit(1);  // Keluar jika tidak ada nama bucket
}

// Tentukan bucket yang digunakan untuk menyimpan file
const bucket = storage ? storage.bucket(bucketName) : null;

const db = admin.firestore();

module.exports = { admin, db, bucket };
