import { useNavigate } from 'react-router-dom';

function NavItem({ svg, url, text, activeIndex, index, setActiveIndex, showMenu, setShowSettingsMenu }) {

    const navigate = useNavigate();

    const handleClick = () => {
        if (setActiveIndex) {
            setActiveIndex(index);
        }
        if (setShowSettingsMenu) {
            setShowSettingsMenu(false);
        }
        navigate(url)
    }

    return (
        <div onClick={handleClick} className={`group cursor-pointer flex w-full h-10 ${activeIndex === index ? '' : ''}`}>
            <div className={`w-full flex`}>

                <div className={`flex w-full pl-[15px] sm:pr-0 pr-[15px] ${showMenu ? '' : 'justify-center'} ${activeIndex !== index && 'group-hover:bg-accent-color-main-faded'} duration-100 rounded-lg`}>
                    
                    <div className={`flex ${showMenu ? '' : ''} items-center h-full `}>
                        {svg}
                    </div>

                    <div className={`pl-4 text-sm sm:text-base flex flex-1 items-center h-full tracking-wide duration-100 overflow-hidden whitespace-nowrap ${activeIndex === index ? 'text-accent-color-main group-hover:text-accent-color-main' : 'text-primary-color'}`}>
                        {text}
                    </div>
                </div>

            </div>
        </div>
    );
}

export default NavItem;
