import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col gap-5">
      <header className="bg-gradient-to-l from-[#d41459] to-[#911a6c] rounded-lg flex justify-evenly shadow-lg gap-2 items-center align-middle">
        <Image src="/logo.webp" alt="logo" width={80} height={80} sizes="80" className="object-contain rounded-full" />
        <div className="flex flex-col gap-2 text-center">
          <h1 className="text-xl font-bold">WEB MASTER LOG | YOUR WEB DEV HUB</h1>
        </div>
        <Image src="/image.png" alt="image" width={150} height={150} sizes="150" className="object-contain" />
      </header>

      <div className="p-8 bg-[#191c24] overflow-hidden rounded-lg shadow-lg w-full">
        <iframe
          src={`/intro-video.mp4`}
          title="WebMasterLog Intro Video"
          className="w-full h-screen rounded-sm"
          allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>

    </div>
  );
}
