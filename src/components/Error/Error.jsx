import Lottie from "lottie-react";
import pre from "../../assets/preloader.json";
import './Error.css'
function Error(){
  return (
    <center className="flex">
      <div>
        <Lottie animationData={pre}/>
      </div>

      <a href='/'> <button className="but">HOME</button> </a>
    </center>
  )
}

export default Error;