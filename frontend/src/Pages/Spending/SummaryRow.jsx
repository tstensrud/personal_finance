function SummaryRow({ text, value, borderTop, tail }) {
    return (
        <div className={`flex w-full h-8 items-center ${borderTop && 'border-t border-grey-border-color'} text-sm`}>
            <div className="flex items-center h-full pl-2">
                {text}
            </div>
            <div className={`flex items-center h-full pr-2 flex-1 justify-end`}>
                {value.toLocaleString()} {tail}
            </div>
        </div>
    );
}

export default SummaryRow;