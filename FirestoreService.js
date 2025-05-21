// src/services/firestoreService.js
import { getFirestore, doc, setDoc, getDoc, updateDoc, collection, query, where, get } from "firebase/firestore";
import { auth } from "../firebaseConfig";  // Ajuste o caminho conforme necessário

// Inicializando o Firestore
const db = getFirestore();

// Função para criar ou atualizar os dados de um usuário
export const saveUserData = async (userId, userData) => {
  try {
    const userRef = doc(db, "users", userId);  // Usando o UID do usuário para criar ou atualizar o documento
    await setDoc(userRef, userData, { merge: true });  // Cria ou mescla os dados
    console.log("Dados do usuário salvos com sucesso");
  } catch (error) {
    console.error("Erro ao salvar os dados do usuário:", error);
    throw new Error(error.message);
  }
};

// Função para obter os dados do usuário
export const getUserData = async (userId) => {
  try {
    const userRef = doc(db, "users", userId);  // Acessando o documento do usuário
    const userDoc = await getDoc(userRef);
    
    if (userDoc.exists()) {
      return userDoc.data();  // Retorna os dados do usuário
    } else {
      console.log("Não há dados para este usuário.");
      return null;
    }
  } catch (error) {
    console.error("Erro ao obter os dados do usuário:", error);
    throw new Error(error.message);
  }
};

// Função para adicionar dados a uma coleção específica do usuário (por exemplo, transações)
export const addTransaction = async (userId, transactionData) => {
  try {
    const transactionsRef = collection(db, "users", userId, "transactions");
    await setDoc(doc(transactionsRef), transactionData);
    console.log("Transação salva com sucesso!");
  } catch (error) {
    console.error("Erro ao adicionar transação:", error);
    throw new Error(error.message);
  }
};
