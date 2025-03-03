import axios from "axios";
import { useContext } from "react";
import { Link, Navigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";

import { UserContext } from "../App";
import InputBox from "../components/InputBox";
import { storeInSession } from "../common/session";
import AnimationWrapper from "../common/page-animation";
import { authWithGoogle } from "../common/firebase";

const UserAuthForm = ({ type }) => {

    let { userAuth: { access_token }, setUserAuth } = useContext(UserContext);

    const userAuthThroughServer = async (serverRoute, formData) => {
        axios.post(import.meta.env.VITE_SERVER_DOMAIN + serverRoute, formData)
            .then(({ data }) => {
                storeInSession("user", JSON.stringify(data));
                toast.success("Logged in successfully");
                setUserAuth(data);
            })
            .catch(({ response }) => {
                toast.error(response.data.error);
            })
    }
    const handleSubmit = (e) => {
        e.preventDefault();

        let serverRoute = type == "login" ? "/api/auth/login" : "/api/auth/signup";

        let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;

        let form = new FormData(formElement);
        let formData = {};

        for (let [key, value] of form.entries()) {
            formData[key] = value;
        }

        let { fullname, email, password } = formData;

        if (fullname) {
            if (fullname.length < 3) {
                return toast.error("Full name should be atleast 3 letters long");
            }
        }
        if (!email.length) {
            return toast.error("Email is required");
        }

        if (!emailRegex.test(email)) {
            return toast.error("Invalid email");
        }
        if (!passwordRegex.test(password)) {
            return toast.error("Password should be atleast 6 characters long and contain atleast one uppercase letter, one lowercase letter and one number");
        }
        userAuthThroughServer(serverRoute, formData);
    }

    const handleGoogleAuth = (e) => {
        e.preventDefault();

        authWithGoogle()
            .then(user => {
                let serverRoute = "/api/auth/google-auth";
                let formData = { access_token: user.accessToken };
                userAuthThroughServer(serverRoute, formData);
            })
            .catch(err => {
                toast.error("Failed to authenticate with google");
                return console.log(err);
            })
    }

    return (
        access_token ?
            <Navigate to="/" />
            :
            <AnimationWrapper keyValue={type}>
                <section className="py-4 px-[5vw] md:px-[7vw] lg:px-[10vw] h-cover flex items-center justify-center">
                    <Toaster />
                    <form id="formElement" className="w-[80%] max-w-[400px]">
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
                            onClick={handleSubmit}
                        >
                            {type === "login" ? "Login" : "Sign Up"}
                        </button>

                        <div className="relative w-full flex items-center gap-2 my-10 opacity-10 uppercase text-black font-bold">
                            <hr className="w-1/2 border-black" />
                            <p>or</p>
                            <hr className="w-1/2 border-black" />
                        </div>

                        <button
                            className="btn-dark flex items-center justify-center gap-4 w-[90%] center"
                            onClick={handleGoogleAuth}
                        >
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
