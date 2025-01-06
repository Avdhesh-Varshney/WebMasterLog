import React from 'react';

function Resume() {
  return (
    <>
      {/* Grid of Downloadable Resources */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 mt-7">
        {[ 
          { title: "HTML", image: "https://www.codewithharry.com/img/notes/html.webp", link: "https://cwh-full-next-space.fra1.cdn.digitaloceanspaces.com/notes/HTML_Complete_Notes.pdf" },
          { title: "CSS", image: "https://www.codewithharry.com/img/notes/css.webp", link: "https://cwh-full-next-space.fra1.cdn.digitaloceanspaces.com/notes/CSS_Complete_Notes.pdf" },
          { title: "JavaScript", image: "https://www.codewithharry.com/img/notes/js.webp", link: "https://cwh-full-next-space.fra1.cdn.digitaloceanspaces.com/notes/JS_Chapterwise_Notes.pdf" },
          { title: "React", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQij9uDL_BAEPp_gqSI8ug_CJCjLdyw4oLDUw&s", link: "https://drive.google.com/file/d/1688SoMN4OX1hQBXxjiRuOicjH5idIjwO/view?usp=sharing" },
          { title: "Python", image: "https://i0.wp.com/junilearning.com/wp-content/uploads/2020/06/python-programming-language.webp?fit=1920%2C1920&ssl=1", link: "https://drive.google.com/file/d/1XE12hZBnbUMJeC614Ikoi2h2eRE73oPR/view?usp=sharing" },
          { title: "Java", image: "https://www.codewithharry.com/img/notes/java.webp", link: "https://drive.google.com/file/d/1XM0Oo-TislceCX0sTz4UfgJ4pT_8vt5O/view?usp=sharing" },
          { title: "CN,OS,DBMS", image: "https://pbs.twimg.com/profile_images/1550409928740839425/F_REEzQ9_400x400.jpg", link: "https://takeuforward.org/interviews/must-do-questions-for-dbms-cn-os-interviews-sde-core-sheet/" },
          { title: "DSA", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTy5c_SvC6iawJl6SMrU_iDjFtmKodQ9LKFcmh8VFEnUQWkGsdSHikBWarXnoLR6YfBLgo&usqp=CAU", link: "https://github.com/Deeksha2501/Data-Structures-and-Algorithms-Notes" }
          
        ].map((item, index) => (
          <div key={index} className="p-6 flex justify-center">
            <div className="w-full max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
              <div className="flex flex-col items-center p-6">
                <img className="mb-3 w-24 h-24 rounded-full shadow-lg" src={item.image} alt={item.title} />
                <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{item.title}</h5>
                <span className="text-sm text-gray-500 dark:text-gray-400">Get the Notes</span>
                <div className="grid mt-4">
                  <a
                    className="inline-block text-white bg-blue-500 rounded-full px-3 py-2 text-sm font-semibold mr-2 my-1 cursor-pointer hover:bg-blue-700 text-center"
                    href={item.link}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Download
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recommended Courses Section */}
      <div className="container mx-auto lg:my-2">
        {/* Title Section */}
        <h2 className="text-3xl font-medium title-font text-gray-900 my-10 text-center dark:text-white hover:underline">
          Most Reputable
        </h2>

        {/* Courses Container */}
        <div className="flex flex-wrap justify-center mx-6">
          
          {/* Course 1: Python Tutorials */}
          <div className="p-4 md:w-1/3 flex justify-center">
            <div className="max-w-sm rounded-2xl overflow-hidden shadow-lg dark:bg-slate-800">
              <img className="object-contain w-full object-center" src="https://i.ytimg.com/vi/0bHoB32fuj0/hqdefault.jpg?sqp=-oaymwEXCNACELwBSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLBaVe7ndTXmOLmC8Yom2Grzt5dQfg" width="384" height="216" alt="DSA"/>
              <div className="px-6 md:my-11 lg:my-0 md:h-72 lg:h-64 lg:py-4 xl:h-52">
                <span className="tracking-widest text-xs title-font font-medium mb-1 dark:text-gray-400">FREE COURSE</span>
                <div className="title-font flex text-lg font-medium text-gray-900 mb-3 dark:text-white">
                  Data Structures and Algorithms(DSA)
                </div>
                <p className="text-gray-700 text-base dark:text-gray-400">
                Mastering Data Structures and Algorithms (DSA) is crucial for solving complex problems efficiently. This course will guide you through key concepts, techniques, and practical problem-solving skills that are highly valued in technical interviews.
              </p>
              </div>
              <div className="px-6 pt-4 pb-2">
                <a
                className="inline-block text-white bg-blue-500 rounded-full px-3 py-2 text-sm font-semibold mr-2 my-1 cursor-pointer hover:bg-blue-700 text-center"
                href="https://takeuforward.org/strivers-a2z-dsa-course/strivers-a2z-dsa-course-sheet-2/"  // Replace this with the correct download link
                target="_blank"
                rel="noreferrer"
              >
                Learn
              </a>
              <a
                className="inline-block text-white bg-blue-500 rounded-full px-3 py-2 text-sm font-semibold mr-2 my-1 cursor-pointer hover:bg-blue-700 text-center"
                href="https://www.youtube.com/watch?v=0bHoB32fuj0&list=PLgUwDviBIf0oF6QL8m22w1hIDC1vJ_BHz"  // Replace this with the correct download link
                target="_blank"
                rel="noreferrer"
              >
                Start watching
              </a>
            </div>

            </div>
          </div>

          {/* Course 2: Ultimate JavaScript Course */}
          <div className="p-4 md:w-1/3 flex justify-center">
            <div className="max-w-sm rounded-2xl overflow-hidden shadow-lg dark:bg-slate-800">
              <img className="object-contain w-full object-center" src="https://i.ytimg.com/vi/tVzUXW6siu0/hqdefault.jpg?sqp=-oaymwEXCNACELwBSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLDWfGPsuQKuWateaRbWeBo1MDhM3A" width="384" height="216" alt="Ultimate JavaScript Course"/>
              <div className="px-6 md:my-11 lg:my-0 md:h-72 lg:h-64 lg:py-4 xl:h-52">
                <span className="tracking-widest text-xs title-font font-medium mb-1 dark:text-gray-400">FREE COURSE</span>
                <div className="title-font flex text-lg font-medium text-gray-900 mb-3 dark:text-white">
                 Full-stack Web Development
                </div>
                <p className="text-gray-700 text-base dark:text-gray-400">
                    This Full-stack Web Development course offers a deep dive into both front-end and back-end technologies. It covers essential tools and frameworks, equipping you with the skills to build dynamic, responsive web applications. Start learning and master web development!
                  </p>
              </div>
              <div className="px-6 pt-4 pb-2">
                <a
                className="inline-block text-white bg-blue-500 rounded-full px-3 py-2 text-sm font-semibold mr-2 my-1 cursor-pointer hover:bg-blue-700 text-center"
                href="https://www.codewithharry.com/"  // Replace this with the correct download link
                target="_blank"
                rel="noreferrer"
              >
                Learn
              </a>
              <a
                className="inline-block text-white bg-blue-500 rounded-full px-3 py-2 text-sm font-semibold mr-2 my-1 cursor-pointer hover:bg-blue-700 text-center"
                href="https://www.youtube.com/watch?v=tVzUXW6siu0&list=PLu0W_9lII9agq5TrH9XLIKQvv0iaF2X3w"  // Replace this with the correct download link
                target="_blank"
                rel="noreferrer"
              >
                Start watching
              </a>
            </div>
            </div>
          </div>

          {/* Course 3: React JS Tutorials */}
          <div className="p-4 md:w-1/3 flex justify-center">
            <div className="max-w-sm rounded-2xl overflow-hidden shadow-lg dark:bg-slate-800">
              <img className="object-contain w-full object-center" src="https://i.ytimg.com/vi/EddPAllx3sU/maxresdefault.jpg" width="384" height="216" alt="React JS Tutorials"/>
              <div className="px-6 md:my-11 lg:my-0 md:h-72 lg:h-64 lg:py-4 xl:h-52">
                <span className="tracking-widest text-xs title-font font-medium mb-1 dark:text-gray-400">FREE COURSE</span>
                <div className="title-font flex text-lg font-medium text-gray-900 mb-3 dark:text-white">
  Master Communication
              </div>
              <p className="text-gray-700 text-base dark:text-gray-400">
                Effective communication is a vital skill in both personal and professional settings. Additionally, you'll learn how to excel in interviews by mastering the art of articulation and presenting yourself effectively. These videos will help you make a lasting impression.
              </p>


              </div>
              <div className="px-6 pt-4 pb-2">
                <a
                className="inline-block text-white bg-blue-500 rounded-full px-3 py-2 text-sm font-semibold mr-2 my-1 cursor-pointer hover:bg-blue-700 text-center"
                href="https://www.youtube.com/watch?v=g0kzHjmvuYQ"  // Replace this with the correct download link
                target="_blank"
                rel="noreferrer"
              >
                Learn 
              </a>
              <a
                className="inline-block text-white bg-blue-500 rounded-full px-3 py-2 text-sm font-semibold mr-2 my-1 cursor-pointer hover:bg-blue-700 text-center"
                 href="https://www.youtube.com/watch?v=iF6-LkEXWfc"
                  // Replace this with the correct download link
                target="_blank"
                rel="noreferrer"
              >
                Start watching
              </a>
            </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}

export default Resume;
export const metadata = {
  title: "Notes | PrepPal",
  description: "Prep with Prepal to ace your next interview!",
};