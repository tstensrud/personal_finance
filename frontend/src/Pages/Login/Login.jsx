import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";

import { AuthContext } from "../../Context/AuthContext.jsx";


import AppIcon from '../../assets/AppIcon.jsx';
import LoadingSpinner from '../../UI/Widgets/LoadingSpinner.jsx'

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const { dispatch } = useContext(AuthContext);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const [passwordInputType, setPasswordInputType] = useState("password")

    const firebaseLogin = async (e) => {
        e.preventDefault();
        const auth = getAuth();
        setLoading(true);
        await signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                dispatch({ type: "LOGIN", payload: user })
                navigate("home");
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setError(true);
                setErrorMessage(errorMessage);
                setLoading(false);
            });
    }

    const handleForgotPassword = (e) => {
        e.preventDefault();
        const auth = getAuth();
        sendPasswordResetEmail(auth, email)
            .then(() => {
                setErrorMessage(`Følg instruksjoner sendt til ${email}`);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setErrorMessage(errorMessage);
            })
    }

    const handlePasswordVisibleClick = (e) => {
        e.preventDefault();
        if (passwordInputType === "password") {
            setPasswordInputType("text");
        } else {
            setPasswordInputType("password");

        }
    }

    return (
        <div className="flex items-center justify-center w-full h-full bg-gradient-to-tr from-tertiary-color to-secondary-color">
            <div className="pl-5 flex flex-row w-[800px] h-[500px] rounded-lg">
                <div className="flex flex-col w-1/2">
                    <div className="flex h-10 w-full justify-start text-3xl -tracking-wider">
                        <div className="flex h-full items-center">
                            <AppIcon dimensions={30} />
                        </div>
                        <div className="pl-5 flex items-end h-full">
                            Personal finance
                        </div>
                    </div>
                    <div className="pt-10">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="stroke-primary-color stroke-2 fill-none">
                            <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
                            <polyline points="17 6 23 6 23 12"></polyline>
                        </svg>
                    </div>
                    <div className="text-xl">
                        Monthly tracking
                    </div>
                    <div className="text-light-grey">
                        View monthly tracking of your spending, savings and investments.
                    </div>
                    <div className="pt-8">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="stroke-primary-color stroke-2 fill-none">
                            <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>
                        </svg>
                    </div>
                    <div className="text-xl">
                        It's free
                    </div>
                    <div className="text-light-grey">
                        No credit card necessary. Free to use.
                    </div>
                    <div className="pt-8">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="stroke-primary-color stroke-2 fill-none">
                            <circle cx="12" cy="12" r="4"></circle>
                            <path d="M16 12v1a3 3 0 0 0 6 0v-1a10 10 0 1 0-3.92 7.94"></path>
                        </svg>
                    </div>
                    <div className="text-xl">
                        Not registered?
                    </div>
                    <div className="text-light-grey">
                        Register <Link to="register">here</Link> in less than 60 seconds and start tracking your personal finances.
                    </div>
                </div>

                <div className="flex flex-col w-1/2 h-full items-center justify-center">
                    <form>
                        <div className="flex flex-col h-full items-center justify-center">
                            <div className="flex">
                                <input className="border border-grey text-primary-color bg-secondary-color rounded-lg w-full pt-2 pb-2 pl-5 pr-5 focus:border-accent-color-main focus:outline-none hover:border-accent-color-main" type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="E-mail" />
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" className="stroke-grey stroke-2 fill-none relative right-8 top-3">
                                    <circle cx="12" cy="12" r="4"></circle>
                                    <path d="M16 12v1a3 3 0 0 0 6 0v-1a10 10 0 1 0-3.92 7.94"></path>
                                </svg>
                            </div>

                            <div className="flex pt-3">
                                <input className="border border-grey text-primary-color bg-secondary-color rounded-lg w-full pt-2 pb-2 pl-5 pr-5 focus:border-accent-color-main focus:outline-none hover:border-accent-color-main" type={passwordInputType} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
                                {
                                    passwordInputType === "password" ? (
                                        <svg onClick={handlePasswordVisibleClick} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="stroke-grey fill-none relative right-8 top-3 cursor-pointer hover:stroke-primary-color">
                                            <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                                            <line x1="1" y1="1" x2="23" y2="23"></line>
                                        </svg>
                                    ) : (
                                        <svg onClick={handlePasswordVisibleClick} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="stroke-grey fill-none relative right-8 top-3 cursor-pointer hover:stroke-primary-color">
                                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                            <circle cx="12" cy="12" r="3"></circle>
                                        </svg>
                                    )
                                }
                            </div>
                            <div className="flex flex-col mt-3 justify-center">
                                <div className="mb-5">
                                    <button onClick={firebaseLogin} className="border border-grey hover:border-accent-color-main focus:border-accent-color-main rounded-lg pt-2 pb-2 pl-5 pr-5 focus:outline-none" type="submit">
                                        Log inn
                                    </button>
                                </div>
                                <div className="h-10">
                                    {
                                        loading && (
                                            <LoadingSpinner />
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;