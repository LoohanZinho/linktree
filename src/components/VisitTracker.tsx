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
          let region = 'N/A';
          let ip = 'N/A';

          try {
            const response = await fetch('https://ipapi.co/json/');
            if (response.ok) {
              const data = await response.json();
              city = data.city || 'Desconhecida';
              region = data.region || 'N/A';
              ip = data.ip || 'N/A';
            }
          } catch (geoError) {
            console.error("Geolocation API call failed, proceeding with default values.", geoError);
          }

          const visitsCollection = collection(db, 'visits');
          await addDoc(visitsCollection, {
            createdAt: serverTimestamp(),
            city: city,
            region: region,
            ip: ip,
          });

          localStorage.setItem('lastVisitDate', today);
          console.log(`Visit tracked for city: ${city}, ${region} from IP: ${ip}`);
        } catch (error) {
          console.error("Failed to track visit:", error);
        }
      }
    };

    trackVisit();
  }, []);

  return null;
}
