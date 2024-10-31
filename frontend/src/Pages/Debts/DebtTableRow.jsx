function DebtTableRow({ date, value }) {
    return (
        <tr className="border-t border-grey-border-color h-8 hover:bg-table-hover">
            <td className="text-start pl-2">
                {date}
            </td>
            <td className="text-center">{value.toLocaleString()}</td>
        </tr>
    );
}

export default DebtTableRow;