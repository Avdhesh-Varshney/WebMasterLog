import React, { useState } from 'react';
import { FaCirclePlus } from "react-icons/fa6";

interface Faqs {
    id: number;
    question: string;
    answer: string;
}

const FaqsData: Faqs[] = [
    {
        id: 1,
        question: "What is Web Master Log?",
        answer: "Web Master Log is a web development hub designed for developers, designers, and webmasters. It offers resources, tools, and tutorials to enhance web development skills."
    },
    {
        id: 2,
        question: "What kind of Projects are on Web Master Log?",
        answer: "The platform showcases a variety of real-world projects, ranging from beginner-friendly to advanced levels, built with technologies like Angular, Next.js, Node.js, React, Express.js, Redux, Vanilla JavaScript, and Vue.js."
    },
    {
        id: 3,
        question: "How can I explore the projects on Web Master Log?",
        answer: "You can browse all the projects by visiting the Explore Projects section on the website. This section provides access to a wide range of projects, each accompanied by documentation and guides to facilitate learning and collaboration."
    },
    {
        id: 4,
        question: "Can I use the projects on Web Master Log for learning purposes?",
        answer: "Yes! The platform encourages users to explore, learn, and even replicate the projects for educational purposes. Each project includes documentation to help you understand how it works."
    },
    {
        id: 5,
        question: "Is Web Master Log free to use?",
        answer: "Yes, Web Master Log is free to access. Users can explore projects, follow tutorials, and use the resources provided without any cost."
    },
]

const FaqsComponent = () => {
    
    const [openedFaq, setOpenedFaq] = useState<number>(0);

    return (
        <section className='bg-gray-800 py-16 px-8 pb-8 text-gray-200 rounded-lg shadow-lg'>
            <h2 className="text-3xl font-bold text-center mb-6 text-white">
                Frequently Asked Questions
            </h2>
            <div className='flex flex-col gap-6'>
                {
                    FaqsData.map((Faq: Faqs) => {
                        return (
                            <div key={Faq.id} onClick={() => {setOpenedFaq((openedFaq !== Faq.id) ? Faq.id : 0)}} className='p-4 pl-12 rounded-xl bg-gray-900 cursor-pointer flex flex-col text-lg relative'>
                                <FaCirclePlus className={`absolute w-6 transition-all duration-500 h-6 top-4 left-3.5 ${(openedFaq === Faq.id) ? "rotate-45" : "rotate-0"}`} />
                                {Faq.question}
                                <div className={`overflow-hidden transition-all duration-500 text-md w-full flex text-gray-400 h-full ${(openedFaq === Faq.id) ? "max-h-96 scale-100" : "max-h-0 scale-0"}`}>
                                    <div className='p-3 pl-0'>{Faq.answer}</div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </section>
    )
}

export { FaqsComponent }
