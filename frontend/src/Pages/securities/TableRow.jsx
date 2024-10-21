function TableRow() {
    return (
        <tr className="border-t border-light-grey hover:bg-tertiary-color-faded text-sm">
            <td className="w-5 text-center justify-center h-10">
                <input type="checkbox" />
            </td>
            <td className="w-16 h-10 text-center">
                Apple
            </td>
            <td className="w-10 h-10 text-center">
                AAPL
            </td>
            <td className="w-20 h-10 text-center">
                5
            </td>
            <td className="w-20 h-10 text-center">
                $ 123
            </td>
            <td className="w-20 h-10 text-center">
                $ {5 * 123}
            </td>
        </tr>
    );
}

export default TableRow;