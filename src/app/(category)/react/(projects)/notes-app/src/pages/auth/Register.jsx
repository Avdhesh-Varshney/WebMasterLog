import { useContext, useState } from "react";
import AuthContainer from "../../components/AuthContainer";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { Link } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import { AuthContext } from "../../contexts/AuthContext";

function Register() {
    const [inputs, setInputs] = useState({ username: "", email: "", password: "", cpassword: "" })
    const [errors, setErrors] = useState({ username: "", email: "", password: "", cpassword: "" })
    const { authLoading, registerWithEmailPassword, registerWithGoogle, logout } = useContext(AuthContext)

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

    const onRegisterWithEmailAndPasssword = async () => {
        const newErrors = validateInputs(inputs);

        if (Object.keys(newErrors).length !== 0) {
            setErrors(prev => {
                return {...prev, ...newErrors}
            });
            return;
        }

        registerWithEmailPassword(inputs)
    }

    return (

        <AuthContainer onSubmit={onSubmit} title="NoteNova - Create account!">
            <Input
                label="Username"
                type="username"
                placeholder="John123"
                name="username"
                value={inputs.username}
                error={errors.username}
                onChange={onInputChange}
            />
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
            <Input
                label="Confirm password"
                type="password"
                placeholder="********"
                name="cpassword"
                value={inputs.cpassword}
                error={errors.cpassword}
                onChange={onInputChange}
            />
            <Button 
                text="Register now" 
                width="w-full"
                bg="bg-pink-500"
                hover="hover:bg-pink-600"
                focus="focus:ring-pink-300"
                color="text-white"
                onClick={onRegisterWithEmailAndPasssword}
                loading={authLoading}
            />
            <div className="relative text-center w-full mt-4 text-sm">
                <span>OR</span>
            </div>
            <Button 
                text={<><FaGoogle/>Continue with Google</>}
                width="w-full"
                bg="bg-gray-200"
                hover="hover:bg-gray-300"
                focus="focus:ring-gray-300"
                color="text-pink-700"
                onClick={registerWithGoogle}
                loading={false}
            />
            <p className="mt-4 text-sm">Already a member? <Link to='/login' className="text-pink-400 hover:underline">Login</Link></p>

        </AuthContainer>

    )
}

export default Register;


function validateInputs(inputs) {

    const {username, email, password, cpassword} = inputs;

    let errors = {};

    if (username.trim() === "") {
        errors.username = "Username is required!"
    }else if(username.trim().length <= 3) {
        errors.username = "Username must have atleast 4 characters!"
    }

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

    if (cpassword.trim() === "") {
        errors.cpassword = "Confirm password is required!"
    }else if(cpassword.trim().length < 8) {
        errors.cpassword = "Password must have atleast 8 characters!"
    }else if (password !== cpassword) {
        errors.cpassword = "Password does not match!"
    }

    return errors;

}