import { useState } from 'react';

import useSubmitData from '../../hooks/useSubmitData.jsx';

import Card from "../../ui/Card.jsx";
import TableRow from './TableRow.jsx';
import PlusSquareIcon from "../../assets/menusvgs/PlusSquareIcon.jsx";

function IncomeTable({currentUser, setTotalIncome}) {


    return (
        <Card>
            <div className="flex w-full border-b border-grey-border-color h-10 items-center">
                <div className="pl-2 ">Source of income</div>
                <div className="pr-2 flex flex-1 justify-end">
                    <div className="group cursor-pointer">
                        <PlusSquareIcon />
                    </div>
                </div>
            </div>
            <TableRow source="Salary" amount={35000} />
            <TableRow source="2nd job" amount={10000} />
            <TableRow borderTop source="Total" amount={45000} />
        </Card>
    );
}

export default IncomeTable;