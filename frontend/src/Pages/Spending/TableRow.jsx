function TableRow({ source, amount, percentage, borderTop }) {
    return (
        <div className= {`flex w-full h-8 items-center text-sm hover:bg-grey-opacity ${borderTop && 'border-t border-grey'}`}>
            <div className="flex items-center h-full pl-2">{source}</div>
            <div className="flex items-center h-full  pr-2 flex-1 justify-end">
                {amount.toLocaleString()}
                {
                    percentage ? '%' : 'kr'
                }
                </div>
        </div>
    );
}

export default TableRow;