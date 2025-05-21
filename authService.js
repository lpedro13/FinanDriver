// src/authService.js (ou src/services/authService.js)

import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "./firebaseConfig"; // ajuste o caminho se seu arquivo firebase tiver outro nome

// Função para registrar novo usuário
export const registerUser = async (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

// Função para login de usuário
export const loginUser = async (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

// Função para logout
export const logoutUser = async () => {
  return signOut(auth);
};
