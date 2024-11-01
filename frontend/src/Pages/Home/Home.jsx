import { useContext, useEffect } from "react";

import { AuthContext } from "../../context/AuthContext";
import { GlobalContext } from "../../context/GlobalContext";
import useFetch from '../../hooks/useFetch';

import DebtSummary from "./DebtSummary.jsx";
import SecuritySummary from './SecuritySummary.jsx';
import AssetsSummary from './AssetsSummary.jsx';

function PersonalFinance() {
    const { setGlobalLoading } = useContext(GlobalContext);
    const { currentUser } = useContext(AuthContext);

    const { data: debtData, loading: debtLoading, refetch: debtRefetch } = useFetch(`/api/debts/get/${currentUser.uid}/`);
    
    useEffect(() => {
        
        let isLoading = false;
        if (debtLoading) {
            isLoading = true;
        }
        setGlobalLoading(isLoading);

    },[debtLoading]);

    return (
        <div className="flex gap-5 flex-wrap">
            <DebtSummary data={debtData} />
            <SecuritySummary />
            <AssetsSummary />
        </div>
    );
}

export default PersonalFinance;