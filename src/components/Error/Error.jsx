import Lottie from "lottie-react";
import err from "../../assets/404.json";
import './Error.css'
function Error(){
  return (
    <center className="flex">
      <div>
        <Lottie animationData={err}/>
      </div>

      <a href='/'> <button className="but">HOME</button> </a>
    </center>
  )
}

export default Error;