import { FaRobot } from "react-icons/fa";

function Welcome() {


    return (
        <div className="flex flex-col items-center justify-center w-full flex-1 p-2 mb-4 bg-transparent text-white">
            <FaRobot className='p-2 rounded-full' size={80}/>
            <h1 className="text-xl font-bold mb-4">Hi there! 👋</h1>
            <p className="mb-4">How can I help you today? Feel free to ask me anything. Here are some ideas to get you started: </p>

            <div className="list-disc *:mb-2 *:text-center">
                <p>🤔 Ask a question: I can provide summaries of factual topics or create stories.</p>
                <p>📄 Request a task: Need help writing an email or essay?</p>
                <p>💬 Start a discussion: Let's chat about your interests!</p>
            </div>

        </div>
    )

}

export default Welcome;