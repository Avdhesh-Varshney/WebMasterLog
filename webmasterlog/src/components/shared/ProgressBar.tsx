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

    const progressBarColor = "blue"; // Change as per your color choice
    const containerBackgroundColor = "black";

    return (
        <div
            id="progressBarContainer"
            style={{ backgroundColor: containerBackgroundColor }}
        >
            <div
                id="progressBar"
                style={{
                    width: `${scrollPercent}%`,
                    backgroundColor: progressBarColor,
                }}
            ></div>
        </div>
    );
};

export default ProgressBar;
