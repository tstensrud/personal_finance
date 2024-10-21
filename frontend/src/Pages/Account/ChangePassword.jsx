import { useEffect, useState } from 'react';
import { reauthenticateWithCredential, updatePassword, EmailAuthProvider } from 'firebase/auth';

import Button from '../../UI/formcomponents/Button.jsx';
import Input from '../../UI/formcomponents/Input.jsx';

import ThumbsUpIcon from '../../assets/ThumbsUpIcon.jsx';

function ChangePassword() {

    const [passwordChangeErrorMsg, setPasswordChangeErrorMsg] = useState("");
    const [passwordMatch, setPasswordMatch] = useState(false);
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPass, setConfirmPass] = useState("");

    useEffect(() => {
        if (newPassword && confirmPass) {
            if (newPassword === confirmPass) {
                setPasswordMatch(true)
            } else {
                setPasswordMatch(false);
            }
        }
    }, [newPassword, confirmPass]);

    const handleUpdatePassword = (e) => {
        e.preventDefault();

        if (newPassword.length < 6) {
            setPasswordChangeErrorMsg("Passordet er for kort. Minst 6 tegn");
            return;
        }

        if (passwordMatch) {
            const credentials = EmailAuthProvider.credential(currentUser.email, oldPassword)

            reauthenticateWithCredential(currentUser, credentials).then(() => {
                updatePassword(currentUser, newPassword).then(() => {

                }).catch((error) => {
                    setPasswordChangeErrorMsg("Kunne ikke oppdatere passord")
                });
            })
                .catch((error) => {
                    if (error.message === "Firebase: Error (auth/invalid-credential).") {
                        setPasswordChangeErrorMsg("Gammelt passord er feil")
                    }
                })
        }
    }

    const oldPasswordChange = (e) => {
        e.preventDefault();
        setOldPassword(e.target.value)
    }

    const newPasswordChange = (e) => {
        e.preventDefault();
        setNewPassword(e.target.value)
    }

    const confirmPasswordChange = (e) => {
        e.preventDefault();
        setConfirmPass(e.target.value)
    }

    return (
        <form onSubmit={handleUpdatePassword}>
            <div className="flex flex-1 h-10">
                <div className="w-64">
                    <Input onChange={oldPasswordChange} name="oldpassword" type="password" placeholder={"Old password"} />
                </div>
            </div>
            <div className="flex flex-1 h-10 mt-2">
                <div className="w-64">
                    <Input onChange={newPasswordChange} name="newpassword" type="password" placeholder={"New password"} />
                </div>
            </div>
            <div className="flex flex-1 h-10 mt-2">
                <div className="w-64">
                    <Input onChange={confirmPasswordChange} name="confirmpassword" type="password" placeholder={"Confirm password"} />
                </div>
                <div className="flex pl-10 h-full items-center">
                    {
                        passwordMatch && <ThumbsUpIcon dimensions={24} />
                    }
                </div>
            </div>
            <div className="flex flex-1 mt-2">
                <Button buttonText="Change" type="submit" />
            </div>
        </form>
    );
}

export default ChangePassword;