import { useState } from "react";

import SettingsIcon from '../../assets/menusvgs/SettingsIcon.jsx';
import LogoutIcon from '../../assets/menusvgs/LogutIcon.jsx';
import Input from "../FormComponents/Input";
import NavItem from "../Navpanel/NavItem.jsx";
import LoadingBar from "../Widgets/LoadingBar.jsx";

function PageHeader() {
    const [showSettingsMenu, setShowSettingsMenu] = useState(false);

    const menuItems = [
        { text: "Settings", url: "account", svg: <SettingsIcon activeIndex={null} /> },
        { text: "Log out", url: "logout", svg: <LogoutIcon activeIndex={null} /> },
    ];

    return (
        <div className="flex w-full h-16 items-center top-0 sticky border-b border-grey">
            <div className="text-2xl font-semibold -tracking-wide">
                Your personal finances
            </div>
            <div className="relative flex flex-1 h-full items-center justify-end">
                <div className="w-30 h-10">
                    <Input placeholder="Search" search />
                </div>
                <div className="flex">
                    <div onClick={() => setShowSettingsMenu(!showSettingsMenu)} className="flex cursor-pointer items-center justify-center rounded-full h-10 w-10 border border-light-grey hover:border-accent-color-main hover:text-accent-color-main text-xl font-semibold">
                        T
                    </div>
                </div>
                {
                    showSettingsMenu && (
                        <div className={`absolute z-50 border border-light-grey h-20 top-full right-0 bg-tertiary-color p-2 rounded-lg w-40`}>
                            {
                                menuItems.map((item, index) => (
                                    <NavItem lastIndex={index === (menuItems.length - 1)} showMenu={true} key={index} index={index} text={item.text} url={item.url} setActiveIndex={null} activeIndex={null} svg={item.svg} />
                                ))
                            }
                        </div>
                    )
                }
            </div>
        </div>
    );
}

export default PageHeader;