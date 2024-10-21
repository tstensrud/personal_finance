function Input({ type, name, value, onChange, placeholder, search }) {
    return (
        <div className="flex w-full h-full">
            <input name={name} value={value} type={type} onChange={onChange} placeholder={placeholder}
                className="
        w-full
        h-full
        pl-4
        bg-secondary-color
        border
        border-grey
        rounded-lg
        outline-none
        hover:border-accent-color-main
        focus:border-accent-color-main
        " />
            {
                search && (
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" className="stroke-light-grey fill-none relative right-8 top-1/2 -translate-y-1/2">
                        <circle cx="10.5" cy="10.5" r="7.5"></circle>
                        <line x1="21" y1="21" x2="15.8" y2="15.8"></line>
                    </svg>
                )
            }
        </div>
    );
}

export default Input;