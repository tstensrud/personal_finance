import TableRow from './TableRow.jsx';

function Stocks() {
    return (
        <div className="flex w-full justify-center pt-10">
            <table className="w-full whitespace-nowrap border-collapse box-border bg-tertiary-color rounded-lg">
                <thead>
                    <tr className="text-light-grey">
                        <td className="w-[5%] justify-center text-center h-20">
                            
                        </td>
                        <td className="w-[25%] h-20 text-center">
                            Name
                        </td>
                        <td className="w-[10%] h-20 text-center">
                            Ticker
                        </td>
                        <td className="w-[20%] h-20 text-center">
                            Quantity
                        </td>
                        <td className="w-[20%] h-20 text-center">
                            Last closing
                        </td>
                        <td className="w-[20%] h-20 text-center">
                            Value
                        </td>
                    </tr>
                </thead>
                <tbody>
                    <TableRow />
                    <TableRow />
                    <TableRow />
                    <TableRow />
                    <TableRow />
                    <TableRow />
                    <TableRow />
                    <TableRow />
                </tbody>
            </table>
        </div>
    );
}

export default Stocks;