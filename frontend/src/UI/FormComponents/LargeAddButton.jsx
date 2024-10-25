import LoadingSpinner from "../widgets/LoadingSpinner";

function LargeAddButton({onClick, type, loading}) {
    
    const handleClick = (e) => {
        e.preventDefault();
        onClick();
    }

    return (
        <button onClick={handleClick} className="border border-grey-border-color hover:border-accent-color-main focus:border-accent-color-main rounded-lg h-10 w-20 focus:outline-none  hover:bg-accent-color-main-faded">
            <div className="flex h-full items-center pl-2">
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" width={18} height={18} viewBox="0 0 24 24" className="stroke-primary-color stroke-2">
                        <line x1="12" y1="5" x2="12" y2="19"></line>
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                </div>

                <div className="flex flex-1 justify-center pr-2">
                    {
                        loading ? <LoadingSpinner /> : 'Add'
                    }
                </div>
            </div>
        </button>
    );
}

export default LargeAddButton;