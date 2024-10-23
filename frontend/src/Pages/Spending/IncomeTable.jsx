import { useState, useEffect } from 'react';

// components
import Card from "../../ui/Card.jsx";
import TableRow from './TableRow.jsx';
import InputRow from "./InputRow.jsx";
import PlusSquareIcon from "../../assets/menusvgs/PlusSquareIcon.jsx";
import MinusSquareIcon from "../../assets/menusvgs/MinusSquareIcon.jsx";

function IncomeTable({ currentUser, setTotalIncome, incomeData, refetch }) {
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
        <Card>
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
            {
                showInputRow && (
                    <InputRow refetch={refetch} showInputRow={showInputRow} currentUser={currentUser} placeholder="Source of income" />
                )
            }
            {
                incomeData && Object.keys(incomeData).map((key, index) => (
                    <TableRow editable key={index} expense currentUser={currentUser} source={incomeData[key]['post_data'].type_name} amount={incomeData[key]['post_data'].amount} />
                ))
            }
            <TableRow borderTop source="Total" amount={totalIncomeValue} />
        </Card>
    );
}

export default IncomeTable;