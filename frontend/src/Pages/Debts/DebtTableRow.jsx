function DebtTableRow({ date, value }) {
    return (
        <tr className="border-t border-grey-border-color h-8">
            <td className="text-center">
                {date}
            </td>
            <td className="text-center">{value.toLocaleString()}</td>
        </tr>
    );
}

export default DebtTableRow;