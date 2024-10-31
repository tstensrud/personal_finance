import { useContext, useEffect, useRef, useState } from 'react';
import { Outlet } from 'react-router-dom';

import { GlobalContext } from '../context/GlobalContext.jsx';

import NavPanel from './navpanel/Navpanel.jsx';
import PageHeader from './pageheader/PageHeader';
import LoadingBar from './widgets/LoadingBar.jsx';

function Layout({ children }) {
    const { globalLoading, setCurrency } = useContext(GlobalContext);
    const [showMenu, setShowMenu] = useState(true);
    const [activeIndex, setActiveIndex] = useState(0);
    const menuRef = useRef(null);
    
    useEffect(() => {
        const localStorageCurrency = localStorage.getItem('currency');
        if (localStorageCurrency) {
            setCurrency(localStorageCurrency)
        } else {
            localStorage.setItem("currency", "usd");
        }
    },[]);

    return (
        <div className="flex flex-row w-full h-full bg-secondary-color">
            <div className="absolute top-0 left-0 w-full h-5">
                {
                    globalLoading && <LoadingBar />
                }
            </div>
            <nav ref={menuRef} className={`${showMenu ? 'w-[220px]' : 'w-[70px]'} duration-300 text-nowrap`}>
                <NavPanel activeIndex={activeIndex} setActiveIndex={setActiveIndex} showMenu={showMenu} setShowMenu={setShowMenu} />
            </nav>

            <div className="flex flex-col flex-1 rounded-lg text-primary-color">
                <PageHeader activeIndex={activeIndex} setActiveIndex={setActiveIndex} />
                <main className="flex flex-col w-full h-full flex-wrap p-5">
                    <Outlet>
                        {children}
                    </Outlet>
                </main>
            </div>
        </div>
    );
}

export default Layout;