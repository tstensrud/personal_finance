import { useState } from "react";

import Card from "../../ui/Card.jsx";
import SummaryRow from './SummaryRow.jsx';
import DropdownMenu from '../../ui/widgets/DropdownMenu.jsx';

import HouseIcon from '../../assets/HouseIcon.jsx';
import VehicleIcon from '../../assets/VehicleIcon.jsx';
import CreditCardIcon from '../../assets/CreditCardIcon.jsx';
import GlobIcon from '../../assets/GlobeIcon.jsx';
import MaximizeIcon from "../../assets/MaximizeIcon.jsx";
import MinimizeIcon from "../../assets/MinimizeIcon.jsx";

function DebtContainer({ debtType, title }) {
    const [maximized, setMaximized] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    
    const debtTypes = [
        {type: "home", icon: <HouseIcon />},
        {type: "vehicle", icon: <VehicleIcon />},
        {type: "creditcard", icon: <CreditCardIcon />},
        {type: "other", icon: <GlobIcon />}
    ];

    const handleMaximize = () => {
        setMaximized(!maximized)
    }

    const handleMaximizedAnimationEnd = () => {
        if (maximized) {
            setShowDropdown(true);
            return;
        }

        if (!maximized) {
            setShowDropdown(false);
            return;
        }
    }

    return (
        <div onTransitionEnd={handleMaximizedAnimationEnd} className={`${maximized ? 'w-full' : 'w-96'} duration-200`}>
            <Card>
                <div className="p-2 flex flex-col">
                    <div className="w-full text-lg flex h-10">
                        <div className="flex h-full items-center">
                            {
                                debtTypes.map(item => {
                                    if (item.type === debtType) {
                                        return item.icon
                                    } else {
                                        return null;
                                    }
                                })
                            }
                        </div>
                        <div className="flex pl-3 items-center h-full">
                            {title}
                        </div>
                        <div className="flex flex-1 h-full justify-end">
                            <div onClick={handleMaximize}>
                                {
                                    maximized ? <MinimizeIcon dimensions={20} /> : <MaximizeIcon dimensions={20} />
                                }
                            </div>
                        </div>
                    </div>
                    <SummaryRow rowTitle={"Total owed"} rowValue={1234} />
                    <SummaryRow rowTitle={"Lender"} rowValue={"DnB"} />
                    <SummaryRow rowTitle={"Expected payed by"} rowValue={"2050"} />
                    {

                    }
                    <DropdownMenu showVariable={showDropdown} >
                        <div className="w-full h-[500px] text-sm pt-5">

                        asdff
                        </div>
                    </DropdownMenu>
                </div>
            </Card>
        </div >
    );
}

export default DebtContainer;