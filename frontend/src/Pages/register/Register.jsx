import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import useSubmitData from '../../hooks/useSubmitData.jsx'

import AppIcon from '../../assets/AppIcon.jsx';
import LoadingSpinner from '../../ui/widgets/LoadingSpinner.jsx'

function Register() {

    const navigate = useNavigate();
    const { setData: setRegisterData, loading: registerLoading, error: registerError, response: registerResponse, handleSubmit: registerSubmit } = useSubmitData(`/auth/register`);
    const [error, setError] = useState(false);
    const [passwordInputType, setPasswordInputType] = useState("password")

    useEffect(() => {

        if (registerResponse?.success === false) {
            setError(registerResponse.message);
            return;
        }

        if (registerResponse?.success) {
            navigate("/")
        }
    }, [registerResponse])

    // Handlers
    const handlePasswordVisibleClick = (e) => {
        e.preventDefault();
        if (passwordInputType === "password") {
            setPasswordInputType("text");
        } else {
            setPasswordInputType("password");

        }
    }

    const handleFormChange = (e) => {
        setRegisterData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }))
    }

    const handleSubmitNewUser = async (e) => {
        e.preventDefault();
        await registerSubmit();

    }

    return (
        <div className="flex items-center justify-center w-full h-full bg-gradient-to-tr from-tertiary-color to-secondary-color">
            <div className="flex flex-col w-[800px] h-[500px] rounded-lg">

                <div className="flex h-10 w-full justify-start text-3xl -tracking-wider">
                    <div className="flex pl-1 h-full items-center">
                        <AppIcon dimensions={30} />
                    </div>
                    <div className="pl-5 flex items-end h-full">
                        Personal finance - register
                    </div>
                </div>

                <form onSubmit={handleSubmitNewUser} className="flex flex-col w-full">
                    <div className="w-full flex pt-10 pl-1 pr-1">
                        <div className="flex w-1/2">
                            <input className="border border-grey-border-color text-primary-color bg-secondary-color rounded-lg w-full pt-2 pb-2 pl-5 pr-5 focus:border-accent-color-main focus:outline-none hover:border-accent-color-main" type="text" name="firstname" onChange={handleFormChange} required placeholder="First name" />
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" className="stroke-light-grey stroke-2 fill-none relative right-8 top-3">
                                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                <circle cx="12" cy="7" r="4"></circle>
                            </svg>
                        </div>
                        <div className="flex w-1/2">
                            <input className="border border-grey-border-color text-primary-color bg-secondary-color rounded-lg w-full pt-2 pb-2 pl-5 pr-5 focus:border-accent-color-main focus:outline-none hover:border-accent-color-main" type="text" name="lastname" onChange={handleFormChange} required placeholder="Last name" />
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" className="stroke-light-grey stroke-2 fill-none relative right-8 top-3">
                                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                <circle cx="12" cy="7" r="4"></circle>
                            </svg>
                        </div>
                    </div>

                    <div className="w-full flex pt-3 pl-1 pr-1">
                        <input className="border border-grey-border-color text-primary-color bg-secondary-color rounded-lg w-full pt-2 pb-2 pl-5 pr-5 focus:border-accent-color-main focus:outline-none hover:border-accent-color-main" type="text" name="email" onChange={handleFormChange} required placeholder="E-mail" />
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" className="stroke-light-grey stroke-2 fill-none relative right-8 top-3">
                            <circle cx="12" cy="12" r="4"></circle>
                            <path d="M16 12v1a3 3 0 0 0 6 0v-1a10 10 0 1 0-3.92 7.94"></path>
                        </svg>
                    </div>

                    <div className="w-full flex pt-3 pl-1 pr-1">
                        <input className="border border-grey-border-color text-primary-color bg-secondary-color rounded-lg w-full pt-2 pb-2 pl-5 focus:border-accent-color-main focus:outline-none hover:border-accent-color-main" type={passwordInputType} name="password" onChange={handleFormChange} required placeholder="Password" />
                        {
                            passwordInputType === "password" ? (
                                <svg onClick={handlePasswordVisibleClick} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" className="stroke-light-grey stroke-2 fill-none relative right-8 top-1/2 -translate-y-1/2 cursor-pointer hover:stroke-primary-color">
                                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                                    <line x1="1" y1="1" x2="23" y2="23"></line>
                                </svg>
                            ) : (
                                <svg onClick={handlePasswordVisibleClick} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" className="stroke-light-grey stroke-2 fill-none relative right-8 top-1/2 -translate-y-1/2 cursor-pointer hover:stroke-primary-color">
                                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                    <circle cx="12" cy="12" r="3"></circle>
                                </svg>
                            )
                        }
                    </div>

                    <div className="flex flex-col mt-3 justify-center pt-3 pl-1 pr-1">
                        <div className="mb-5">
                            <button className="border border-grey-border-color bg-secondary-color hover:border-accent-color-main focus:border-accent-color-main rounded-lg pt-2 pb-2 pl-5 pr-5 focus:outline-none" type="submit">
                                Register
                            </button>
                        </div>
                    </div>

                </form>
                {
                    (error || registerError) && (
                        <div className="text-center w-full border border-accent-color-secondary rounded-lg p-2">
                            {error}
                        </div>
                    )
                }
                {
                    registerLoading && (
                        <LoadingSpinner />
                    )
                }
            </div>
        </div>
    );
}

export default Register