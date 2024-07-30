import { Idx } from "../../constant";

function Option({ value, idx, handleClick, trueAnswer, userAnswer, summary }) {
  return (
    <div
      style={
        userAnswer?.answer !== trueAnswer &&
          userAnswer?.answer === value &&
          summary
          ? {
            background: "rgb(254 202 202 / 1)",
            color: "rgb(127 29 29/ 1)",
          }
          : {}
      }
      className={`flex items-center space-x-3 mb-5 text-neutral-600 bg-neutral-200/50 rounded-full py-3 px-3  text-xs md:text-sm active:text-neutral-50 active:bg-orange-500/90  ${!summary &&
        "md:hover:bg-orange-500/90 md:hover:text-neutral-50 cursor-pointer"
        } ${trueAnswer === value && summary
          ? "bg-green-200 text-green-800 font-semibold"
          : "font-medium "
        }`}
      onClick={() => handleClick && handleClick(value)}
    >
      <p>{Idx[idx]}.</p>

      <p>{value}</p>
    </div>
  );
}

export default Option;
