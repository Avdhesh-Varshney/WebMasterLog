import React, { useEffect, useState } from "react";
import "../../app/globals.css";

const ProgressBar = () => {
    const [scrollPercent, setScrollPercent] = useState(0);

    const updateProgressBar = () => {
        const scrollTop =
            document.documentElement.scrollTop || document.body.scrollTop;
        const scrollHeight =
            document.documentElement.scrollHeight -
            document.documentElement.clientHeight;
        const scrollProgress = (scrollTop / scrollHeight) * 100;
        setScrollPercent(scrollProgress);
    };

    useEffect(() => {
        window.addEventListener("scroll", updateProgressBar);
        return () => window.removeEventListener("scroll", updateProgressBar);
    }, []);

    const progressBarColor = "bg-blue-500";
    const containerBackgroundColor = "bg-black";

    return (
        <div
            id="progressBarContainer"
            className={`fixed top-0 left-0 w-full h-[3px] z-[9999] ${containerBackgroundColor}`}
        >
            <div
                id="progressBar"
                className={`h-full transition-all ease-linear ${progressBarColor}`}
                style={{ width: `${scrollPercent}%` }}
            ></div>
        </div>
    );
};

export default ProgressBar;
