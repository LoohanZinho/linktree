import Image from 'next/image';
import { Instagram, Youtube } from 'lucide-react';

const TikTokIcon = () => (
  <svg
    className="h-6 w-6"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M16.25 5.75h-3.5a3.5 3.5 0 00-3.5 3.5v9.5a2 2 0 104 0v-5.5a1.5 1.5 0 113 0v5.5a4.5 4.5 0 109 0v-9.5a3.5 3.5 0 00-3.5-3.5z"
    ></path>
  </svg>
);

const DiscordIcon = () => (
  <svg
    className="h-6 w-6"
    fill="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M20.317 4.3698C18.277 3.5048 16.122 3.0008 13.872 3.0008C11.622 3.0008 9.467 3.5048 7.427 4.3698C4.707 6.6458 3.057 9.7838 2.377 13.1488C2.377 13.1488 3.567 14.0048 4.617 14.6548C4.617 14.6548 5.257 13.6218 5.727 12.7668C4.857 12.2348 4.097 11.6028 3.517 10.9028C3.657 10.7418 3.797 10.5898 3.927 10.4288C6.347 12.5878 9.447 13.8008 12.877 13.8008C16.307 13.8008 19.407 12.5878 21.827 10.4288C21.957 10.5898 22.097 10.7418 22.237 10.9028C21.657 11.6028 20.897 12.2348 20.027 12.7668C20.497 13.6218 21.137 14.6548 21.137 14.6548C22.187 14.0048 23.377 13.1488 23.377 13.1488C22.697 9.7838 21.047 6.6458 18.427 4.3698H20.317ZM10.227 10.3398C9.337 10.3398 8.607 9.5408 8.607 8.5498C8.607 7.5598 9.327 6.7608 10.227 6.7608C11.127 6.7608 11.857 7.5598 11.857 8.5498C11.857 9.5408 11.127 10.3398 10.227 10.3398ZM15.527 10.3398C14.637 10.3398 13.907 9.5408 13.907 8.5498C13.907 7.5598 14.627 6.7608 15.527 6.7608C16.427 6.7608 17.157 7.5598 17.157 8.5498C17.157 9.5408 16.427 10.3398 15.527 10.3398Z" />
  </svg>
);

export default function Page() {
  const socialLinks = [
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/loohansb/',
      icon: <Instagram className="h-6 w-6" />,
      className: 'bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500',
    },
    {
      name: 'TikTok',
      url: 'https://www.tiktok.com/@loohansb',
      icon: <TikTokIcon />,
      className: 'bg-gradient-to-r from-cyan-400 to-fuchsia-500',
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
      icon: <DiscordIcon />,
      className: 'bg-indigo-600',
    },
  ];

  return (
    <main className="flex min-h-screen flex-col items-center bg-black p-4 text-white">
      <div className="mt-12 flex flex-col items-center text-center">
        <Image
          src="https://instagram.fbel10-1.fna.fbcdn.net/v/t51.2885-19/525781313_18069955340118184_3013822007023453116_n.jpg?stp=dst-jpg_s150x150_tt6&efg=eyJ2ZW5jb2RlX3RhZyI6InByb2ZpbGVfcGljLmRqYW5nby4xMDgwLmMyIn0&_nc_ht=instagram.fbel10-1.fna.fbcdn.net&_nc_cat=104&_nc_oc=Q6cZ2QEo_wGtXJJvmSlZOaOGDJsjR__iqRr21DH8XkYNFwGa2j1Ynn_GD1SR5vs966PW0KQ&_nc_ohc=7jvGF4nvCMsQ7kNvwElDsmc&_nc_gid=BhQLg5blS1hu_htMfDrhyA&edm=ALGbJPMBAAAA&ccb=7-5&oh=00_AfbNQJZ3P41cdBeWq7Lnzb4HNlyUvA8nX1SWlmIrM6OPog&oe=68CF8FB1&_nc_sid=7d3ac5"
          alt="Foto de Perfil"
          width={150}
          height={150}
          className="rounded-full border-4 border-gray-800/50 shadow-lg"
        />
        <h1 className="mt-4 text-3xl font-bold">Lohan Santos</h1>
        <p className="text-lg text-gray-400">@loohansb</p>
      </div>

      <div className="mt-10 w-full max-w-sm space-y-5">
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
