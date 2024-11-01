import CardBgColor from "../../ui/CardBgColor";
import SecuritiesIcon from '../../assets/menusvgs/StocksIcon.jsx';

function SecuritySummary() {
    return (
        <div className="w-96">
            <CardBgColor>
                <div className="flex flex-col p-2 w-full">
                    <div className="flex items-center gap-2 w-full text-lg -tracking-wider font-semibold">
                        <SecuritiesIcon /> <span>Your securities</span>
                    </div>
                </div>
            </CardBgColor>
        </div>
    )
}

export default SecuritySummary;