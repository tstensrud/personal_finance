import { useContext, useEffect, useState } from "react";

import { GlobalContext } from "../../context/GlobalContext";

import CardBgColor from "../../ui/CardBgColor";
import DebtsIcon from '../../assets/menusvgs/DebtsIcon.jsx';

function DebtSummary({ data }) {
    const { currency } = useContext(GlobalContext);
    const [totalDebt, setTotalDebt] = useState(0);
    const [totalDebts, setTotalDebts] = useState(0);
    const [totalInitialDebt, setTotalInitialDebt] = useState(0);

    useEffect(() => {
        let totalDebt = 0;
        let totalDebts = 0;
        let totalInitialDebt = 0;
        if (data?.success) {
            Object.keys(data?.data).map((key) => {
                totalDebt += data?.data[key].debt_data.latest_value;
                totalInitialDebt += data?.data[key].debt_data.value;
                totalDebts++;
            })
        }

        setTotalDebt(totalDebt);
        setTotalDebts(totalDebts);
        setTotalInitialDebt(totalInitialDebt);
    }, [data]);

    return (
        <div className="w-96">
            <CardBgColor>
                <div className="flex flex-col p-2 w-full">
                    <div className="flex items-center gap-2 w-full text-lg -tracking-wider font-semibold">
                        <DebtsIcon /> <span>Your debts</span>
                    </div>

                    <div className="flex w-full">
                        <div className="text-light-grey">
                            Total loans
                        </div>
                        <div className="flex flex-1 justify-end">
                            {totalDebts.toLocaleString()}
                        </div>
                    </div>

                    <div className="flex w-full">
                        <div className="text-light-grey">
                            Initial debts
                        </div>
                        <div className="flex flex-1 justify-end">
                            {totalInitialDebt.toLocaleString()} {currency.toUpperCase()}
                        </div>
                    </div>

                    <div className="flex w-full">
                        <div className="text-light-grey">
                            Total owed
                        </div>
                        <div className="flex flex-1 justify-end">
                            {totalDebt.toLocaleString()} {currency.toUpperCase()}
                        </div>
                    </div>

                    <div className="flex w-full">
                        <div className="text-light-grey">
                            % payed
                        </div>
                        <div className="flex flex-1 justify-end">
                            {((1 - (totalDebt / totalInitialDebt)) * 100).toFixed(2)}%
                        </div>
                    </div>


                </div>
            </CardBgColor>
        </div>
    );
}

export default DebtSummary;