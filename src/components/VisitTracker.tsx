"use client";

import { useEffect } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export function VisitTracker() {
  useEffect(() => {
    const trackVisit = async () => {
      const today = new Date().toISOString().split('T')[0];
      const lastVisit = localStorage.getItem('lastVisitDate');

      if (lastVisit !== today) {
        try {
          let city = 'Desconhecida';
          try {
            // Usar uma API de geolocalização confiável no lado do cliente.
            // Se falhar, a cidade continuará como 'Desconhecida', mas a visita será registrada.
            const response = await fetch('https://ipapi.co/city/');
            if (response.ok) {
              city = await response.text();
            }
          } catch (geoError) {
            console.error("Geolocation API call failed, proceeding with 'Desconhecida'.", geoError);
          }

          const visitsCollection = collection(db, 'visits');
          await addDoc(visitsCollection, {
            createdAt: serverTimestamp(),
            city: city,
          });

          localStorage.setItem('lastVisitDate', today);
          console.log(`Visit tracked for city: ${city}`);
        } catch (error) {
          console.error("Failed to track visit:", error);
        }
      }
    };

    trackVisit();
  }, []);

  return null;
}
