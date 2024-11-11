interface QuestionProps {
  question: string;
  choices: string[];
  onSelect: (choice: string) => void;
}

function Question({ question, choices, onSelect }: QuestionProps) {
  return (
    <div className="w-full mt-5">
      <h2 className="text-center text-[25px]">{question}</h2>
      <div className="w-full flex  justify-around mt-10 flex-wra ">
      {choices.map((choice, ind) => (
        <button className="css-button-3d--black" key={ind} onClick={()=>onSelect(choice)}>{choice}</button>
      ))}
      </div>
    </div>
  );
}

export default Question;
