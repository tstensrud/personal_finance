import { useContext, useEffect, useRef, useState } from 'react';

import { GlobalContext } from '../../context/GlobalContext.jsx';

import CardBgColor from '../../ui/CardBgColor.jsx';
import LoadingText from '../../ui/widgets/LoadingText.jsx';


function Summary({ totalOwned, totalValue }) {
    const { currency, globalLoading } = useContext(GlobalContext);

    return (
        <CardBgColor>
            <div className="flex flex-col gap-3 p-2">

                <div className="text-lg">
                    Your investment
                </div>
                {
                    globalLoading ? <LoadingText /> : (
                        <div className="w-full flex">
                            <div>
                                Owner in total companies:
                            </div>
                            <div className="flex flex-1 justify-end">
                                {totalOwned}
                            </div>
                        </div>
                    )
                }

                {
                    globalLoading ? <LoadingText /> : (
                        <div className="w-full flex">
                            <div>
                                Total value of securities:
                            </div>
                            <div className="flex flex-1 justify-end">
                                {totalValue && Number(totalValue.toFixed(0)).toLocaleString()} <div className="text-light-grey pl-2">{currency.toUpperCase()}</div>
                            </div>
                        </div>
                    )
                }
            </div>
        </CardBgColor>
    );
}

export default Summary;