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
          let city = 'Unknown';
          try {
            const response = await fetch('https://ip-api.com/json');
            if (response.ok) {
                const data = await response.json();
                city = data.city || 'Unknown';
            }
          } catch (apiError) {
              console.error("Could not fetch location data:", apiError);
          }

          const visitsCollection = collection(db, 'visits');
          await addDoc(visitsCollection, {
            createdAt: serverTimestamp(),
            city: city
          });

          localStorage.setItem('lastVisitDate', today);
        } catch (error) {
          console.error("Failed to track visit:", error);
        }
      }
    };

    trackVisit();
  }, []); 

  return null;
}
