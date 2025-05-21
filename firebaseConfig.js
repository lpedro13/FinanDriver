import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDCehrFu3hWITJO07NHHTbsflMswj5xvr4",
  authDomain: "finandriver-9a4fa.firebaseapp.com",
  projectId: "finandriver-9a4fa",
  storageBucket: "finandriver-9a4fa.firebasestorage.app",
  messagingSenderId: "784393000386",
  appId: "1:784393000386:web:1d6a12a808d85e52e2f25b",
  measurementId: "G-F7WJ75HX55"
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);

// Inicializa a autenticação do Firebase
const auth = getAuth(app);

export { auth };
