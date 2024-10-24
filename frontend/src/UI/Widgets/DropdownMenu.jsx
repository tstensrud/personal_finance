function DropdownMenu({ showVariable, children }) {
    return (
        <div className={`grid duration-300 ease-in-out ${showVariable ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
            <div className="overflow-hidden">
                {children}
            </div>
        </div>
    );
}

export default DropdownMenu;