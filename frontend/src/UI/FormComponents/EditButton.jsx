function EditButton({ onClick }) {

    const handleClick = (e) => {
        e.preventDefault();
        onClick();
    }
    return (
        <button onClick={handleClick} className="pt-1 pb-1 w-20 h-8 border border-grey-border-color rounded-full hover:border-accent-color-main hover:bg-accent-color-main-faded">
            <div className="flex h-full items-center pl-2">
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" width={15} height={15} viewBox="0 -960 960 960" strokeLinecap="round" strokeLinejoin="round" className={`fill-light-grey group-hover:fill-primary-color  duration-100`}>
                        <path d="M200-200h57l391-391-57-57-391 391v57Zm-40 80q-17 0-28.5-11.5T120-160v-97q0-16 6-30.5t17-25.5l505-504q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L313-143q-11 11-25.5 17t-30.5 6h-97Zm600-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z" />
                    </svg>
                </div>
                <div className="flex flex-1 justify-center pr-2">
                    Edit
                </div>
            </div>
        </button>
    );
}

export default EditButton;