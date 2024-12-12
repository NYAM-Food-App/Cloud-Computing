const admin = require('firebase-admin');
const { Storage } = require('@google-cloud/storage');
const path = require('path');
require('dotenv').config();

// Initialize Firebase Admin SDK
const serviceAccount = require('../../serviceAccountKey.json');

try {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
  console.log("Firebase Admin initialized successfully");
} catch (error) {
  console.error("Error initializing Firebase Admin:", error);
}

// Initialize Google Cloud Storage
let storage;
try {
  storage = new Storage({
    keyFilename: path.join(__dirname, '../../serviceAccountKey.json'),
  });
  console.log("Google Cloud Storage initialized successfully");
} catch (error) {
  console.error("Error initializing Google Cloud Storage:", error);
}

// Get bucket name from .env
const bucketName = process.env.GOOGLE_CLOUD_STORAGE_BUCKET;

if (!bucketName) {
  console.error('Google Cloud Storage bucket name is missing in .env');
  process.exit(1); // Exit if bucket name is missing
}

// Specify the bucket for storing files
const bucket = storage ? storage.bucket(bucketName) : null;

const db = admin.firestore();

module.exports = { admin, db, bucket };
