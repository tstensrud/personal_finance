import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { AuthContext } from "../../context/AuthContext.jsx";

import DropdownMenu from '../../ui/widgets/DropdownMenu.jsx';
import SettingsIcon from '../../assets/menusvgs/SettingsIcon.jsx';
import LogoutIcon from '../../assets/menusvgs/LogutIcon.jsx';
import Input from "../formcomponents/Input.jsx";

function PageHeader({ activeIndex, setActiveIndex }) {
    const [showSettingsMenu, setShowSettingsMenu] = useState(false);
    const { currentUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleAccountClick = () => {
        setActiveIndex(100);
        navigate("account")
    }

    return (
        <div className="flex-col w-full h-20 items-center top-0 sticky border-b border-grey-border-color">

            <div className="flex w-full h-full items-center pl-5">
                <div className="text-2xl font-semibold -tracking-wide">
                    Your personal finances
                </div>

                <div className="flex flex-1 h-full items-center justify-end pr-5">
                    <div className="w-30 h-10">
                        <Input placeholder="Search" search />
                    </div>
                    <div className="flex">
                        <div onClick={() => setShowSettingsMenu(!showSettingsMenu)} className="flex cursor-pointer items-center justify-center rounded-full h-10 w-10 border border-grey-border-color hover:border-accent-color-main hover:bg-accent-color-main-faded text-xl font-semibold">
                            {currentUser?.displayName?.[0] ?? '?'}
                        </div>
                    </div>
                </div>
            </div>

            <div className="w-full flex justify-end pr-5">
                <DropdownMenu showVariable={showSettingsMenu}>
                    <div className="flex flex-row">

                        <div onClick={handleAccountClick} className="group cursor-pointer flex p-1">
                            <div className="h-full flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width={18} height={18} viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" className={`${activeIndex === 100 ? 'stroke-accent-color-main' : 'stroke-light-grey group-hover:stroke-primary-color'} fill-none stroke-2 duration-200 `}>
                                    <circle cx="12" cy="12" r="3"></circle>
                                    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
                                </svg>
                            </div>
                            <div className={`${activeIndex === 100 ? 'text-accent-color-main' : 'text-light-grey group-hover:text-primary-color'} pl-1 h-full flex items-center pr-5 duration-100 `}>
                                Account
                            </div>
                        </div>

                        <div onClick={() => navigate("logout")} className="group cursor-pointer flex p-1">
                            <div className="h-full flex items-center">
                                <LogoutIcon activeIndex={null} />
                            </div>
                            <div className="text-light-grey group-hover:text-primary-color pl-1 h-full flex items-center duration-100">
                                Log Out
                            </div>
                        </div>
                    </div>
                </DropdownMenu>
            </div>
        </div>
    );
}

export default PageHeader;