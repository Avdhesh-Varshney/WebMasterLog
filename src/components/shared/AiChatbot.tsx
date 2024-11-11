"use client"
import React, { useEffect } from "react";

// Extend the window interface to include embeddedChatbotConfig
declare global {
    interface Window {
        embeddedChatbotConfig: {
            chatbotId: string;
            domain: string;
        };
    }
}

const AiChatbot: React.FC = () => {
    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://www.chatbase.co/embed.min.js";
        script.async = true;
        script.defer = true;
        script.setAttribute("chatbotId", "YJ6lehRmu3_unZYXxrD1h");
        script.setAttribute("domain", "www.chatbase.co");

        document.body.appendChild(script);

        // Define the chatbot config after the script is added
        window.embeddedChatbotConfig = {
            chatbotId: "YJ6lehRmu3_unZYXxrD1h",
            domain: "www.chatbase.co",
        };

        return () => {
            document.body.removeChild(script); // Clean up the script when component unmounts
        };
    }, []);

    return null; // This component doesn't render any visible elements
};

export default AiChatbot;
