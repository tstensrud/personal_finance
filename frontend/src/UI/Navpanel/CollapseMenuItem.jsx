function CollapseMenuItem({ showMenu, setShowMenu }) {

    const handleOnClick = () => {
        setShowMenu(!showMenu);
    }
    return (
        <div className={`flex ${showMenu ? 'justify-end pr-5' : 'justify-center'} items-center w-full duration-300`}>
            <div onClick={handleOnClick} className={`duration-300 ${!showMenu && 'rotate-180'} cursor-pointer p-2 rounded-lg hover:bg-accent-color-main-faded `}>
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" className="fill-primary-color">
                    <path d="m313-480 155 156q11 11 11.5 27.5T468-268q-11 11-28 11t-28-11L228-452q-6-6-8.5-13t-2.5-15q0-8 2.5-15t8.5-13l184-184q11-11 27.5-11.5T468-692q11 11 11 28t-11 28L313-480Zm264 0 155 156q11 11 11.5 27.5T732-268q-11 11-28 11t-28-11L492-452q-6-6-8.5-13t-2.5-15q0-8 2.5-15t8.5-13l184-184q11-11 27.5-11.5T732-692q11 11 11 28t-11 28L577-480Z" />
                </svg>
            </div>
        </div>
    );
}

export default CollapseMenuItem;