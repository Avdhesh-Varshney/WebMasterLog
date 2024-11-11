import { FaDiscord, FaGithub, FaLinkedin, FaYoutube } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import Link from 'next/link';
import Image from 'next/image';

const Footer = () => {
  return (
    <footer className="bg-[#191c24] px-4 mt-2 pt-5 border-t-2 border-blue-400 flex flex-col gap-4 justify-evenly items-center text-center text-gray-400">
     <div className='flex justify-evenly flex-wrap'>
     <div className="md:w-1/2 flex flex-col gap-2 items-center">
        <Link href="/">
          <Image src={'/white-logo.png'} alt={''} width={250} height={250} sizes='250' />
        </Link>
        <p className="text-sm">
          WebMasterLog serves as a comprehensive record of various web development endeavors, highlighting the versatility and capabilities of projects built with Front-end and Back-end Web development technologies. From interactive and responsive user interfaces to dynamic web applications, this repository encompasses a spectrum of web development solutions.
        </p>
      </div>

      <div className="flex flex-col gap-2">
        <h2 className="text-xl">Connect with me</h2>
        <div className="flex justify-evenly gap-3">
          <Link href="https://discord.gg/tSqtvHUJzE" className='border-2 border-gray-600 flex items-center p-2 rounded-full'>
            <FaDiscord className="w-5 h-5 text-[#5865F2]" />
          </Link>
          <Link href="https://www.linkedin.com/in/avdhesh-varshney/" className='border-2 border-gray-600 flex items-center p-2 rounded-full'>
            <FaLinkedin className="w-5 h-5 text-[#0077B5]" />
          </Link>
          <Link href="https://x.com/__Avdhesh__" className='border-2 border-gray-600 flex items-center p-2 rounded-full'>
            <FaXTwitter className="w-5 h-5 text-[#1DA1F2]" />
          </Link>
          <Link href="https://www.youtube.com/@Code_A2Z" className='border-2 border-gray-600 flex items-center p-2 rounded-full'>
            <FaYoutube className="w-5 h-5 text-[#FF0000]" />
          </Link>
          <Link href="https://github.com/Avdhesh-Varshney" className='border-2 border-gray-600 flex items-center p-2 rounded-full'>
            <FaGithub className="w-5 h-5 text-[#e0d9d9]" />
          </Link>
        </div>
     
      </div>
     </div>
      <div className="flex  gap-6 border-t-2 w-11/12 border-gray-600 items-center py-3  justify-center flex-wrap">
          <p className="text-sm">{`© ${new Date().getFullYear()} All Rights Reserved`}</p>
          <b className="text-sm text-white">Made By Avdhesh Varshney 👦</b>
        </div>
    </footer>
  )
}

export default Footer;
