'use server';

import {
  collection,
  addDoc,
  serverTimestamp,
  getDocs,
  writeBatch,
} from 'firebase/firestore';
// Certifique-se de que o caminho para seu arquivo de configuração do firebase está correto
import { db } from '@/lib/firebase';
import { revalidatePath } from 'next/cache';

/**
 * Cria um novo documento na coleção 'visits' para registrar uma visita única diária.
 */
export async function logVisit(): Promise<void> {
  try {
    const visitsCollection = collection(db, 'visits');
    await addDoc(visitsCollection, {
      createdAt: serverTimestamp(),
    });
  } catch (error) {
    console.error('Failed to log visit:', error);
    // Não relançamos o erro para não quebrar a experiência do usuário se o rastreamento falhar.
  }
}

/**
 * Registra o clique em um link específico no Firestore.
 * @param linkId Um identificador único para o link que foi clicado (ex: 'whatsapp', 'gerente-inteligente').
 */
export async function logClick(linkId: string): Promise<void> {
  if (!linkId) {
    console.error('logClick failed: linkId is missing.');
    return;
  }
  try {
    const clicksCollection = collection(db, 'clicks');
    await addDoc(clicksCollection, {
      linkId: linkId,
      createdAt: serverTimestamp(),
    });
  } catch (error) {
    console.error(`Failed to log click for ${linkId}:`, error);
  }
}

/**
 * Deleta todos os documentos das coleções 'visits' e 'clicks'.
 * Esta é uma operação destrutiva e irreversível.
 */
export async function clearAllData(): Promise<{ success: boolean, error?: string }> {
    try {
        const collectionsToDelete = ['visits', 'clicks'];
        const batch = writeBatch(db);

        for (const col of collectionsToDelete) {
            const collectionRef = collection(db, col);
            const snapshot = await getDocs(collectionRef);
            if (!snapshot.empty) {
                snapshot.docs.forEach(doc => {
                    batch.delete(doc.ref);
                });
            }
        }
        
        await batch.commit();
        
        // Revalida o caminho para forçar a atualização dos dados no cliente
        revalidatePath('/admin');
        
        return { success: true };

    } catch (error) {
        console.error("Failed to clear all data:", error);
        if (error instanceof Error) {
            return { success: false, error: error.message };
        }
        return { success: false, error: 'An unknown error occurred.' };
    }
}
