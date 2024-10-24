import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";

import useFetch from "../../hooks/useFetch.jsx";
import { GlobalContext } from '../../context/GlobalContext.jsx';

import Card from "../../ui/Card";
import ExpensesTable from "./ExpensesTable";
import IncomeTable from "./IncomeTable";
import TableRow from "./TableRow";
import SummaryRow from './SummaryRow.jsx'
import LoadingBar from "../../ui/widgets/LoadingBar.jsx";

function Spending() {
    const { currentUser } = useContext(AuthContext);
    const { currency } = useContext(GlobalContext);
    const { data, loading, error, refetch } = useFetch(`/api/spending_plan/${currentUser.uid}/`);
    //const { data: expenseCategories, loading: categoriesLoading, error: categoriesError } = useFetch(`/api/spending_categories/expenses/`);

    const [totalIncome, setTotalIncome] = useState(0);
    const [totalExpense, setTotalExpense] = useState(0);

    // Values for % of income
    const [totalFood, setTotalFood] = useState(0);
    const [totalLiving, setTotalLiving] = useState(0);
    const [debts, setTotalDebts] = useState(0);

    useEffect(() => {
        sumUpTotalLivingSpenditure();
        sumUpTotalFoodSpenditure();
        sumUpTotalDebtSpenditure();
    },[data])

    const sumUpTotalDebtSpenditure = () => {
        let totalDebts = 0;
        data?.data?.expenses && Object.keys(data?.data?.expenses).map(key => {
            if (data?.data?.expenses[key]?.category_data?.category_name === "debt") {
                totalDebts += data?.data?.expenses[key]?.post_data.amount
            }
        })
        setTotalDebts(totalDebts)
    }
    const sumUpTotalFoodSpenditure = () => {
        let foodSpenditure = 0;
        data?.data?.expenses && Object.keys(data?.data?.expenses).map(key => {
            if (data?.data?.expenses[key]?.category_data?.category_name === "food") {
                foodSpenditure += data?.data?.expenses[key]?.post_data.amount
            }
        })
        setTotalFood(foodSpenditure);
    }

    const sumUpTotalLivingSpenditure = () => {
        let livingSpenditure = 0;
        data?.data?.expenses && Object.keys(data?.data?.expenses).map(key => {
            if ((data?.data?.expenses[key]?.category_data?.category_name === "housing" || data?.data?.expenses[key]?.category_data?.category_name === "utilities")) {
                livingSpenditure += data?.data?.expenses[key]?.post_data.amount
            }
        })
        setTotalLiving(livingSpenditure);
    }



    return (
        <div className="flex justify-start gap-5 flex-wrap">
            <div className="flex flex-col w-full sm:w-[28rem]">
                <div className="flex items-center h-16 text-lg -tracking-wide">
                    Income
                </div>
                <div className="w-full">
                    <IncomeTable currentUser={currentUser} incomeData={data?.data?.income} setTotalIncome={setTotalIncome} refetch={refetch} />
                </div>
                <div className="flex items-center h-16 text-lg -tracking-wide">
                    Expenses
                </div>
                <div className="w-full">
                    <ExpensesTable currentUser={currentUser} expensesData={data?.data?.expenses} setTotalExpense={setTotalExpense} refetch={refetch} />
                </div>
            </div>

            <div className="flex flex-col w-full sm:w-[28rem]">
                <div className="flex items-center h-16 text-lg -tracking-wide">
                    Monthly status
                </div>
                <div className="w-full">
                    <Card>
                        <div className="p-2 flex w-full border-b border-grey-border-color h-10 items-center text-light-grey">
                            Summary
                        </div>

                        <div className="w-full flex flex-col text-sm">
                            <SummaryRow text="After Spending" value={totalIncome - totalExpense} tail={currency} />

                        </div>
                        <div className="p-2 flex w-full border-b border-grey-border-color h-10 items-center text-light-grey">
                            Key values, % of income
                        </div>
                        <div className="w-full flex flex-col text-sm">
                            <SummaryRow text="Potential savings" value={(((totalIncome - totalExpense) / totalIncome) * 100 ).toFixed(1)} tail="%" />
                            <SummaryRow text="Food" value={((totalFood / totalIncome) * 100).toFixed(1)}  tail="%"/>
                            <SummaryRow text="Debts" value={((debts / totalIncome) * 100).toFixed(1)} tail="%" />
                            <SummaryRow text="Living expenses" value={((totalLiving / totalIncome) * 100).toFixed(1)} tail="%" />
                        </div>
                    </Card>
                </div>

            </div>
        </div>
    );
}

export default Spending;