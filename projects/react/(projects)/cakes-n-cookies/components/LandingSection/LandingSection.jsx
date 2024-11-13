import React from 'react';
import LandingSectionStyle from "./LandingSection.style";

function LandingSection(props) {
    return (
        <LandingSectionStyle className={"relative w-full  lg:p-28 p-16 bg- primary-bg flex flex-col lg:flex-row"}>
            <div className="heading w-full lg:w-2/3 lg:mt-32">
                <h1 className={"lg:text-7xl text-4xl  mb-5 mt-8 font-medium"}>
                    Designer <br/> Cakes <br/> Delivered
                </h1>
                <h2 className="lg:text-5xl text-3xl subtitle font-light">To Your Doorstep</h2>

                <button className={"outline-0 text-white text-2xl font-medium px-10 py-2 bg-pink-400 rounded-xl mt-16 font-bold"}>Explore Menu</button>
            </div>
            <div className="image w-1/6 hidden lg:block">
                <img className={""} src="/images/cake2.jpg" alt=""/>
            </div>
        </LandingSectionStyle>
    );
}

export default LandingSection;