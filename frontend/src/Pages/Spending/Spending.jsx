import Card from "../../UI/Card";
import ExpensesTable from "./ExpensesTable";
import IncomeTable from "./IncomeTable";
import TableRow from "./TableRow";

function Spending() {
    return (
        <div className="flex justify-start gap-5 flex-wrap">

            <div className="flex flex-col">
                <div className="flex items-center h-16 text-lg -tracking-wide">
                    Income
                </div>
                <div className="w-96">
                    <IncomeTable />
                </div>
                <div className="flex items-center h-16 text-lg -tracking-wide">
                    Expenses
                </div>
                <div className="w-96">
                    <ExpensesTable />
                </div>
            </div>
            <div className="flex flex-col">

                <div className="flex items-center h-16 text-lg -tracking-wide">
                    Monthly status
                </div>
                <div className="w-96">
                    <Card>
                        <div className="p-2 flex w-full border-b border-grey h-10 items-center text-light-grey">
                            Summary
                        </div>
                        <div className="w-full flex flex-col text-sm">
                            <TableRow source="After spending" amount={35000} />
                            <TableRow source="Savings" amount={35000} />
                        </div>
                        <div className="p-2 flex w-full border-b border-grey h-10 items-center text-light-grey">
                            Key values, % of income
                        </div>
                        <div className="w-full flex flex-col text-sm">
                            <TableRow source="Savings %" amount={30} percentage={true} />
                            <TableRow source="Food %" amount={30} percentage={true} />
                            <TableRow source="Debts %" amount={30} percentage={true} />
                            <TableRow source="Cost of living %" amount={30} percentage={true} />
                            <TableRow source="Leisure %" amount={30} percentage={true} />
                            <TableRow source="Other %" amount={30} percentage={true} />
                        </div>
                    </Card> 
                </div>

            </div>
        </div>
    );
}

export default Spending;