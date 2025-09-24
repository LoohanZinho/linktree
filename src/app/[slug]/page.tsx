'use client';

import { useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import Image from 'next/image';

// Mapeamento de slugs para nomes de fontes de tráfego
const slugToSourceMap: { [key: string]: string } = {
  zap: 'WhatsApp',
  insta: 'Instagram',
  ttk: 'TikTok',
  yt: 'YouTube',
  // Adicione outros slugs e fontes aqui
};

export default function SlugTrackerPage() {
  const router = useRouter();
  const params = useParams();
  const slug = params.slug as string;

  useEffect(() => {
    const trackAndRedirect = async () => {
      // Verifica se o slug existe no nosso mapa
      const source = slugToSourceMape[slug];

      if (source) {
        try {
          // Registra a fonte de tráfego no Firestore
          const trafficCollection = collection(db, 'traffic_sources');
          await addDoc(trafficCollection, {
            source: source,
            slug: slug,
            createdAt: serverTimestamp(),
          });
          console.log(`Traffic source logged: ${source}`);
        } catch (error) {
          console.error(`Failed to log traffic source for slug ${slug}:`, error);
        }
      } else {
        console.warn(`Slug "${slug}" not found in tracking map. Redirecting without logging.`);
      }

      // Redireciona para a página inicial
      router.replace('/');
    };

    if (slug) {
      trackAndRedirect();
    }

  }, [slug, router]);

  // Renderiza uma tela de carregamento enquanto o redirecionamento acontece
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center bg-black text-white">
        <Image
            src="https://i.imgur.com/pjSQoR5.gif"
            alt="Fundo animado"
            fill
            className="object-cover -z-10 brightness-50"
            unoptimized
        />
        <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white/50 mx-auto"></div>
            <p className="mt-4 text-lg text-gray-300">Redirecionando...</p>
        </div>
    </div>
  );
}
