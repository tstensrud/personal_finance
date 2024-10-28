import { useState } from "react";

import Card from "../../ui/Card.jsx";
import SummaryRow from './SummaryRow.jsx';
import DropdownMenu from '../../ui/widgets/DropdownMenu.jsx';

import HouseIcon from '../../assets/HouseIcon.jsx';
import VehicleIcon from '../../assets/VehicleIcon.jsx';
import CreditCardIcon from '../../assets/CreditCardIcon.jsx';
import GlobIcon from '../../assets/GlobeIcon.jsx';
import PersonIcon from '../../assets/PersonIcon.jsx';
import MaximizeIcon from "../../assets/MaximizeIcon.jsx";
import MinimizeIcon from "../../assets/MinimizeIcon.jsx";
import DebtTable from "./DebtTable.jsx";

function DebtContainer({ debtData, debtType }) {
    const [maximized, setMaximized] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    
    const debtTypes = [
        {type: "home", cardText: "Home", icon: <HouseIcon />},
        {type: "vehicle", cardText: "Vehicle", icon: <VehicleIcon />},
        {type: "creditcard", cardText: "Credit Card", icon: <CreditCardIcon />},
        {type: "private", cardText: "Private", icon: <PersonIcon /> },
        {type: "other", cardText: "Other", icon: <GlobIcon />}
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
        <div onTransitionEnd={handleMaximizedAnimationEnd} className={`${maximized ? 'w-full' : 'w-96'} duration-200 overflow-hidden`}>
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
                        <div className={`flex pl-3 items-center h-full`}>
                        {
                                debtTypes.map(item => {
                                    if (item.type === debtType) {
                                        return item.cardText
                                    } else {
                                        return null;
                                    }
                                })
                            }
                        </div>
                        <div className="flex flex-1 h-full justify-end">
                            <div onClick={handleMaximize}>
                                {
                                    maximized ? <MinimizeIcon dimensions={20} /> : <MaximizeIcon dimensions={20} />
                                }
                            </div>
                        </div>
                    </div>
                    <SummaryRow maximized={maximized} rowTitle={"Lender"} rowValue={debtData.debt_name} />
                    <SummaryRow maximized={maximized} rowTitle={"Initial loan"} rowValue={debtData.value.toLocaleString()} />
                    <SummaryRow maximized={maximized} rowTitle={"Current loan"} rowValue={0} />
                    <SummaryRow maximized={maximized} rowTitle={"Added"} rowValue={debtData.created_at} />
                    <SummaryRow maximized={maximized} rowTitle={"Expected payed by"} rowValue={debtData.end_date} />
                    <DropdownMenu showVariable={showDropdown} >
                        <DebtTable />
                    </DropdownMenu>
                </div>
            </Card>
        </div >
    );
}

export default DebtContainer;