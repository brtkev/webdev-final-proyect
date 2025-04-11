
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore/lite";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA-J2HSJ4R6lt7ax6zbF8MGiNeGtfD64tk",
  authDomain: "devweb-1.firebaseapp.com",
  projectId: "devweb-1",
  storageBucket: "devweb-1.firebasestorage.app",
  messagingSenderId: "809913057462",
  appId: "1:809913057462:web:50aaad510903828a2ba617",
  measurementId: "G-FFPY51YZ6K",
};
// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export const entities = {
  estudiantes: "estudiantes",
  asignaturas: "asignaturas",
  calificaciones: "calificaciones",
  matriculaciones: "matriculaciones",
  reportes: "reportes",
  semestres: "semestres",
  carreras: "carreras",
};

export async function getCollection(entity) {
  const entityDocs = await getDocs(collection(db, entity));
  const dataList = entityDocs.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return dataList;
}