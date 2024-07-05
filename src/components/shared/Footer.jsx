import { FaDiscord, FaGithub, FaLinkedin, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from 'react-icons/fa6';
import { motion } from "framer-motion";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className='mt-2 py-4 border-top border-info border-2 d-flex flex-column flex-md-row align-items-center justify-content-md-evenly text-center text-md-start' style={{backgroundColor: '#12151e', position: 'sticky', bottom: 0, width: '100%', zIndex: 1000}}>
      <div className="w-50 text-light mb-3 mb-md-0">
        <h5 className="h5 mb-3">WEB MASTER LOG 🚀</h5>
        <p className="small">
          WebMasterLog serves as a comprehensive record of various web development endeavors, highlighting the versatility and capabilities of projects built with Front-end and Back-end Web development technologies. From interactive and responsive user interfaces to dynamic web applications, this repository encompasses a spectrum of web development solutions.
        </p>
      </div>

      <div className="text-light text-center">
        <h2 className="h5 mb-3">Connect with me</h2>
        <div className="d-flex justify-content-around mb-2">
          <motion.a whileHover={{ scale: 1.2 }} className="text-white me-2" href="https://discord.gg/tSqtvHUJzE">
            <FaDiscord style={{width: '25px', height: '25px'}} />
          </motion.a>
          <motion.a whileHover={{ scale: 1.2 }} className="text-white me-2" href="https://www.linkedin.com/in/avdhesh-varshney/">
            <FaLinkedin style={{width: '25px', height: '25px'}} />
          </motion.a>
          <motion.a whileHover={{ scale: 1.2 }} className="text-white me-2" href="https://x.com/__Avdhesh__">
            <FaXTwitter style={{width: '25px', height: '25px'}} />
          </motion.a>
          <motion.a whileHover={{ scale: 1.2 }} className="text-white me-2" href="https://www.youtube.com/@Code_A2Z">
            <FaYoutube style={{width: '25px', height: '25px'}} />
          </motion.a>
          <motion.a whileHover={{ scale: 1.2 }} className="text-white" href="https://github.com/Avdhesh-Varshney">
            <FaGithub style={{width: '25px', height: '25px'}} />
          </motion.a>
        </div>

        <p className="small mb-0">{`© ${year} All Rights Reserved`}</p>
        <b className="small">Made By Avdhesh Varshney 👦</b>
      </div>
    </footer>
  );
};

export default Footer;
