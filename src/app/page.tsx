import Image from 'next/image';
import { Instagram, Youtube } from 'lucide-react';
import { AiOutlineTikTok } from "react-icons/ai";
import { FaDiscord } from "react-icons/fa6";

export default function Page() {
  const socialLinks = [
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/loohansb/',
      icon: <Instagram className="h-6 w-6" />,
      className: 'bg-[radial-gradient(circle_at_30%_107%,#FBD83F_0%,#FBD83F_5%,#F83640_45%,#E1306C_60%,#C13584_80%,#833AB4_100%)]',
    },
    {
      name: 'TikTok',
      url: 'https://www.tiktok.com/@loohansb',
      icon: <AiOutlineTikTok className="h-6 w-6" />,
      className: 'bg-black',
    },
    {
      name: 'YouTube',
      url: 'https://www.youtube.com/@LzOfSeven',
      icon: <Youtube className="h-6 w-6" />,
      className: 'bg-red-600',
    },
    {
      name: 'Discord',
      url: 'https://discordapp.com/users/lzofseven',
      icon: <FaDiscord className="h-6 w-6" />,
      className: 'bg-indigo-600',
    },
  ];

  return (
    <main className="relative flex min-h-screen flex-col items-center p-4 sm:p-6 md:p-8 text-white">
      <Image
        src="https://i.imgur.com/W0m41wl.jpeg"
        alt="Fundo neutro"
        fill
        className="object-cover -z-10 brightness-50"
        data-ai-hint="abstract background"
      />
      <div className="mt-8 sm:mt-12 flex flex-col items-center text-center">
        <Image
          src="https://instagram.fbel10-1.fna.fbcdn.net/v/t51.2885-19/525781313_18069955340118184_3013822007023453116_n.jpg?stp=dst-jpg_s150x150_tt6&efg=eyJ2ZW5jb2RlX3RhZyI6InByb2ZpbGVfcGljLmRqYW5nby4xMDgwLmMyIn0&_nc_ht=instagram.fbel10-1.fna.fbcdn.net&_nc_cat=104&_nc_oc=Q6cZ2QEo_wGtXJJvmSlZOaOGDJsjR__iqRr21DH8XkYNFwGa2j1Ynn_GD1SR5vs966PW0KQ&_nc_ohc=7jvGF4nvCMsQ7kNvwElDsmc&_nc_gid=BhQLg5blS1hu_htMfDrhyA&edm=ALGbJPMBAAAA&ccb=7-5&oh=00_AfbNQJZ3P41cdBeWq7Lnzb4HNlyUvA8nX1SWlmIrM6OPog&oe=68CF8FB1&_nc_sid=7d3ac5"
          alt="Foto de Perfil"
          width={120}
          height={120}
          className="rounded-full border-4 border-gray-800/50 shadow-lg md:w-[150px] md:h-[150px]"
        />
        <h1 className="mt-4 text-2xl sm:text-3xl font-bold">Lohan Santos</h1>
        <p className="text-base sm:text-lg text-gray-400">@loohansb</p>
      </div>

      <div className="mt-8 w-full max-w-sm space-y-4">
        {socialLinks.map((link) => (
          <a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group block"
          >
            <button
              className={`relative flex w-full items-center justify-center gap-3 overflow-hidden rounded-2xl p-4 text-lg font-semibold text-white transition-all duration-300 ease-in-out hover:scale-105 active:scale-95`}
            >
              <div
                className={`absolute inset-0 z-0 ${link.className} opacity-20 blur-xl group-hover:opacity-30 transition-opacity duration-300`}
              ></div>
              <div className="absolute inset-0 z-0 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl"></div>
              <div className={`absolute inset-0 z-0 ${link.className} rounded-2xl`}></div>
              <div className="relative z-10 flex items-center justify-center gap-3">
                {link.icon}
                {link.name}
              </div>
            </button>
          </a>
        ))}
      </div>
    </main>
  );
}
