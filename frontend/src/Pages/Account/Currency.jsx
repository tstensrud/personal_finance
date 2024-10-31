import { useContext, useEffect, useState } from "react";

import useUpdateData from "../../hooks/useUpdateData";
import { GlobalContext } from "../../context/GlobalContext";

import LoadingSpinner from '../../ui/widgets/LoadingSpinner.jsx';

function Currency({ currentCurrency, currentUser, refetch }) {

    const availableCurrencies = ["usd", "nok", "eur", "sek", "dkk", "gbp"];
    const { setCurrency } = useContext(GlobalContext);
    const { data, setData, loading, error, response, handleSubmit } = useUpdateData(currentUser ? `/account/set_currency/${currentUser.uid}/` : null);

    const [showDropdown, setShowDropdown] = useState(false);

    useEffect(() => {
        if (data) {
            const updateCurrency = async () => {
                await handleSubmit();
            }
            updateCurrency();
        }
    }, [data]);

    useEffect(() => {
        if (response?.success) {
            refetch();
            setCurrency(data.currency);
            localStorage.setItem("currency", data.currency);
        }
    }, [response]);

    const handleOptionClick = (option) => {
        setShowDropdown(false);
        if (option !== currentCurrency) {
            setData({ currency: option });
        }
    }

    return (
        <div className="w-full relative text-sm">

            <div onClick={() => setShowDropdown(!showDropdown)} className="flex border rounded-lg border-grey-border-color pl-2 w-full h-8 bg-secondary-color hover:border-accent-color-main focus:border-accent-color-main outline-none">
                <div className="h-full items-center flex">
                    {
                        loading ? (
                            <LoadingSpinner />
                        ) : (
                            currentCurrency?.toUpperCase()
                        )
                    }
                </div>
                <div className="flex flex-1 justify-end h-full items-center pr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" className="stroke-primary-color stroke-2">
                        <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                </div>
            </div>

            {
                showDropdown && (
                    <div className="absolute z-10 h-36 overflow-y-auto top-9 w-full rounded-lg border border-accent-color-main bg-secondary-color outline-none">
                        {
                            availableCurrencies.map((item, index) => {
                                if (item === currentCurrency) {
                                    return null;
                                } else {
                                    return (
                                        <div onClick={() => handleOptionClick(item)} key={index} className="cursor-pointer p-2 h-8 w-full items-center hover:bg-accent-color-main-faded">
                                            {
                                                item.toUpperCase()
                                            }
                                        </div>
                                    )
                                }

                            })
                        }
                    </div>
                )
            }

        </div>
    );
}

export default Currency;