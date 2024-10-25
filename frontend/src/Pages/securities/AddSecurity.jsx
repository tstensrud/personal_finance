import { useEffect, useRef, useState } from 'react';

import useSubmitData from '../../hooks/useSubmitData.jsx';


import Card from '../../ui/Card.jsx';
import Input from '../../ui/formcomponents/Input.jsx';
import LargeAddButton from '../../ui/formcomponents/LargeAddButton.jsx';

function AddSecurity({ currentUser }) {

    const {data, setData, loading, error, response, handleSubmit} = useSubmitData(`/api/securities/add/${currentUser.uid}/`);

    const tickerRef = useRef(null);
    const nameRef = useRef(null);
    const quantityRef = useRef(null);

    useEffect(() => {
        if (response?.success) {
            tickerRef.current.value = '';
            nameRef.current.value = '';
            quantityRef.current.value = '';
        }
    },[response]);

    const handleTickerChange = (e) => {
        setData((prev) => ({
            ...prev,
            ticker: e.target.value,
        }))
    }

    const handleNameChange = (e) => {
        setData((prev) => ({
            ...prev,
            name: e.target.value,
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
            <form>
                <div className="flex flex-col gap-3 p-2">
                    <div className="text-lg pl-1">
                        Add security
                    </div>
                    <div className="h-10">
                        <Input ref={tickerRef} onChange={handleTickerChange} type="text" name="ticker" placeholder={"Ticker"} />
                    </div>
                    <div className="h-10">
                        <Input ref={nameRef} onChange={handleNameChange} type="text" name="name" placeholder={"Security name"} />
                    </div>
                    <div className="h-10">
                        <Input ref={quantityRef} onChange={handleQuantityChange} type="text" name="quantity" placeholder={"Quantity"} />
                    </div>
                    <div>
                        <LargeAddButton loading={loading} onClick={handleSubmitSecurity} buttonText="Add" type="submit" />
                    </div>
                </div>
            </form>
        </Card>
    );
}

export default AddSecurity;