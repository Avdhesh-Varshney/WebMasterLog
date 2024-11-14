import { useContext, useEffect, useState } from "react";
import AuthContainer from "../../components/AuthContainer";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { Link, useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import { AuthContext } from "../../contexts/AuthContext";

function Login() {
    const [inputs, setInputs] = useState({ email: "", password: "" })
    const [errors, setErrors] = useState({ email: "", password: "" })
    const { currentUser, authLoading, loginWithEmailPassword, loginWithGoogle } = useContext(AuthContext)
    const navigate = useNavigate()

    useEffect(() => {
        if (currentUser) {
            navigate("/")
        }
    }, [])

    const onInputChange = (name, value) => {
        setErrors(prev => {
            return { ...prev, [name]: ""}
        })
        setInputs(prev => {
            return { ...prev, [name]: value }
        });
    }

    const onSubmit = (e) => {
        e.preventDefault();
    }
    
    const onLoginWithEmailPassword = (e) => {
        e.preventDefault();
        const newErrors = validateInputs(inputs);

        if (Object.keys(newErrors).length !== 0) {
            setErrors(prev => {
                return {...prev, ...newErrors}
            });
            return;
        }
        loginWithEmailPassword(inputs)
    }

    return (

        <AuthContainer onSubmit={onSubmit} title="NoteNova - Login to continue!">
            <Input
                label="Email"
                type="email"
                placeholder="john123@gmail.com"
                name="email"
                value={inputs.email}
                error={errors.email}
                onChange={onInputChange}
            />
            <Input
                label="Password"
                type="password"
                placeholder="********"
                name="password"
                value={inputs.password}
                error={errors.password}
                onChange={onInputChange}
            />
            <Button 
                text="Login now" 
                width="w-full"
                bg="bg-pink-500"
                hover="hover:bg-pink-600"
                focus="focus:ring-pink-300"
                color="text-white"
                loading={authLoading}
                onClick={onLoginWithEmailPassword}
            />
            <div className="relative text-center w-full mt-4 text-sm">
                <span>OR</span>
            </div>
            <Button 
                text={<><FaGoogle/>Continue with Google</>}
                width="w-full"
                bg="bg-pink-100"
                hover="hover:bg-pink-200"
                focus="focus:ring-pink-300"
                color="text-pink-700"
                onClick={loginWithGoogle}
            />
            <p className="mt-4 text-sm">New member? <Link to='/register' className="text-pink-400 hover:underline">Create Account</Link></p>

        </AuthContainer>

    )
}

export default Login;


function validateInputs(inputs) {

    const { email, password } = inputs;

    let errors = {};

    if (email.trim() === "") {
        errors.email = "Email is required!"
    }else if(!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(email)) {
        errors.email = "Invalid email address!"
    }

    if (password.trim() === "") {
        errors.password = "Password is required!"
    }else if(password.trim().length < 8) {
        errors.password = "Password must have atleast 8 characters!"
    }

    return errors;

}