"use client";

import { useEffect } from 'react';
// Verifique se o caminho para a sua ação está correto
import { logVisit } from '@/actions/analytics';

export function VisitTracker() {
  useEffect(() => {
    const trackVisit = async () => {
      // Obtém a data no formato YYYY-MM-DD
      const today = new Date().toISOString().split('T')[0]; 
      const lastVisit = localStorage.getItem('lastVisitDate');

      // Se a última visita não foi hoje...
      if (lastVisit !== today) {
        try {
          // ...chama a ação para registrar a visita no banco de dados...
          await logVisit(); 
          // ...e marca que o usuário visitou hoje.
          localStorage.setItem('lastVisitDate', today);
        } catch (error) {
          console.error("Failed to track visit:", error);
        }
      }
    };

    trackVisit();
  }, []); // O array vazio [] garante que isso rode apenas uma vez quando o componente é montado.

  return null; // Este componente não renderiza nada na tela.
}
