"use client";

import { useEffect } from 'react';

export function VisitTracker() {
  useEffect(() => {
    const trackVisit = async () => {
      const today = new Date().toISOString().split('T')[0];
      const lastVisit = localStorage.getItem('lastVisitDate');

      if (lastVisit !== today) {
        try {
          // A requisição é enviada para nossa própria API route,
          // que cuidará de obter o IP e registrar no Firebase.
          await fetch('/api/track', { method: 'POST' });

          localStorage.setItem('lastVisitDate', today);
          console.log('Visit tracked via API.');
        } catch (error) {
          console.error("Failed to track visit via API:", error);
        }
      }
    };

    trackVisit();
  }, []);

  return null;
}
