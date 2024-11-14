import { FaCheck } from "react-icons/fa";
import Button from "../../components/Button";

function RegistrationSuccess() {

    const onGetStart =  () => {
        window.location.href =  "/"
    }

    return (

        <section className="grid place-items-center w-100 h-screen bg-white">
            <div className="w-full sm:w-2/3 lg:w-1/3 bg-slate-100 p-3 text-center">
                <FaCheck className="text-white bg-green-500 h-28 w-28 rounded-full p-4 mx-auto my-4"/>
                <h1 className="text-xl my-5 font-bold text-center">Congratulations, You account has been successfully created!</h1>
                <Button
                    text="Let's Get start"
                    width="w-full"
                    bg="bg-green-500"
                    hover="hover:bg-green-600"
                    focus="focus:ring-green-300"
                    color="text-white"
                    onClick={onGetStart}
                    loading={false}
                />
            </div>
        </section>

    )
}

export default RegistrationSuccess;