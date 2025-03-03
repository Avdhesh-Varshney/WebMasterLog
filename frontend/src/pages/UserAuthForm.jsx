import AnimationWrapper from "../common/page-animation";
import InputBox from "../components/InputBox";
import { Link } from "react-router-dom";

const UserAuthForm = ({ type }) => {
    return (
        <AnimationWrapper keyValue={type}>
            <section className="py-4 px-[5vw] md:px-[7vw] lg:px-[10vw] h-cover flex items-center justify-center">
                <form className="w-[80%] max-w-[400px]">
                    <h1 className="text-4xl font-gelasio capitalize text-center mb-24">
                        {type === "login" ? "Welcome back" : "Join us today"}
                    </h1>

                    {
                        type !== "login" ?
                            <InputBox
                                name="fullname"
                                type="text"
                                placeholder="Full Name"
                                icon="fi-rr-user"
                            />
                            : ""
                    }

                    <InputBox
                        name="email"
                        type="email"
                        placeholder="Email"
                        icon="fi-rr-envelope"
                    />

                    <InputBox
                        name="password"
                        type="password"
                        placeholder="Password"
                        icon="fi-rr-key"
                    />

                    <button
                        className="btn-dark center mt-14"
                        type="submit"
                    >
                        {type === "login" ? "Login" : "Sign Up"}
                    </button>

                    <div className="relative w-full flex items-center gap-2 my-10 opacity-10 uppercase text-black font-bold">
                        <hr className="w-1/2 border-black" />
                        <p>or</p>
                        <hr className="w-1/2 border-black" />
                    </div>

                    <button className="btn-dark flex items-center justify-center gap-4 w-[90%] center">
                        <img src="google.png" alt="" className="w-5" />
                        continue with google
                    </button>

                    {
                        type === "login" ?
                            <p className="mt-6 text-gray-700 text-xl text-center">
                                Don't have an account ?
                                <Link to="/signup" className="text-black text-xl ml-1 underline">
                                    Join us today
                                </Link>
                            </p>
                            :
                            <p className="mt-6 text-gray-700 text-xl text-center">
                                Already a member ?
                                <Link to="/login" className="text-black text-xl ml-1 underline">
                                    Sign in here
                                </Link>
                            </p>
                    }
                </form>
            </section>
        </AnimationWrapper>
    )
}

export default UserAuthForm;
