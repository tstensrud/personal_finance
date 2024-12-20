import React, { useState } from 'react';

// Components
import NavItem from './NavItem.jsx';

// Navitem SVGs
import AppIcon from '../../assets/AppIcon';
import HomeIcon from '../../assets/menusvgs/HomeIcon';
import StocksIcon from '../../assets/menusvgs/StocksIcon';
import AssetsIcon from '../../assets/menusvgs/AssetsIcon';
import DebtsIcon from '../../assets/menusvgs/DebtsIcon';
import SpendingIcon from '../../assets/menusvgs/SpendingIcon';
import CollapseMenuItem from './CollapseMenuItem';
import SettingsIcon from '../../assets/menusvgs/SettingsIcon.jsx';
import LogoutIcon from '../../assets/menusvgs/LogutIcon.jsx';

function NavPanel({ showMenu, setShowMenu, setActiveIndex, activeIndex }) {

    const menuItems = [
        { text: "Home", url: "home", svg: <HomeIcon activeIndex={activeIndex} /> },
        { text: "Securities", url: "securities", svg: <StocksIcon activeIndex={activeIndex} /> },
        { text: "Other assets", url: "assets", svg: <AssetsIcon activeIndex={activeIndex} /> },
        { text: "Debts", url: "debts", svg: <DebtsIcon activeIndex={activeIndex} /> },
        { text: "Spending plan", url: "spending", svg: <SpendingIcon activeIndex={activeIndex} /> },
        { text: "Account", url: "account", svg: <SettingsIcon activeIndex={activeIndex} /> },
    ];

    return (
        <div className="flex sm:flex-col flex-row w-full h-full border-r border-grey-border-color overflow-y-auto ">

            <div className="hidden sm:flex duration-200 pt-2 items-end ">
                <CollapseMenuItem showMenu={showMenu} setShowMenu={setShowMenu} />
            </div>

            <div className={`hidden sm:flex flex-col h-20 items-center justify-center`}>
                <div className={`justify-center h-full flex items-center`}>
                    <AppIcon dimensions={30} />
                </div>
            </div>

            <div className="pl-2 flex items-center h-full sm:hidden pb-2">
                <AppIcon dimensions={20} />
            </div>

            <div className={`flex flex-row sm:flex-col items-center sm:pl-2 pr-2 sm:pb-5 pb-2`}>
                {
                    menuItems.map((item, index) => (
                        <NavItem showMenu={showMenu} key={index} index={index} text={item.text} url={item.url} setActiveIndex={setActiveIndex} activeIndex={activeIndex} svg={item.svg && React.cloneElement(item.svg, { index })} />
                    ))
                }
            </div>
            <div className="flex sm:pt-5 pl-2 pr-2 sm:border-t border-grey-border-color">
                <NavItem showMenu={showMenu} text={"Log out"} url={"logout"} setActiveIndex={null} activeIndex={-1} svg={<LogoutIcon />} />
            </div>

        </div>
    );
}

export default NavPanel;