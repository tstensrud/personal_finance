import CardBgColor from "../../ui/CardBgColor";
import AssetsIcon from '../../assets/menusvgs/AssetsIcon.jsx';

function AssetsSummary() {
    return (
        <div className="w-96">
            <CardBgColor>
                <div className="flex flex-col p-2 w-full">
                    <div className="flex items-center gap-2 w-full text-lg -tracking-wider font-semibold">
                        <AssetsIcon /> <span>Your assets</span>
                    </div>
                </div>
            </CardBgColor>
        </div>
    );
}

export default AssetsSummary;