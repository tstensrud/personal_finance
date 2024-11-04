import { useEffect, useRef, useState } from 'react';

import useSubmitData from '../../hooks/useSubmitData.jsx';

import ErrorIcon from '../../assets/ErrorIcon.jsx'
import Card from '../../ui/Card.jsx';
import Input from '../../ui/formcomponents/Input.jsx';
import LargeAddButton from '../../ui/formcomponents/LargeAddButton.jsx';

function AddSecurity({ currentUser, refetch }) {

    const { data, setData, loading, error, response, handleSubmit } = useSubmitData(`/api/securities/add/${currentUser.uid}/`);

    const tickerRef = useRef(null);
    const quantityRef = useRef(null);

    useEffect(() => {
        if (response?.success) {
            tickerRef.current.value = '';
            quantityRef.current.value = '';
            refetch();
        }
    }, [response]);

    const handleTickerChange = (e) => {
        setData((prev) => ({
            ...prev,
            ticker: e.target.value,
        }))
    }

    const handleQuantityChange = (e) => {
        setData((prev) => ({
            ...prev,
            quantity: e.target.value,
        }))
    }

    const handleSubmitSecurity = async () => {
        if (data) {
            await handleSubmit();
        }
    }

    return (
        <Card>
            <form className="bg-tertiary-color">
                <div className="flex flex-col gap-3 p-2">
                    <div className="text-lg pl-1">
                        Add security
                    </div>
                    <div className="h-10">
                        <Input ref={tickerRef} onChange={handleTickerChange} type="text" name="ticker" placeholder={"Ticker"} />
                    </div>
                    <div className="h-10">
                        <Input ref={quantityRef} onChange={handleQuantityChange} type="text" name="quantity" placeholder={"Quantity"} />
                    </div>
                    <div className="flex h-10">
                        <div>
                            <LargeAddButton loading={loading} onClick={handleSubmitSecurity} buttonText="Add" type="submit" />
                        </div>
                        <div className="flex flex-1 h-full items-center pl-5">
                            {
                                response?.success === false && (
                                    <div className="flex w-full">
                                        <div className="pr-2">
                                            <ErrorIcon dimensions={20} />
                                        </div>
                                        <div className="h-full items-center text-sm">
                                            {response.message}
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </div>
            </form>
        </Card>
    );
}

export default AddSecurity;