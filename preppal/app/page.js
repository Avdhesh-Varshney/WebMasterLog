
"use client";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import CelebrationBanner from '../components/CelebrationBanner';
import { Button } from "../components/ui/button";
import Image from "next/image";
import Header from "./dashboard/_components/Header";
import { AtomIcon, Edit, Share2, CheckCircle } from "lucide-react";
import Spline from "@splinetool/react-spline";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion";

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const titles = [
    "Your Personal AI Mock Interview",
    "Master Your Interview Skills",
    "Elevate Your Interview Game",
    "Ace Your Next Interview with ease",
    "Unlock Your Interview Potential"
  ];

  const [currentTitleIndex, setCurrentTitleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const typingSpeed = 50; // Adjust typing speed here
  const pauseDuration = 600; // Pause between full title and start of delete
const benefits = [
   'AI-driven practice more effective than static questions',
    "Flexible practice opportunities accessible anytime, anywhere",
    "Personalized insights to identify strengths and areas for improvement",
    "Authentic interview simulations to boost real-world readiness",
    "Comprehensive preparation across diverse interview formats and styles"
];


  const faqs = [
  {
    question: "Tell me about yourself?",
    answer:
      "I am a dedicated [Your Current Position, e.g., 'B.Tech student specializing in Computer Science'] with a strong passion for [specific area of interest, e.g., 'Artificial Intelligence and Machine Learning']. I am currently focusing on enhancing my skills in data structures, algorithms, and web development. Throughout my academic career, I’ve developed proficiency in various programming languages such as [languages you know, e.g., Python, C++, Java] and have applied them to real-world projects. I am eager to further develop my technical skills and contribute meaningfully to a challenging role in the [specific field]."
  },
  {
    question: "Why should we hire you?",
    answer:
      "You should hire me because I bring a combination of strong technical skills and a passion for problem-solving. I have consistently demonstrated my ability to [specific skill or attribute, e.g., 'design and implement complex algorithms,' 'build scalable software solutions'] through my [projects/internships]. I am committed to continuous learning, and I thrive in dynamic and challenging environments. My ability to collaborate in team settings, coupled with my technical expertise, will allow me to make a meaningful contribution to your team and help achieve the company's goals."
  },
  {
    question: "What are your short term and long term goals?",
    answer:
      "In the short term, my goal is to build on my current skill set by working in a practical, hands-on environment. I aim to refine my problem-solving and coding skills, and contribute to impactful projects in the [field, e.g., 'AI and software development']. In the long term, I see myself growing into a leadership role where I can not only contribute technically but also mentor others, lead teams, and drive key initiatives that shape the direction of [specific area of interest, e.g., 'artificial intelligence in healthcare']. I also plan to pursue further certifications or education to deepen my expertise."
  },
  {
    question: "Tell us more about your projects and internships?",
    answer:
      "I’ve worked on several projects during my academic career, including [Project Name 1], where I developed a [brief description of project, e.g., 'web application for tracking fitness data']. In my internship at [Company Name], I had the opportunity to [mention key responsibilities and achievements]. I also contributed to [mention a significant outcome of the internship, e.g., 'improving data analysis processes that resulted in a 20% reduction in processing time']."
  },
  {
    question: "Tell us more about past experience?",
    answer:
      "I have gained experience through various internships and projects. My most recent internship was at [Company Name], where I worked on [specific task or project, e.g., 'analyzing large datasets to uncover insights for business strategy']. During this role, I [mention responsibilities or results, e.g., 'streamlined workflows to reduce the time required for data processing by 20%']. I also worked on [mention any relevant projects] which helped me apply theoretical knowledge in real-world applications."
  },
  {
    question: "What are your biggest achievements till date?",
    answer:
      "Some of my biggest achievements include:\n1. Successfully leading a team during [Hackathon/Event Name] where we developed [mention the product] in just 48 hours, and securing [mention position/award].\n2. Improving [specific achievement, e.g., 'data visualization techniques during my internship at Company Name'], which resulted in [mention impact].\n3. Achieving a [mention academic achievement, e.g., 'CGPA of 9.27'] while balancing academic projects, internships, and extra-curricular activities."
  },
  {
    question: "Where do you see yourself in 5 years?",
    answer:
      "In 5 years, I see myself as an expert in my field, contributing to high-impact projects in [specific area of interest, e.g., 'machine learning and AI']. I aim to have progressed into a leadership role where I am leading a team, mentoring junior colleagues, and driving innovative projects. I also plan to continue learning and growing, whether through certifications or advanced degrees, to stay at the forefront of the industry."
  },
  {
    question: "What are your strengths and weaknesses?",
    answer:
      "Strengths: I am a quick learner and highly adaptable, which helps me thrive in dynamic environments. I am also detail-oriented, with a strong ability to analyze problems and create efficient solutions. My ability to collaborate and communicate effectively in team settings has been a key strength throughout my projects and internships.\n\nWeaknesses: One area I’ve been working on is [mention a weakness, e.g., 'being overly critical of my own work']. I have realized that this sometimes slows me down, so I’ve been focusing on balancing high standards with efficiency. I am also working on improving my [mention another area, e.g., 'presentation skills'] by seeking out opportunities to present and receive feedback."
  },
  {
    question: "Do you have any questions for me?",
    answer:
      "Yes, I do have a few questions:\n1. What does success look like in this role, and how is it measured?\n2. Could you tell me more about the team I will be working with and how they collaborate?\n3. What are some of the biggest challenges the team/company is currently facing, and how could I contribute to overcoming them?"
  }
];


  useEffect(() => {
    const currentTitle = titles[currentTitleIndex];

  if (displayedText === currentTitle) {
    // Pause before switching to the next title
    setTimeout(() => {
      setCurrentTitleIndex((prevIndex) => (prevIndex + 1) % titles.length);
      setDisplayedText(""); // Reset for the next title
    }, pauseDuration);
  } else {
    // Typing characters
    const timeout = setTimeout(() => {
      setDisplayedText((prev) => currentTitle.slice(0, prev.length + 1));
    }, typingSpeed);

    return () => clearTimeout(timeout);
    }
  }, [displayedText, isDeleting, currentTitleIndex]);

  return (
    
    <div>
      <div>
      {/* You can render the CelebrationBanner component here */}
      <CelebrationBanner />
    </div>
      <section className="z-50"></section>
      <section className="z-50">
        <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12 mt-44">
          
            
          <h1 className="mb-4 text-5xl font-extrabold tracking-tight  leading-none text-gray-900 md:text-5xl lg:text-8xl dark:text-white font-serif animate-slideDown">
            Welcome to <span className="text-transparent font-serif font-bold bg-gradient-to-r from-blue-400 via-blue-700 to-blue-400 bg-clip-text animate-shine "> PrepPal </span>
            </h1>
            <h4 className="text-4xl font-serif font-bold text-gray-800 md:text-5xl dark:text-white">

 <span className="text-transparent font-serif font-bold bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500 bg-clip-text animate-shine">
  {displayedText}
</span>

<span className="typed-cursor" aria-hidden="true">|</span>

</h4>


           
         
          <p className="font-serif mb-8 text-lg text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">
           
          </p>
          <div className="flex flex-col mb-8 lg:mb-16 space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
            <a
              href="/dashboard"
              className="font-serif inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-gradient-to-r from-blue-400 to-blue-700 bg-[length:200%_100%] animate-shine hover:animate-blink focus:ring-4 focus:ring-primary-300 dark:focus:ring-blue-900"
            >
              Get started for free
              <svg
                className="ml-2 -mr-1 w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </a>

            <a
              href="https://www.youtube.com/watch?v=2vU5MoO1ZSM"
              target="_blank"
              rel="noopener noreferrer"
              className="font-serif inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-gray-900 rounded-lg border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
            >
              <svg
                className="mr-2 -ml-1 w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z"></path>
              </svg>
              Need Motivation?
            </a>
          </div>
        </div>
      </section>
   <div className="mt-20 relative w-[70%] h-auto align-middle mx-auto rounded-xl overflow-hidden md:w-[80%] lazyload animate-slideUp border-2 shadow-[0px_-4px_50px_6px_rgba(0,0,0,0.7)] dark:shadow-[0px_-4px_50px_6px_rgba(255,255,255,0.7)] hidden lg:block md:block">
  <Image
    alt="hero-dashboard"
    src="/firstpic.png"
    width={1296}
    height={640}
    className="h-auto w-full object-cover"
    loading="lazy"
    decoding="async"
    quality={75}
    sizes="(max-width: 1920px) 100vw, 1920px"
  />
</div>

      
      <section className="bg-white z-50 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12 dark:bg-[rgb(11,10,10)] dark:text-white mt-44">
        <h2 className="text-3xl md:text-4xl font-serif text-center mb-12 text-gray-900 dark:text-white">How it Works?</h2>
        <h2 className="font-serif text-md text-gray-500 dark:text-gray-400">
          Give mock interview in just 3 simple easy steps
        </h2>
        <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          <a className="block rounded-xl border bg-white border-gray-200 p-8 shadow-xl transition hover:border-blue-500/10 hover:shadow-blue-500/10 dark:bg-gray-900 dark:border-gray-700 dark:hover:border-blue-500/10" href="/dashboard">
            <AtomIcon className="h-8 w-8" />
            <h2 className="mt-4 text-xl font-serif text-black font-bold dark:text-white">Enter the Details</h2>
            <p className="font-serif mt-1 text-sm text-gray-600 dark:text-gray-400">
              PrepPal tailors your interview prep experience to your specific
              needs. Simply input your job role, years of experience, and tech
              stack, and PrepPal’s AI will generate customized practice
              questions, ensuring you’re fully prepared for your job position.
            </p>
          </a>
          <a className="block rounded-xl border bg-white border-gray-200 p-8 shadow-xl transition hover:border-blue-500/10 hover:shadow-blue-500/10 dark:bg-gray-900 dark:border-gray-700 dark:hover:border-blue-500/10" href="/dashboard">
            <Edit className="h-8 w-8" />
            <h2 className="mt-4 text-xl font-serif text-black font-bold dark:text-white">Take Interview</h2>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400 font-serif">
              Enhance your interview preparation by enabling your camera and microphone to simulate a real interview environment. Practice face-to-face communication, refine your responses, and build the confidence you need to excel in actual interviews.
            </p>
          </a>
          <a className="block rounded-xl border bg-white border-gray-200 p-8 shadow-xl transition hover:border-blue-500/10 hover:shadow-blue-500/10 dark:bg-gray-900 dark:border-gray-700 dark:hover:border-blue-500/10" href="/dashboard">
            <Share2 className="h-8 w-8" />
            <h2 className="mt-4 text-xl font-serif text-black font-bold dark:text-white">Learn from the Feedback</h2>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400 font-serif">
             After each practice interview, review the feedback provided by our
              AI system. This invaluable insight highlights your strengths and
              areas for improvement, allowing you to refine your responses.
            </p>
          </a>
        </div>
      </section>
      <section className="py-20 bg-white dark:bg-[hsl(0,5%,4%)] mt-44">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl md:text-4xl font-serif text-center mb-12 text-gray-900 dark:text-white">Why Choose PrepPal?</h2>
                <div className="max-w-3xl mx-auto">
                    {benefits.map((benefit, index) => (
                        <motion.div
                            key={index}
                            className="flex items-center mb-4"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <CheckCircle className="w-6 h-6 text-green-500 dark:text-green-400 mr-4 flex-shrink-0" />
                            <p className="text-lg font-serif text-gray-700 dark:text-gray-300">{benefit}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
<section
  id="bottom"
  className="bg-white z-50 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12 dark:bg-[rgb(11,10,10)] dark:text-white mt-36"
>
  <h2 className="text-3xl md:text-4xl font-serif text-center mb-12 text-gray-900 dark:text-white">
    Frequently Asked HR Questions
  </h2>
  <Accordion type="single" collapsible className="mt-10 space-y-4">
    {faqs.map((faq, index) => (
      <AccordionItem
        key={index}
        value={`item-${index}`}
        className="block rounded-xl border bg-white border-gray-200 p-1 shadow-xl transition hover:border-blue-500/10 hover:shadow-blue-500/10 dark:bg-gray-900 dark:border-gray-700 dark:hover:border-blue-500/10"
      >
        <AccordionTrigger className="text-lg font-serif text-black px-4 py-2 rounded-t-lg dark:text-white">
          {faq.question}
        </AccordionTrigger>
        <AccordionContent className="text-gray-400 px-4 py-3 bg-gray-900 rounded-b-lg font-serif">
          {faq.answer}
        </AccordionContent>
      </AccordionItem>
    ))}
  </Accordion>
</section>
<footer className="w-full bg-gray-900 text-white py-5 dark:bg-gray-900 sm:mt-10 mt-10 md:mt-10 lg:mt-10">
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row justify-between items-center lg:items-start space-y-6 lg:space-y-0">
           
            <div className="flex flex-col items-center lg:items-start">
                <Image
                                src="/fulllogo-.png"
                                width={100}
                                height={100}
                                alt="PrepPal logo"
                                className="h-10 w-auto"
                              />
                <p className="text-center lg:text-left text-gray-400">Prep with PrepPal to ace your next interview</p>
            </div>
           
            <div className="flex flex-col lg:flex-row lg:space-x-8 text-center lg:text-left">
                <div className="w-full lg:w-auto grid grid-cols-1 sm:grid-cols-2 gap-4 lg:flex lg:space-x-8">
                    <div>
  
                        <ul className="space-y-2">
  <li>
    <a 
      href="mailto:yeddulamadhu6@gmail.com" 
      className="hover:underline" 
      target="_blank" 
      rel="noopener noreferrer"
    >
      Contact
    </a>
  </li>
  <li>
    <a 
      href="https://www.linkedin.com/company/preppalpage" 
      className="hover:underline" 
      target="_blank" 
      rel="noopener noreferrer"
    >
      Social
    </a>
  </li>
  <li>
    <a 
      href="https://github.com/ymadhumohanreddy/The-Preppal" 
      className="hover:underline" 
      target="_blank" 
      rel="noopener noreferrer"
    >
      Contribute
    </a>
  </li>
</ul>

                    </div>
                </div>
            </div>
        </div>
        <div className="mt-8 border-t border-gray-700 pt-6 text-center lg:text-left flex flex-col lg:flex-row justify-between items-center">
            <p className="text-gray-400">© 2025 PrepPal. All rights reserved.</p>
        </div>
    </div>
</footer>
    </div>
    
  );
}
