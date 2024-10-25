import LoadingSpinner from "../widgets/LoadingSpinner";

function LargeButton({onClick, type, loading, buttonText}) {
    
    const handleClick = (e) => {
        e.preventDefault();
        onClick();
    }

    return (
        <button onClick={handleClick} className="border border-grey-border-color hover:border-accent-color-main focus:border-accent-color-main rounded-lg h-10 w-20 focus:outline-none  hover:bg-accent-color-main-faded">
            <div className="flex h-full items-center pl-2">
                <div className="flex flex-1 justify-center pr-2">
                    {
                        loading ? <LoadingSpinner /> : buttonText
                    }
                </div>
            </div>
        </button>
    );
}

export default LargeButton;