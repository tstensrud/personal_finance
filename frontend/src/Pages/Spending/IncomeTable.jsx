import { useState } from 'react';

// components
import Card from "../../ui/Card.jsx";
import TableRow from './TableRow.jsx';
import InputRow from "./InputRow.jsx";
import PlusSquareIcon from "../../assets/menusvgs/PlusSquareIcon.jsx";
import MinusSquareIcon from "../../assets/menusvgs/MinusSquareIcon.jsx";

function IncomeTable({currentUser, setTotalIncome}) {
    const [showInputRow, setShowInputRow] = useState(false);

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
                    <InputRow showInputRow={showInputRow} currentUser={currentUser} placeholder="Income source" />
                )
            }
            <TableRow source="Salary" amount={35000} />
            <TableRow source="2nd job" amount={10000} />
            <TableRow borderTop source="Total" amount={45000} />
        </Card>
    );
}

export default IncomeTable;