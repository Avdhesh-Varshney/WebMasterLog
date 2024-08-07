
import main from "../assets/hero.png"
function Hero() {
  return (
    <div className="flex w-[80vw] gap-4 justify-center items-center mx-auto ">
      <div className="w-2/3 p-2">
        <h1 className="font-bold font-sans text-[50px]">
          Prepare in seconds, not weekends.
        </h1>
        <p className="text-[20px] ">
          Prepare quiz questions and test your general awarness.
        </p>
      </div>
      <div className="w-1/3">
        <img className="w-full"
          src={main}
          alt=""
        />
      </div>
    </div>
  );
}

export default Hero;
