import Link from "next/link";
import categories from "../public/categories.json"

export default function Home() {

  return (

    <div 
      className="max-w-xl mx-auto mt-8 p-8 border-2 border-blue-600 rounded relative text-center"
    >
      <h1 
        className="text-4xl font-bold"
      >
        Quiz Place
      </h1>
      <p 
        className="my-8"
      >
        Are you ready to test your knowledge and skills in various programming languages? Quiz Place offers a fun and interactive way to challenge yourself with quizzes.
      </p>
      <div 
        className="flex gap-3 flex-shrink flex-grow flex-wrap items-center w-full justify-center"
      >
        {
          categories.map((category) => {
            return (
              <Link 
                href={`/quiz/${category.id}`}
              >
                <button 
                  className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 uppercase"
                >
                  {category.name}
                </button>
              </Link>
            )
          })
        }
      </div>

    </div>
  );
}
