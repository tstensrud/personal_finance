import { useState, useContext, useEffect } from 'react';

import { GlobalContext } from '../../context/GlobalContext.jsx';

// components
import CardBgColor from '../../ui/CardBgColor.jsx';
import Card from "../../ui/Card.jsx";
import TableRow from './TableRow.jsx';
import InputRow from "./InputRow.jsx";
import PlusSquareIcon from "../../assets/menusvgs/PlusSquareIcon.jsx";
import MinusSquareIcon from "../../assets/menusvgs/MinusSquareIcon.jsx";

function IncomeTable({ currentUser, setTotalIncome, incomeData, refetch }) {
    const { currency } = useContext(GlobalContext);

    const [showInputRow, setShowInputRow] = useState(false);
    const [totalIncomeValue, setTotalIncomeValue] = useState(0);



    useEffect(() => {
        calculateTotalExpenses();
    }, [incomeData])


    const calculateTotalExpenses = () => {
        let totalIncome = 0;
        incomeData && Object.keys(incomeData).map((key) => {
            totalIncome += incomeData[key]?.['post_data'].amount
        })

        setTotalIncomeValue(totalIncome);
        setTotalIncome(totalIncome);
    }

    return (
        <CardBgColor>
            <div className={`flex w-full ${!showInputRow && 'border-b'} border-grey-border-color h-10 items-center`}>
                <div className="pl-2 ">Source of income</div>
                <div className="pr-2 flex flex-1 justify-end">
                    <div className="group cursor-pointer">
                        <div onClick={() => setShowInputRow(!showInputRow)}>
                            {
                                showInputRow ? (
                                    <MinusSquareIcon />
                                ) : (
                                    <PlusSquareIcon />
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
            <InputRow currentUser={currentUser} expense={false} refetch={refetch} showInputRow={showInputRow} placeholder="Source of income" />
            {
                incomeData && Object.keys(incomeData).map((key, index) => (
                    <TableRow refetch={refetch} editable key={index} data={incomeData[key]?.['post_data']} />
                ))
            }
            <div className={`flex w-full h-8 items-center border-t border-grey-border-color text-sm`}>
                <div className="flex items-center h-full pl-2">
                    Total
                </div>
                <div className={`flex items-center h-full pr-2 flex-1 justify-end`}>

                    {
                        <>{totalIncomeValue.toLocaleString()} {currency.toUpperCase()}</>
                    }

                </div>
            </div>
        </CardBgColor>
    );
}

export default IncomeTable;