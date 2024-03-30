"use client";
import Image from "next/image";
import hero_img from "../assets/hero_img.png";
import report_img from "../assets/report_img.png";
import { FaArrowRightLong } from "react-icons/fa6";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-[100vh] homepage">
      <div className="w-full min-h-[100vh] md:h-[100vh] pt-[65px] flex md:flex-row flex-col place-content-center">
        <div className="md:w-1/2 w-full h-full flex justify-center">
          <div className="w-[80%] backdrop-blur h-fit place-self-center text-black leading-none hero_text">
            <div className="text-[40px] md:text-[60px] font-light bigger leading-[43px] md:leading-[65px] mb-6">
              Combat Hair Loss with Confidence.
            </div>
            <div className=" text-2xl mb-10">
              Empowering You with AI for Healthier Hair
            </div>

            <div className="ml-1">
              <button
                onClick={() => router.push("/chat")}
                className="relative px-6 py-3 font-bold text-black group w-fit flex"
              >
                <span className="absolute inset-0 w-full h-full transition duration-300 ease-out transform -translate-x-2 -translate-y-2 bg-[rgb(255,214,111)] group-hover:translate-x-0 group-hover:translate-y-0"></span>
                <span className="absolute inset-0 w-full h-full border-4 border-black"></span>
                <span className="relative flex gap-3 text-xl">
                  <span>Chat with AI</span>
                  <FaArrowRightLong className="my-1" />
                </span>
              </button>
            </div>
          </div>
        </div>
        <div className="md:w-1/2 w-full h-full flex justify-center">
          <div className="w-2/3 overflow-hidden h-fit flex place-self-center">
            <Image
              src={hero_img}
              className="mt-3 mx-3 w-[calc(100%-12px*2)] heroimg"
              alt="Pet Image"
            />
          </div>
        </div>
      </div>
      <div className="w-full min-h-[100vh] md:h-[100vh] pt-[65px] flex md:flex-row flex-col place-content-center">
        <div className="md:w-1/2 w-full h-full flex justify-center">
          <div className="w-2/3 overflow-hidden h-fit flex place-self-center">
            <Image
              src={report_img}
              className="mt-3 mx-3 w-[calc(100%-12px*2)] heroimg"
              alt="Pet Image"
            />
          </div>
        </div>
        <div className="md:w-1/2 w-full h-full flex justify-center">
          <div className="w-[80%] backdrop-blur h-fit place-self-center text-black leading-none hero_text">
            <div className="text-[40px] md:text-[60px] font-light bigger leading-[43px] md:leading-[65px] mb-6">
              Analyse Your Hair Health by AI
            </div>
            <div className=" text-2xl mb-10">Scalp Care Made Easy</div>

            <div className="ml-1">
              <button
                onClick={() => router.push("/report")}
                className="relative px-6 py-3 font-bold text-black group w-fit flex"
              >
                <span className="absolute inset-0 w-full h-full transition duration-300 ease-out transform -translate-x-2 -translate-y-2 bg-[rgb(255,214,111)] group-hover:translate-x-0 group-hover:translate-y-0"></span>
                <span className="absolute inset-0 w-full h-full border-4 border-black"></span>
                <span className="relative flex gap-3 text-xl">
                  <span>Get Report by AI</span>
                  <FaArrowRightLong className="my-1" />
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="my-4 text-center">Made by Algovengers</div>
    </div>
  );
}
