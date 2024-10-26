import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { AuthContext } from "../../context/AuthContext.jsx";

import Input from "../formcomponents/Input.jsx";


function PageHeader({ activeIndex, setActiveIndex }) {
    const [showSettingsMenu, setShowSettingsMenu] = useState(false);
    const { currentUser } = useContext(AuthContext);

    return (
        <div className="flex-col w-full items-center top-0 sticky border-b border-grey-border-color pt-5 pb-5">

            <div className="flex w-full h-full items-start pl-5">

                <div className="text-2xl font-semibold -tracking-wide">
                    Your personal finances
                </div>

                <div className="flex flex-1 h-full items-start justify-end pr-5">
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

        </div>
    );
}

export default PageHeader;