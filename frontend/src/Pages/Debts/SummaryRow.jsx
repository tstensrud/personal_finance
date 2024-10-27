function SummaryRow({ rowTitle, rowValue, maximized }) {
    return (
        <div className="w-full flex text-sm">
            <div className="text-light-grey w-36">
                {rowTitle}
            </div>
            <div className={`flex justify-end w-56`}>
                {rowValue}
            </div>
        </div>

    );
}

export default SummaryRow;