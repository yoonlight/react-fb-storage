import { initializeApp } from "firebase/app";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FB_API_KEY,
  authDomain: import.meta.env.VITE_FB_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FB_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FB_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FB_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FB_APP_ID,
  measurementId: import.meta.env.VITE_FB_MEASUREMENT_ID,
};

export const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);

export const getImageURL = (filename: string) => {
  const fileRef = ref(storage, filename);
  return getDownloadURL(fileRef);
};

export const uploadImage = (filename: string, file: File) => {
  const storageRef = ref(storage, filename);
  return uploadBytes(storageRef, file, {
    cacheControl: "public,max-age=86400",
  });
};
