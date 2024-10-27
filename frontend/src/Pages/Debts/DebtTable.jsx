function DebtTable () {
    return (
        <div className="w-full text-sm pt-5">
            <table className="w-full">
                <thead>
                    <tr className="text-light-grey">
                        <th>Date</th>
                        <th>Value</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="border-t border-grey-border-color">
                        <td className="text-center">12.12.12</td>
                        <td className="text-center">500</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default DebtTable;