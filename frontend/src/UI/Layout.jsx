import { useEffect, useRef, useState } from 'react';
import { Outlet, useSearchParams } from 'react-router-dom';

import NavPanel from './navpanel/Navpanel';
import PageHeader from './pageheader/PageHeader';
function Layout({ children }) {

    const [showMenu, setShowMenu] = useState(true);
    const [activeIndex, setActiveIndex] = useState(0);
    const [menuPinned, setMenuPinned] = useState(true);
    const [isMenuAnimationInProgress, setIsMenuAnimationInProgress] = useState(false);
    const menuRef = useRef(null);

    useEffect(() => {
        const handleWindowMouseLeave = (e) => {
            if (!e.relatedTarget && (e.clientY <= 0 || e.clientX <= 0 || e.clientX >= window.innerWidth || e.clientY >= window.innerHeight)) {
                if (!menuPinned) {
                    setIsMenuAnimationInProgress(false);
                    setShowMenu(false);
                }
            }
        }

        window.addEventListener('mouseout', handleWindowMouseLeave);
        return () => {
            window.removeEventListener('mouseout', handleWindowMouseLeave);
        }

    }, [showMenu, menuPinned])

    // Handlers
    const handleMouseOverMenu = () => {
        if (!menuPinned && !showMenu && !isMenuAnimationInProgress) {
            setIsMenuAnimationInProgress(true);
            setShowMenu(true);
        }
    }

    const handleMouseOut = (e) => {
        if (!menuPinned && showMenu && !isMenuAnimationInProgress) {
            if (menuRef.current && !menuRef.current.contains(e.relatedTarget)) {
                setIsMenuAnimationInProgress(true);
                setShowMenu(false);
            }
        }
    }

    const handleAnimationEnd = () => {
        setIsMenuAnimationInProgress(false);
    }

    return (
        <div className="flex flex-row p-2 w-full h-full bg-secondary-color">
            <div ref={menuRef} onTransitionEnd={handleAnimationEnd} onMouseEnter={handleMouseOverMenu} onMouseLeave={handleMouseOut} className={`${showMenu ? 'animate-slideFromLeft' : 'animate-slideOutLeft'}`}>
                <NavPanel activeIndex={activeIndex} setActiveIndex={setActiveIndex} setIsMenuAnimationInProgress={setIsMenuAnimationInProgress} setMenuPinned={setMenuPinned} menuPinned={menuPinned} showMenu={showMenu} setShowMenu={setShowMenu} />
            </div>
            <div className="flex flex-col flex-1 pl-5 pr-5 rounded-lg text-primary-color">
                <PageHeader activeIndex={activeIndex} setActiveIndex={setActiveIndex}/>
                <div className="flex flex-col w-full h-full flex-wrap">
                    <Outlet>
                        {children}
                    </Outlet>
                </div>
            </div>
        </div>
    );
}

export default Layout;