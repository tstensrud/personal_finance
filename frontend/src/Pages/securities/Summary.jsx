import { useContext, useEffect, useRef, useState } from 'react';

import { GlobalContext } from '../../context/GlobalContext.jsx';

import Card from '../../ui/Card.jsx';


function Summary({ totalOwned, totalValue }) {
    const { currency } = useContext(GlobalContext);

    return (
        <Card>
            <div className="flex flex-col gap-3 p-2">
                <div className="text-lg pl-1">
                    Your investments
                </div>
                <div className="w-full flex">
                    <div>
                        Owner in total companies:
                    </div>
                    <div className="flex flex-1 justify-end">
                        {totalOwned}
                    </div>
                </div>
                <div className="w-full flex">
                    <div>
                        Total value of securities:
                    </div>
                    <div className="flex flex-1 justify-end">
                        {totalValue && Number(totalValue.toFixed(2)).toLocaleString()} { currency.toUpperCase() }
                    </div>
                </div>
            </div>
        </Card>
    );
}

export default Summary;