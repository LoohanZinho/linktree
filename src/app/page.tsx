'use client';

import Image from 'next/image';
import {
  Instagram,
  Youtube,
  Volume2,
  VolumeX,
  ChevronDown,
  Coins,
  Brain,
  UsersRound,
  DollarSign,
} from 'lucide-react';
import { AiOutlineTikTok } from 'react-icons/ai';
import { FaDiscord } from 'react-icons/fa6';
import { useState, useRef, useEffect } from 'react';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { DiscordPopup } from '@/components/discord-popup';
import { Separator } from '@/components/ui/separator';

export default function Page() {
  const [isPlaying, setIsPlaying] = useState(true);
  const audioRef = useRef<HTMLAudioElement>(null);
  const projectsContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.4;
    }
  }, []);

  const socialLinks = [
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/loohansb/',
      icon: <Instagram className="h-6 w-6" />,
      isExternal: true,
    },
    {
      name: 'TikTok',
      url: 'https://www.tiktok.com/@loohansb',
      icon: <AiOutlineTikTok className="h-6 w-6" />,
      isExternal: true,
    },
    {
      name: 'YouTube',
      url: 'https://www.youtube.com/@LzOfSeven',
      icon: <Youtube className="h-6 w-6" />,
      isExternal: true,
    },
    {
      name: 'Discord',
      url: 'lzofseven',
      icon: <FaDiscord className="h-6 w-6" />,
      isExternal: false,
    },
  ];

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

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
      <div className="relative w-full max-w-sm">
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
            src="https://instagram.fbel10-1.fna.fbcdn.net/v/t51.2885-19/525781313_18069955340118184_3013822007023453116_n.jpg?stp=dst-jpg_s150x150_tt6&efg=eyJ2ZW5jb2RlX3RhZyI6InByb2ZpbGVfcGljLmRqYW5nby4xMDgwLmMyIn0&_nc_ht=instagram.fbel10-1.fna.fbcdn.net&_nc_cat=104&_nc_oc=Q6cZ2QEo_wGtXJJvmSlZOaOGDJsjR__iqRr21DH8XkYNFwGa2j1Ynn_GD1SR5vs966PW0KQ&_nc_ohc=7jvGF4nvCMsQ7kNvwElDsmc&_nc_gid=BhQLg5blS1hu_htMfDrhyA&edm=ALGbJPMBAAAA&ccb=7-5&oh=00_AfbNQJZ3P41cdBeWq7Lnzb4HNlyUvA8nX1SWlmIrM6OPog&oe=68CF8FB1&_nc_sid=7d3ac5"
            alt="Foto de Perfil"
            width={120}
            height={120}
            className="rounded-full border-4 border-gray-800/50 shadow-lg md:w-[150px] md:h-[150px]"
          />
        </div>
      </div>
      <div className="mt-20 flex flex-col items-center text-center">
        <h1 className="mt-4 text-2xl sm:text-3xl font-bold">Lohan Santos</h1>
        <p className="text-base sm:text-lg text-gray-400">@loohansb</p>
      </div>

      <div className="mt-8 w-full max-w-sm space-y-4">
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
              className="group block animate-fade-in-down"
            >
              <button className="relative flex w-full items-center justify-center gap-3 overflow-hidden rounded-2xl p-3 sm:p-4 text-base sm:text-lg font-semibold text-white transition-all duration-300 ease-in-out hover:scale-105 active:scale-95">
                <div className="absolute inset-0 z-0 bg-gradient-to-br from-gray-500/50 to-gray-800/50 opacity-20 blur-2xl transition-opacity duration-300 group-hover:opacity-40"></div>
                <div className="absolute inset-0 z-0 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl"></div>
                <div className="relative z-10 flex items-center justify-center gap-3">
                  <Coins className="h-6 w-6" />
                  Gerente Inteligente Financeiro
                </div>
              </button>
            </a>
            <a
              href="https://gerenteinteligente.online/"
              target="_blank"
              rel="noopener noreferrer"
              className="group block animate-fade-in-down animation-delay-200"
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
              href="https://muraldosinfluenciadores.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="group block animate-fade-in-down"
              style={{ animationDelay: '400ms' }}
            >
              <button className="relative flex w-full items-center justify-center gap-3 overflow-hidden rounded-2xl p-3 sm:p-4 text-base sm:text-lg font-semibold text-white transition-all duration-300 ease-in-out hover:scale-105 active:scale-95">
                <div className="absolute inset-0 z-0 bg-gradient-to-br from-gray-500/50 to-gray-800/50 opacity-20 blur-2xl transition-opacity duration-300 group-hover:opacity-40"></div>
                <div className="absolute inset-0 z-0 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl"></div>
                <div className="relative z-10 flex items-center justify-center gap-3">
                  <UsersRound className="h-6 w-6" />
                  Mural dos influenciadores
                </div>
              </button>
            </a>
            <a
              href="https://lucrandolci.netlify.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="group block animate-fade-in-down"
              style={{ animationDelay: '600ms' }}
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
          </CollapsibleContent>
        </Collapsible>
        
        <Separator className="bg-white/10" />

        {socialLinks.map((link) =>
          link.isExternal ? (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group block"
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
            <DiscordPopup key={link.name} username={link.url}>
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
          )
        )}
      </div>
      <audio ref={audioRef} autoPlay loop>
        <source
          src="https://firebasestorage.googleapis.com/v0/b/agente-de-ia-n4f3c.firebasestorage.app/o%2Fcopyright-free-rain-sounds-331497.mp3?alt=media&amp;token=dd96c4d6-a38b-4eb9-9f0a-55fb9dcc4b27"
          type="audio/mpeg"
        />
        Seu navegador não suporta o elemento de áudio.
      </audio>
      <button
        onClick={togglePlay}
        className="absolute bottom-4 right-4 text-white p-2 rounded-full bg-black/20 hover:bg-black/40 transition-colors duration-300"
        aria-label="Toggle sound"
      >
        {isPlaying ? (
          <Volume2 className="h-6 w-6" />
        ) : (
          <VolumeX className="h-6 w-6" />
        )}
      </button>
    </main>
  );

    

    

    
    

    
