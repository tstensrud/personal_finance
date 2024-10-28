
import { useContext } from 'react';
import useFetch from '../../hooks/useFetch';

import {AuthContext} from '../../context/AuthContext.jsx';

import AddNewDebt from "./AddNewDebt";
import DebtContainer from "./DebtContainer";

function Debts() {
    const { currentUser } = useContext(AuthContext);
    const { data: categoryData , loading: categoryLoading } = useFetch(`/api/debts/debt_types/`);
    const { data: debtData, loading: debtLoading, refetch: debtRefetch } = useFetch(`/api/debts/get/${currentUser.uid}/`);

    return (
        <div className="flex flex-col w-full">
            <AddNewDebt currentUser={currentUser} debtTypes={categoryData?.data} refetch={debtRefetch} />
            <div className="flex flex-col flex-wrap gap-5">
                {
                    debtData?.success && Object.keys(debtData?.data).map((key, index) => (
                        <DebtContainer debtType={debtData.data[key].category_data.category_name} debtData={debtData.data[key].debt_data}  />
                    ))
                }
            </div>
        </div>
    );
}

export default Debts;