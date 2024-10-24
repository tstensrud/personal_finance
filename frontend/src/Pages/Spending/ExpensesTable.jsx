import { useContext, useEffect, useState } from "react";

import { GlobalContext } from '../../context/GlobalContext.jsx';

import Card from "../../ui/Card.jsx";
import TableRow from './TableRow.jsx';
import PlusSquareIcon from "../../assets/menusvgs/PlusSquareIcon.jsx";
import MinusSquareIcon from "../../assets/menusvgs/MinusSquareIcon.jsx";
import InputRow from "./InputRow.jsx";

function ExpensesTable({ currentUser, setTotalExpense, expensesData, refetch }) {
    const { currency } = useContext(GlobalContext);
    
    const [showInputRow, setShowInputRow] = useState(false);
    const [totalExpenseValue, setTotalExpenseValue] = useState(0);

    useEffect(() => {
        calculateTotalExpenses();
    }, [expensesData])

    const calculateTotalExpenses = () => {
        let totalExpenses = 0;
        expensesData && Object.keys(expensesData).map((key) => {
            totalExpenses += expensesData[key]?.['post_data'].amount
        })

        setTotalExpenseValue(totalExpenses);
        setTotalExpense(totalExpenses);
    }


    return (
        <Card>
            <div className={`flex w-full ${!showInputRow && 'border-b'} border-grey-border-color h-10 items-center`}>
                <div className="pl-2 text-light-grey">Expense</div>
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

            <InputRow currentUser={currentUser} refetch={refetch} showInputRow={showInputRow} expense placeholder="Name of expense" />

            {
                expensesData && Object.keys(expensesData).map((key, index) => (
                    <TableRow refetch={refetch} editable key={index} expense={true} data={expensesData[key]['post_data']} />
                ))
            }
            <div className={`flex w-full h-8 items-center border-t border-grey-border-color text-sm`}>
                <div className="flex items-center h-full pl-2">
                    Total
                </div>
                <div className={`flex items-center h-full pr-2 flex-1 justify-end`}>

                    {
                        <>{totalExpenseValue.toLocaleString()} {currency}</>
                    }

                </div>
            </div>
        </Card>
    );
}

export default ExpensesTable;