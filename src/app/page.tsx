import Image from 'next/image';

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-black p-4 text-white">
      <Image
        src="https://instagram.fbel10-1.fna.fbcdn.net/v/t51.2885-19/525781313_18069955340118184_3013822007023453116_n.jpg?stp=dst-jpg_s150x150_tt6&efg=eyJ2ZW5jb2RlX3RhZyI6InByb2ZpbGVfcGljLmRqYW5nby4xMDgwLmMyIn0&_nc_ht=instagram.fbel10-1.fna.fbcdn.net&_nc_cat=104&_nc_oc=Q6cZ2QEo_wGtXJJvmSlZOaOGDJsjR__iqRr21DH8XkYNFwGa2j1Ynn_GD1SR5vs966PW0KQ&_nc_ohc=7jvGF4nvCMsQ7kNvwElDsmc&_nc_gid=BhQLg5blS1hu_htMfDrhyA&edm=ALGbJPMBAAAA&ccb=7-5&oh=00_AfbNQJZ3P41cdBeWq7Lnzb4HNlyUvA8nX1SWlmIrM6OPog&oe=68CF8FB1&_nc_sid=7d3ac5"
        alt="Foto de Perfil"
        width={150}
        height={150}
        className="rounded-full"
      />
      <h1 className="mt-4 text-2xl font-bold">Lohan Santos</h1>
      <p className="text-lg text-gray-400">@loohansb</p>
    </main>
  );
}
