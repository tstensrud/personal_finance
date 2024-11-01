import LoadingSpinner from '../widgets/LoadingSpinner.jsx';

function AddButton({ onClick, loading }) {

    const handleClick = (e) => {
        e.preventDefault();
        onClick();
    }

    return (
        <button onClick={handleClick} className="pt-1 pb-1 w-20 h-8 border bg-secondary-color border-grey-border-color rounded-full hover:border-accent-color-main hover:bg-accent-color-main-faded">
            <div className="flex h-full items-center pl-2">
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" width={15} height={15} viewBox="0 0 24 24" className="stroke-primary-color stroke-2">
                        <line x1="12" y1="5" x2="12" y2="19"></line>
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                </div>

                <div className="flex flex-1 justify-center pr-2 text-sm">
                    {
                        loading ? <LoadingSpinner /> : 'Add'
                    }
                </div>
            </div>
        </button>
    );
}

export default AddButton;