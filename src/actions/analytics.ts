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

/**
 * Registra o clique em um link específico no Firestore.
 * @param linkId Um identificador único para o link que foi clicado (ex: 'whatsapp', 'gerente-inteligente').
 */
export async function logClick(linkId: string): Promise<void> {
  if (!linkId) {
    console.error("logClick failed: linkId is missing.");
    return;
  }
  try {
    const clicksCollection = collection(db, "clicks");
    await addDoc(clicksCollection, {
      linkId: linkId,
      createdAt: serverTimestamp(),
    });
  } catch (error) {
    console.error(`Failed to log click for ${linkId}:`, error);
  }
}
