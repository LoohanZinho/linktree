'use client';

import Image from 'next/image';
import {
  Instagram,
  Youtube,
  ChevronDown,
  Coins,
  Brain,
  DollarSign,
  Building,
} from 'lucide-react';
import { AiOutlineTikTok } from 'react-icons/ai';
import { FaDiscord, FaWhatsapp } from 'react-icons/fa6';
import { useState, useRef, useEffect } from 'react';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { DiscordPopup } from '@/components/discord-popup';
import { Separator } from '@/components/ui/separator';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import MusicPlayer from '@/components/MusicPlayer';


export default function Page() {
  const projectsContentRef = useRef<HTMLDivElement>(null);

  const handleLinkClick = async (linkId: string) => {
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
  };

  const socialLinks = [
    {
      name: 'WhatsApp',
      id: 'whatsapp',
      url: 'https://wa.me/91981588512',
      icon: <FaWhatsapp className="h-6 w-6" />,
      isExternal: true,
    },
    {
      name: 'Instagram',
      id: 'instagram',
      url: 'https://www.instagram.com/loohansb/',
      icon: <Instagram className="h-6 w-6" />,
      isExternal: true,
    },
    {
      name: 'TikTok',
      id: 'tiktok',
      url: 'https://www.tiktok.com/@loohansb',
      icon: <AiOutlineTikTok className="h-6 w-6" />,
      isExternal: true,
    },
    {
      name: 'YouTube',
      id: 'youtube',
      url: 'https://www.youtube.com/@LzOfSeven',
      icon: <Youtube className="h-6 w-6" />,
      isExternal: true,
    },
    {
      name: 'Discord',
      id: 'discord',
      url: 'lzofseven',
      icon: <FaDiscord className="h-6 w-6" />,
      isExternal: false,
    },
  ];

  const handleProjectsOpen = (isOpen: boolean) => {
    if (isOpen) {
      setTimeout(() => {
        projectsContentRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'end',
        });
      }, 300);
    }
  };

  return (
    <main className="relative flex min-h-screen flex-col items-center p-4 sm:p-6 md:p-8 text-white">
      <Image
        src="https://i.imgur.com/pjSQoR5.gif"
        alt="Fundo animado"
        fill
        className="object-cover -z-10 brightness-50"
        data-ai-hint="animated background"
        unoptimized
      />
      <div className="relative w-full max-w-sm animate-slide-up-fade-in">
        <Image
          src="https://i.imgur.com/601NhSJ.jpeg"
          alt="Banner"
          width={400}
          height={150}
          className="w-full h-36 object-cover rounded-2xl"
          data-ai-hint="header banner"
        />
        <div className="absolute -bottom-14 left-1/2 -translate-x-1/2">
          <Image
            src="https://i.imgur.com/MWLZoRN.jpeg"
            alt="Foto de Perfil"
            width={120}
            height={120}
            className="rounded-full border-4 border-gray-800/50 shadow-lg md:w-[150px] md:h-[150px]"
          />
        </div>
      </div>
      <div className="mt-20 flex flex-col items-center text-center animate-slide-up-fade-in animation-delay-150">
        <h1 className="mt-4 text-2xl sm:text-3xl font-bold">Lohan Santos</h1>
        <p className="text-base sm:text-lg text-gray-400">@loohansb</p>
      </div>

      <div className="mt-8 w-full max-w-sm space-y-4">
        <div className="animate-slide-up-fade-in animation-delay-300">
            <Collapsible onOpenChange={handleProjectsOpen} className="w-full">
            <CollapsibleTrigger asChild>
                <button className="group relative flex w-full items-center justify-center gap-3 overflow-hidden rounded-2xl p-3 sm:p-4 text-base sm:text-lg font-semibold text-white transition-all duration-300 ease-in-out hover:scale-105 active:scale-95">
                <div className="absolute inset-0 z-0 bg-gradient-to-br from-gray-500/50 to-gray-800/50 opacity-20 blur-2xl transition-opacity duration-300 group-hover:opacity-40"></div>
                <div className="absolute inset-0 z-0 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl"></div>
                <div className="absolute inset-0 z-0 bg-gradient-to-br opacity-80"></div>
                <div className="relative z-10 flex items-center justify-center gap-3">
                    Meus projetos
                    <ChevronDown className="h-5 w-5 transition-transform duration-300 group-data-[state=open]:rotate-180" />
                </div>
                </button>
            </CollapsibleTrigger>
            <CollapsibleContent
                ref={projectsContentRef}
                className="space-y-2 pt-2 overflow-hidden data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up"
            >
                <a
                href="https://gerenteinteligente.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="group block animate-slide-up-fade-in"
                onClick={() => handleLinkClick('gerente-inteligente')}
                >
                <button className="relative flex w-full items-center justify-center gap-3 overflow-hidden rounded-2xl p-3 sm:p-4 text-base sm:text-lg font-semibold text-white transition-all duration-300 ease-in-out hover:scale-105 active:scale-95">
                    <div className="absolute inset-0 z-0 bg-gradient-to-br from-gray-500/50 to-gray-800/50 opacity-20 blur-2xl transition-opacity duration-300 group-hover:opacity-40"></div>
                    <div className="absolute inset-0 z-0 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl"></div>
                    <div className="relative z-10 flex items-center justify-center gap-3">
                    <Coins className="h-6 w-6" />
                    Gerente Inteligente
                    </div>
                </button>
                </a>
                <a
                href="https://gerenteinteligente.online/"
                target="_blank"
                rel="noopener noreferrer"
                className="group block animate-slide-up-fade-in"
                style={{ animationDelay: '150ms' }}
                onClick={() => handleLinkClick('gerente-inteligente-ia')}
                >
                <button className="relative flex w-full items-center justify-center gap-3 overflow-hidden rounded-2xl p-3 sm:p-4 text-base sm:text-lg font-semibold text-white transition-all duration-300 ease-in-out hover:scale-105 active:scale-95">
                    <div className="absolute inset-0 z-0 bg-gradient-to-br from-gray-500/50 to-gray-800/50 opacity-20 blur-2xl transition-opacity duration-300 group-hover:opacity-40"></div>
                    <div className="absolute inset-0 z-0 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl"></div>
                    <div className="relative z-10 flex items-center justify-center gap-3">
                    <Brain className="h-6 w-6" />
                    Gerente Inteligente IA
                    </div>
                </button>
                </a>
                <a
                href="https://lucrandolci.netlify.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="group block animate-slide-up-fade-in"
                style={{ animationDelay: '300ms' }}
                onClick={() => handleLinkClick('lucrando-lci')}
                >
                <button className="relative flex w-full items-center justify-center gap-3 overflow-hidden rounded-2xl p-3 sm:p-4 text-base sm:text-lg font-semibold text-white transition-all duration-300 ease-in-out hover:scale-105 active:scale-95">
                    <div className="absolute inset-0 z-0 bg-gradient-to-br from-gray-500/50 to-gray-800/50 opacity-20 blur-2xl transition-opacity duration-300 group-hover:opacity-40"></div>
                    <div className="absolute inset-0 z-0 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl"></div>
                    <div className="relative z-10 flex items-center justify-center gap-3">
                    <DollarSign className="h-6 w-6" />
                    Lucrando com Influenciadores
                    </div>
                </button>
                </a>
                <a
                href="https://depositoaguasbrancas.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="group block animate-slide-up-fade-in"
                style={{ animationDelay: '450ms' }}
                onClick={() => handleLinkClick('deposito-aguas-brancas')}
                >
                <button className="relative flex w-full items-center justify-center gap-3 overflow-hidden rounded-2xl p-3 sm:p-4 text-base sm:text-lg font-semibold text-white transition-all duration-300 ease-in-out hover:scale-105 active:scale-95">
                    <div className="absolute inset-0 z-0 bg-gradient-to-br from-gray-500/50 to-gray-800/50 opacity-20 blur-2xl transition-opacity duration-300 group-hover:opacity-40"></div>
                    <div className="absolute inset-0 z-0 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl"></div>
                    <div className="relative z-10 flex items-center justify-center gap-3">
                    <Building className="h-6 w-6" />
                    Depósito Águas Brancas
                    </div>
                </button>
                </a>
            </CollapsibleContent>
            </Collapsible>
        </div>
        
        <div className="animate-slide-up-fade-in animation-delay-450">
            <Separator className="bg-white/10" />
        </div>

        {socialLinks.map((link, index) =>
          link.isExternal ? (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group block animate-slide-up-fade-in"
              style={{ animationDelay: `${450 + (index + 1) * 150}ms` }}
              onClick={() => handleLinkClick(link.id)}
            >
              <button
                className={`relative flex w-full items-center justify-center gap-3 overflow-hidden rounded-2xl p-3 sm:p-4 text-base sm:text-lg font-semibold text-white transition-all duration-300 ease-in-out hover:scale-105 active:scale-95`}
              >
                <div
                  className={`absolute inset-0 z-0 bg-gradient-to-br from-gray-500/50 to-gray-800/50 opacity-20 blur-2xl transition-opacity duration-300 group-hover:opacity-40`}
                ></div>
                <div className="absolute inset-0 z-0 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl"></div>
                <div
                  className={`absolute inset-0 z-0 bg-gradient-to-br opacity-80`}
                ></div>
                <div className="relative z-10 flex items-center justify-center gap-3">
                  {link.icon}
                  {link.name}
                </div>
              </button>
            </a>
          ) : (
            <div key={link.name} onClick={() => handleLinkClick(link.id)} 
              className="animate-slide-up-fade-in"
              style={{ animationDelay: `${450 + (index + 1) * 150}ms` }}
            >
              <DiscordPopup username={link.url}>
                <button
                  className={`relative flex w-full items-center justify-center gap-3 overflow-hidden rounded-2xl p-3 sm:p-4 text-base sm:text-lg font-semibold text-white transition-all duration-300 ease-in-out hover:scale-105 active:scale-95`}
                >
                  <div
                    className={`absolute inset-0 z-0 bg-gradient-to-br from-gray-500/50 to-gray-800/50 opacity-20 blur-2xl transition-opacity duration-300 group-hover:opacity-40`}
                  ></div>
                  <div className="absolute inset-0 z-0 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl"></div>
                  <div
                    className={`absolute inset-0 z-0 bg-gradient-to-br opacity-80`}
                  ></div>
                  <div className="relative z-10 flex items-center justify-center gap-3">
                    {link.icon}
                    {link.name}
                  </div>
                </button>
              </DiscordPopup>
            </div>
          )
        )}
      </div>
      <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-4 w-auto max-w-sm sm:w-80 animate-slide-up-fade-in animation-delay-800">
         <MusicPlayer />
      </div>
    </main>
  );
}
