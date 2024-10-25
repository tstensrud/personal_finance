import { useEffect, useRef, useState } from 'react';
import { Outlet } from 'react-router-dom';

import NavPanel from './navpanel/Navpanel.jsx';
import PageHeader from './pageheader/PageHeader';
function Layout({ children }) {

    const [showMenu, setShowMenu] = useState(true);
    const [activeIndex, setActiveIndex] = useState(0);
    const menuRef = useRef(null);

    return (
        <div className="flex flex-row  w-full h-full bg-secondary-color">
            <div ref={menuRef} className={`${showMenu ? 'w-[220px]' : 'w-[70px]'} duration-300 text-nowrap`}>
                <NavPanel activeIndex={activeIndex} setActiveIndex={setActiveIndex} showMenu={showMenu} setShowMenu={setShowMenu} />
            </div>

            <div className="flex flex-col flex-1 rounded-lg text-primary-color">
                <PageHeader activeIndex={activeIndex} setActiveIndex={setActiveIndex} />
                <div className="flex flex-col w-full h-full flex-wrap p-5">
                    <Outlet>
                        {children}
                    </Outlet>
                </div>
            </div>
        </div>
    );
}

export default Layout;