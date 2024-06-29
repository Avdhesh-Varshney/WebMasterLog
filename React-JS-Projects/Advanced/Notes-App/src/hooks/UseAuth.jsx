import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, db, googleProvider } from "../config/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { AuthContext } from "../contexts/AuthContext";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function UseAuth() {

    const [currentUser, setCurrentUser] = useState(null);
    const [authLoading, setLoading] = useState(false)
    const [fetchingUser, setFetchingUser] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            setFetchingUser(true);
            if (user) {
                const snapShot = await getDoc(doc(db, "users", user.uid));
                if (snapShot.exists()) {
                    const userData = snapShot.data();
                    userData.id = user.uid;
                    setCurrentUser(userData);
                } else {
                    setCurrentUser(null);
                }
            } else {
                setCurrentUser(null);
            }
            setFetchingUser(false);
        });

        return () => unsubscribe();
    }, []);


    const registerWithEmailPassword = async ({ username, email, password }) => {
        try {
            setLoading(true)
            const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
            const userId = userCredentials.user.uid;
            const userData = {
                username: username,
                email: email,
                regDateTime: new Date()
            }
            await setDoc(doc(db, 'users', userId), userData)
            console.log("success")
            navigate("/registrationSuccess")
        } catch (error) {
            if (error.message.includes("email-already-in-use")) {
                toast.error("Provided email has been already taken. You can login or try another email!")
            }else {
                toast.error("Unable to process your request now. Please try again later!")
            }
        } finally {
            setLoading(false)
        }
    }

    const loginWithEmailPassword = async ({ email, password }) => {
        try {
            setLoading(true)
            await signInWithEmailAndPassword(auth, email, password);
            await fetchCurrentUser()
            navigate("/")

        } catch (error) {
            console.log(error)
            if (error.message.includes("invalid-credential")) {
                toast.error("Invalid email or password!")
            }else {
                toast.error("Unable to process your request now. Please try again later!")
            }
        } finally {
            setLoading(false)
        }
    }

    const registerWithGoogle = async () => {
        try {
            const userCredentials = await signInWithPopup(auth, googleProvider)
            const user = userCredentials.user;
            const userData = {
                username: user.displayName.split(" ")[0],
                email: user.email,
                regDateTime: new Date()
            }
            await setDoc(doc(db, 'users', user.uid), userData)
            navigate("/registrationSuccess")
        } catch (error) {
            toast.error(error.message)
        }
    }

    const loginWithGoogle = async () => {
        try {
            const userCredentials = await signInWithPopup(auth, googleProvider)
            const user = userCredentials.user;
            const userData = {
                username: user.displayName.split(" ")[0],
                email: user.email,
                regDateTime: new Date()
            }
            await setDoc(doc(db, 'users', user.uid), userData)
            navigate("/")
        } catch (error) {
            toast.error(error.message)
        }
    }

    const logout = async () => {
        try {
            await auth.signOut();
            fetchCurrentUser()
            navigate("/login")
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    const fetchCurrentUser = async () => {
        setFetchingUser(true)
        auth.onAuthStateChanged(async (user) => {

            setCurrentUser(null)
            if (!user) {
                setFetchingUser(false)
                return
            }
            const snapShot = await getDoc(doc(db, "users", user.uid))
            if (snapShot.exists()) {
                const u = snapShot.data();
                u.id = user.uid;
                setCurrentUser(u)
            } else {
                setCurrentUser(null)
            }
            setFetchingUser(false)

        })
    }

    return {
        currentUser,
        authLoading,
        fetchingUser,
        registerWithEmailPassword,
        registerWithGoogle,
        loginWithEmailPassword,
        loginWithGoogle,
        logout,
        fetchCurrentUser
    }
}

function AuthWrapper({ children }) {
    const { currentUser,
        authLoading,
        fetchingUser,
        registerWithEmailPassword,
        registerWithGoogle,
        loginWithEmailPassword,
        loginWithGoogle,
        logout,
        fetchCurrentUser } = UseAuth()

    return (
        <AuthContext.Provider
            value={{
                currentUser,
                authLoading,
                fetchingUser,
                registerWithEmailPassword,
                registerWithGoogle,
                loginWithEmailPassword,
                loginWithGoogle,
                logout,
                fetchCurrentUser
            }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthWrapper;
