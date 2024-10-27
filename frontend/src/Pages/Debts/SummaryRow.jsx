function SummaryRow({ rowTitle, rowValue }) {
    return (
        <div className="w-full flex text-sm">
            <div className="text-light-grey">
                {rowTitle}
            </div>
            <div className="flex flex-1 justify-end">
                {rowValue}
            </div>
        </div>

    );
}

export default SummaryRow;