import { Types, Level } from "./constant";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import useQuestionStore from "./store/zustand";
import AnimateProvider from "./components/AnimateProvider/AnimateProvider";

function App() {
  const [type, setType] = useState(Types[0].id);
  const [level, setLevel] = useState(Level[0]);
  const { question } = useQuestionStore();
  const navigate = useNavigate();

  const handleBegin = () => {
    const query = `amount=5&category=${type}&difficulty=${level}&type=multiple`;
    navigate(`/question?${query}`, {
      replace: false,
    });
  };

  if (question.length) return <Navigate to={"/question"} />;

  return (
    <AnimateProvider className="flex flex-col text-sm md:mx-auto md:max-w-xl ">
      <h1 className="text-lg font-bold text-slate-800 mb-10">
        Welcome to <span>Bert Quiz</span>
      </h1>

      <h3 className="text-xs md:text-sm text-neutral-600 font-semibold mb-3">
        Select type{" "}
      </h3>
      <select
        className="bg-neutral-50 ring-[1px] ring-gray-200  rounded-lg px-1 py-2 md:py-3  text-xs md:text-sm focus:border-none focus:outline-none focus:ring-[1px] focus:ring-orange-500 text-gray-700 font-medium mb-5"
        name="type"
        onChange={(e) => setType(e.target.value)}
      >
        {Types.map((type) => (
          <option value={type.id} key={type.id}>
            {type.name}
          </option>
        ))}
      </select>

      <h3 className="text-xs md:text-sm text-neutral-600 font-semibold mb-3">
        Select difficulty
      </h3>
      <select
        className="bg-neutral-50 ring-[1px] ring-gray-200  rounded-lg px-1 py-2 md:py-3  text-xs md:text-sm focus:border-none focus:outline-none focus:ring-[1px] focus:ring-orange-500 text-gray-700 font-medium mb-10 capitalize"
        name="level"
        onChange={(e) => setLevel(e.target.value)}
      >
        {Level.map((level) => (
          <option value={level} key={level}>
            {level}
          </option>
        ))}
      </select>

      <button
        className="flex rounded-full bg-orange-500 p-1 py-2 md:py-2 justify-center font-semibold md:font-bold text-sm md:text-base text-center hover:bg-neutral-50 hover:text-orange-500 transition text-white"
        onClick={handleBegin}
      >
        Begin Test
      </button>
    </AnimateProvider>
  );
}

export default App;
