import { NextResponse } from 'next/server';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import geoip from 'geoip-lite';
import { headers } from 'next/headers';

export async function POST(request: Request) {
  try {
    const headersList = headers();
    
    // Obter o IP do visitante. Em um ambiente de produção (ex: Vercel, Firebase),
    // o IP real do cliente é passado por este header.
    const ip = headersList.get('x-forwarded-for')?.split(',')[0].trim() || '127.0.0.1';

    // Usar geoip-lite para encontrar a cidade.
    // O fallback para '127.0.0.1' resultará em 'Desconhecida' se nenhum IP for encontrado.
    const geo = geoip.lookup(ip);
    const city = geo?.city || 'Desconhecida';

    // Salvar no Firestore
    const visitsCollection = collection(db, 'visits');
    await addDoc(visitsCollection, {
      createdAt: serverTimestamp(),
      city: city,
      ip: ip, // Opcional: salvar o IP para depuração
    });

    return NextResponse.json({ success: true, city: city }, { status: 200 });
  } catch (error) {
    console.error("API track error:", error);
    if (error instanceof Error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
    return NextResponse.json({ success: false, error: 'An unknown error occurred.' }, { status: 500 });
  }
}
