function CloseButton({ onClick }) {

    const handleClick = (e) => {
        e.preventDefault();
        onClick();
    }
    return (
        <button onClick={handleClick} className="pt-1 pb-1 w-20 h-8 border border-grey-border-color rounded-full hover:border-accent-color-main hover:bg-accent-color-main-faded">
            <div className="flex h-full items-center pl-2">
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" width={15} height={15} viewBox="0 -960 960 960" strokeLinecap="round" strokeLinejoin="round" className={`fill-light-grey group-hover:fill-primary-color  duration-100`}>
                        <path d="M480-424 284-228q-11 11-28 11t-28-11q-11-11-11-28t11-28l196-196-196-196q-11-11-11-28t11-28q11-11 28-11t28 11l196 196 196-196q11-11 28-11t28 11q11 11 11 28t-11 28L536-480l196 196q11 11 11 28t-11 28q-11 11-28 11t-28-11L480-424Z" />
                    </svg>
                </div>
                <div className="flex flex-1 justify-center pr-2">
                    Close
                </div>
            </div>
        </button>
    );
}

export default CloseButton;