import { useEffect, useRef, useState } from "react";

import useSubmitData from "../../hooks/useSubmitData.jsx";
import useFetch from "../../hooks/useFetch.jsx";

import Card from "../../ui/Card.jsx";
import SummaryRow from './SummaryRow.jsx';
import DropdownMenu from '../../ui/widgets/DropdownMenu.jsx';
import DebtTableRow from './DebtTableRow.jsx';

import Input from '../../ui/formcomponents/Input.jsx';
import AddButton from '../../ui/formcomponents/AddButton.jsx';
import HouseIcon from '../../assets/HouseIcon.jsx';
import VehicleIcon from '../../assets/VehicleIcon.jsx';
import CreditCardIcon from '../../assets/CreditCardIcon.jsx';
import GlobIcon from '../../assets/GlobeIcon.jsx';
import PersonIcon from '../../assets/PersonIcon.jsx';
import MaximizeIcon from "../../assets/MaximizeIcon.jsx";
import MinimizeIcon from "../../assets/MinimizeIcon.jsx";

function DebtContainer({ debtData, debtType }) {
    const [maximized, setMaximized] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const newValueRef = useRef(null);
    const [currentLoan, setCurrentLoan] = useState(-1);

    const { data: debtEntriesData, loading: debtEntriesDataLoading, error: debtEntriesDataError, refetch: debtEntriesRefetch } = useFetch(`/api/debts/debt_entries/${debtData.uid}/`);
    const { data: newEntryData, setData: setNewEntryData, loading: newEntryLoading, response: newEntryResponse, handleSubmit: newEntrySubmit, error: newEntryError } = useSubmitData(`/api/debts/new_entry/${debtData.uid}/`);

    const debtTypes = [
        { type: "home", cardText: "Home", icon: <HouseIcon /> },
        { type: "vehicle", cardText: "Vehicle", icon: <VehicleIcon /> },
        { type: "creditcard", cardText: "Credit Card", icon: <CreditCardIcon /> },
        { type: "private", cardText: "Private", icon: <PersonIcon /> },
        { type: "other", cardText: "Other", icon: <GlobIcon /> }
    ];

    useEffect(() => {
        if (newEntryResponse?.success) {
            newValueRef.current.value = '';
            setNewEntryData({});
            debtEntriesRefetch();
        }
    }, [newEntryResponse])

    useEffect(() => {
        if (debtEntriesData?.success) {
            debtEntriesData?.data && Object.keys(debtEntriesData.data)
            .sort((a,b) => {
                return debtEntriesData.data[a].value - debtEntriesData.data[b].value
            }).map((key, index) => {
                if (index === 0) {
                    setCurrentLoan(debtEntriesData.data[key].value)
                }    
            })
        }
    },[debtEntriesData])
    
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

    const handleNewEntryChange = (e) => {
        setNewEntryData({ value: e.target.value })
    }

    const handleSubmitNewEntry = async () => {
        if (newEntryData.value) {
            await newEntrySubmit();
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
                    <SummaryRow maximized={maximized} rowTitle={"Current loan"} rowValue={currentLoan.toLocaleString()} />
                    <SummaryRow maximized={maximized} rowTitle={"Added"} rowValue={debtData.created_at} />
                    <SummaryRow maximized={maximized} rowTitle={"Expected payed by"} rowValue={debtData.end_date} />

                    <DropdownMenu showVariable={showDropdown} >
                        <form>
                            <div className="flex mt-3 w-full">
                                <div className="h-8 w-40">
                                    <Input ref={newValueRef} onChange={handleNewEntryChange} placeholder="Update loan" />
                                </div>
                                <div className="flex pl-2">
                                    <AddButton onClick={handleSubmitNewEntry} loading={newEntryLoading} />
                                </div>
                            </div>
                        </form>

                        <div className="w-full text-sm pt-5 max-h-80 overflow-y-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="text-light-grey h-8">
                                        <th className="text-start pl-2">
                                            Date
                                        </th>
                                        <th>Value</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        debtEntriesData?.success && Object.keys(debtEntriesData?.data)
                                        .sort((a, b) => {
                                            return debtEntriesData?.data[a].value - debtEntriesData?.data[b].value
                                        })
                                        .map((key, index) => (
                                                <DebtTableRow key={index} date={debtEntriesData?.data[key].created_at} value={debtEntriesData?.data[key]?.value} />
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    </DropdownMenu>

                </div>
            </Card>
        </div >
    );
}

export default DebtContainer;