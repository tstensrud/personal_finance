import { useState } from "react";

import Card from "../../ui/Card.jsx";
import TableRow from './TableRow.jsx';
import PlusSquareIcon from "../../assets/menusvgs/PlusSquareIcon.jsx";
import MinusSquareIcon from "../../assets/menusvgs/MinusSquareIcon.jsx";
import InputRow from "./InputRow.jsx";

function ExpensesTable({ setTotalExpense, currentUser }) {
    const [showInputRow, setShowInputRow] = useState(false);
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
                    <InputRow showInputRow={showInputRow} currentUser={currentUser} expense placeholder="Name of expense" />
                )
            }
            <TableRow expense currentUser={currentUser} source="Food" amount={7000} />
            <TableRow expense currentUser={currentUser} source="Mortgage" amount={12000} />
            <TableRow expense currentUser={currentUser} source="Student loan" amount={2000} />
            <TableRow expense currentUser={currentUser} source="Electricity" amount={200} />
            <TableRow expense currentUser={currentUser} source="Spotify" amount={170} />
            <TableRow expense currentUser={currentUser} source="Netflix" amount={229} />
            <TableRow expense currentUser={currentUser} borderTop source="Total" amount={123345} />
        </Card>
    );
}

export default ExpensesTable;