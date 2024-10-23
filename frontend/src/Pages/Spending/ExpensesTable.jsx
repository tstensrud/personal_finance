import { useEffect, useState } from "react";

import Card from "../../ui/Card.jsx";
import TableRow from './TableRow.jsx';
import PlusSquareIcon from "../../assets/menusvgs/PlusSquareIcon.jsx";
import MinusSquareIcon from "../../assets/menusvgs/MinusSquareIcon.jsx";
import InputRow from "./InputRow.jsx";

function ExpensesTable({ setTotalExpense, currentUser, expensesData, refetch }) {
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
            {
                showInputRow && (
                    <InputRow refetch={refetch} showInputRow={showInputRow} currentUser={currentUser} expense placeholder="Name of expense" />
                )
            }
            {
                expensesData && Object.keys(expensesData).map((key, index) => (
                    <TableRow key={index} expense currentUser={currentUser} source={expensesData[key]['post_data'].type_name} amount={expensesData[key]['post_data'].amount} />
                ))
            }
            <TableRow editable expense currentUser={currentUser} borderTop source="Total" amount={totalExpenseValue} />
        </Card>
    );
}

export default ExpensesTable;