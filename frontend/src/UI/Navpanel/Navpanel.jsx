import React, { useState } from 'react';


import NavItem from './NavItem';

// Navitem SVGs
import AppIcon from '../../assets/AppIcon';
import HomeIcon from '../../assets/menusvgs/HomeIcon';
import StocksIcon from '../../assets/menusvgs/StocksIcon';
import AssetsIcon from '../../assets/menusvgs/AssetsIcon';
import DebtsIcon from '../../assets/menusvgs/DebtsIcon';
import SpendingIcon from '../../assets/menusvgs/SpendingIcon';

function NavPanel() {
    const [activeIndex, setActiveIndex] = useState(-1);

    const menuItems = [
        {text: "Home", url: "home", svg: <HomeIcon activeIndex={activeIndex} />},
        {text: "Stocks", url: "stocks", svg: <StocksIcon activeIndex={activeIndex} />},
        {text: "Other assets", url: "assets", svg: <AssetsIcon activeIndex={activeIndex} />},
        {text: "Debts", url: "debts", svg: <DebtsIcon activeIndex={activeIndex} />},
        {text: "Spending plan", url: "plan", svg: <SpendingIcon activeIndex={activeIndex} />},
    ]

    return (
        <div className="flex flex-col w-full">
            <div className="flex flex-col h-20 items-center justify-center">
                <div className="w-full justify-center flex items-center">
                    <AppIcon />
                </div>
                <div className="flex w-full justify-center text-primary-color pt-2">
                    Personal finance
                </div>
            </div>
            {
                menuItems.map((item, index) => (
                    <NavItem key={index} text={item.text} url={item.url} activeIndex={activeIndex} svg={item.svg && React.cloneElement(item.svg, {index})} />
                ))
            }
        </div>
    );
}

export default NavPanel;