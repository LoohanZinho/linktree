"use server";

import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
// Certifique-se de que o caminho para seu arquivo de configuração do firebase está correto
import { db } from '@/lib/firebase';

/**
 * Cria um novo documento na coleção 'visits' para registrar uma visita única diária.
 */
export async function logVisit(): Promise<void> {
  try {
    const visitsCollection = collection(db, "visits");
    await addDoc(visitsCollection, {
      createdAt: serverTimestamp(),
    });
  } catch (error) {
    console.error("Failed to log visit:", error);
    // Não relançamos o erro para não quebrar a experiência do usuário se o rastreamento falhar.
  }
}
