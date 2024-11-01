import CardBgColor from "../../ui/CardBgColor";

function SecuritySummary() {
    return (
        <div className="w-96">
            <CardBgColor>
                <div className="flex flex-col p-2 w-full">
                    <div className="w-full text-lg -tracking-wider font-semibold">
                        Your securities
                    </div>
                </div>
            </CardBgColor>
        </div>
    )
}

export default SecuritySummary;