import Card from "../../UI/Card.jsx";
import TableRow from './TableRow.jsx';
import PlusSquareIcon from "../../assets/menusvgs/PlusSquareIcon.jsx";

function ExpensesTable() {
    return (
        <Card>
            <div className="flex w-full border-b border-grey h-10 items-center">
                <div className="pl-2 text-light-grey">Expense</div>
                <div className="pr-2 flex flex-1 justify-end">
                    <div className="group cursor-pointer">
                        <PlusSquareIcon />
                    </div>
                </div>
            </div>
            <TableRow source="Food" amount={7000} />
            <TableRow source="Mortgage" amount={12000} />
            <TableRow source="Student loan" amount={2000} />
            <TableRow source="Electricity" amount={200} />
            <TableRow source="Spotify" amount={170} />
            <TableRow source="Netflix" amount={229} />
            <TableRow borderTop source="Total" amount={123345} />
        </Card>
    );
}

export default ExpensesTable;