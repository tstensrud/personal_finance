import { AuthContext } from '../../context/AuthContext.jsx';
import { useContext, useEffect, useState } from 'react';

import useFetch from '../../hooks/useFetch.jsx';
import { GlobalContext } from '../../context/GlobalContext.jsx';
import { getCurrency } from '../../utils/getcurrency.jsx';

import TableRow from './TableRow.jsx';
import AddSecurity from './AddSecurity.jsx';
import Summary from './Summary.jsx';
import LoadingSpinner from '../../ui/widgets/LoadingSpinner.jsx';

function Stocks() {

    const { currentUser } = useContext(AuthContext);
    const { setGlobalLoading, currency } = useContext(GlobalContext);
    const [currencyConversion, setCurrencyConversion] = useState(-1);

    const { data, loading, error, refetch } = useFetch(`/api/securities/get/${currentUser.uid}/`);

    useEffect(() => {
        setGlobalLoading(loading);
    }, [loading]);

    useEffect(() => {
        const fetchCurrency = async () => {
            try {
                const data = await getCurrency("usd")
                setCurrencyConversion(data?.usd[currency])
            } catch (error) {
                console.error(error)
            }
        }
        fetchCurrency();
    },[])
    
    return (
        <div className="flex flex-col w-full justify-center">
            <div className="flex flex-row w-full flex-wrap gap-5">
                <div className="w-[450px]">
                    <AddSecurity refetch={refetch} currentUser={currentUser} />
                </div>
                <div className="w-[450px]">
                    <Summary totalValue={data?.totals?.total_value * currencyConversion} totalOwned={data?.totals?.total_companies_owned} />
                </div>
            </div>
            <div className="flex text-light-grey justify-center border-b border-grey-border-color w-full bg-secondary-color pb-2">
                <div className="flex items-end w-[10%] h-20 justify-start pl-5">
                    Ticker
                </div>
                <div className="hidden sm:flex sm:w-[30%] items-end h-20 justify-center">
                    Name
                </div>
                <div className="flex w-1/2 sm:w-[20%] h-20 items-end justify-center">
                    Quantity
                </div>
                <div className="hidden sm:flex sm:w-[20%] h-20 items-end justify-center overflow-hidden text-nowrap">
                    Last closing
                </div>
                <div className="flex justify-end  items-end w-[40%] sm:w-[20%] h-20 pr-5">
                    Value
                </div>
            </div>

            {
                data?.success && Object.keys(data?.data).map((key, index) => (
                    <TableRow currencyConversion={currencyConversion} refetch={refetch} data={data?.data[key]} key={index} />
                ))
            }

        </div>
    );
}

export default Stocks;