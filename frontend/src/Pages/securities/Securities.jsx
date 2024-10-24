import TableRow from './TableRow.jsx';

function Stocks() {
    return (
        <div className="flex flex-col w-full justify-center pt-10">
            <div className="flex text-light-grey justify-center border-b border-grey-border-color w-full bg-tertiary-color pb-2">
                <div className="flex items-end w-[10%] h-20 justify-start pl-5">
                    Ticker
                </div>
                <div className="hidden sm:flex sm:w-[30%] items-end h-20 justify-center">
                    Name
                </div>
                <div className="flex w-1/2 sm:w-[20%] h-20 items-end justify-center">
                    Quantity
                </div>
                <div className="hidden sm:flex sm:w-[20%] h-20 items-end justify-center overflow-hidden text-nowrap">
                    Last closing
                </div>
                <div className="flex justify-end  items-end w-[40%] sm:w-[20%] h-20 pr-5">
                    Value
                </div>
            </div>
            <TableRow />
            <TableRow />
            <TableRow />
            <TableRow />
            <TableRow />
        </div>
    );
}

export default Stocks;