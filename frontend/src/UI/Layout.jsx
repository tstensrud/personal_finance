import { useContext, useEffect, useRef, useState } from 'react';
import { Outlet } from 'react-router-dom';

import { GlobalContext } from '../context/GlobalContext.jsx';
import { AuthContext } from '../context/AuthContext.jsx';
import useFetchRequest from '../hooks/useFetchRequest.jsx';

import NavPanel from './navpanel/Navpanel.jsx';
import PageHeader from './pageheader/PageHeader';
import LoadingBar from './widgets/LoadingBar.jsx';

function Layout({ children }) {
    const { currentUser } = useContext(AuthContext);
    const { globalLoading, setCurrency } = useContext(GlobalContext);
    
    const [showMenu, setShowMenu] = useState(true);
    const [activeIndex, setActiveIndex] = useState(0);
    
    const menuRef = useRef(null);

    const { data: userData, fetchData: fetchUserData } = useFetchRequest(`/account/get/${currentUser.uid}/`);
    
    useEffect(() => {
        const localStorageCurrency = localStorage.getItem('currency');
        if (localStorageCurrency) {
            setCurrency(localStorageCurrency)
        } else {
            const getUserCurrency = async () => {
                await fetchUserData();
            }
            getUserCurrency();
        }
    },[]);

    useEffect(() => {
        if (userData?.success) {
            setCurrency(userData?.data?.user_data?.currency)
            localStorage.setItem("currency", userData?.data?.user_data?.currency)
        }
    },[userData]);

    return (
        <div className="flex flex-col sm:flex-row w-full h-full bg-secondary-color">
            <div className="absolute top-0 left-0 w-full h-5">
                {
                    globalLoading && <LoadingBar />
                }
            </div>
            <nav ref={menuRef} className={`${showMenu ? 'sm:w-[220px]' : 'sm:w-[70px]'} duration-300 text-nowrap`}>
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