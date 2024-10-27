import DebtContainer from "./DebtContainer";

function Debts() {
    return (
        <div className="flex flex-col w-full">
            <div className="flex flex-col flex-wrap gap-5">
                <DebtContainer debtType="home" title="Home" />
                <DebtContainer debtType="creditcard" title="Credit card" />
                <DebtContainer debtType="vehicle" title="Vehicle" />
                <DebtContainer debtType="other" title="Private" />
                <DebtContainer debtType="other" title="Other" />
            </div>
        </div>
    );
}

export default Debts;