import { useNavigate } from 'react-router-dom';

function NavItem({ svg, url, text, activeIndex, index, setActiveIndex, showMenu, lastIndex }) {

    const navigate = useNavigate();

    const handleClick = () => {
        if (activeIndex) {
            setActiveIndex(index);
        }
        navigate(url)
    }

    return (
        <div onClick={handleClick} className={`group cursor-pointer flex w-full h-8 ${activeIndex === index ? '' : ''}`}>
            <div className={`w-full flex`}>
                <div className={`flex w-full pl-4 ${activeIndex === index && 'bg-accent-color-main-faded'} ${showMenu ? '' : 'justify-center'} rounded-lg`}>
                    
                    <div className={`flex ${showMenu ? '' : ''} items-center h-full `}>
                        {svg}
                    </div>

                    <div className={`pl-3 font-semibold text-sm flex flex-1 items-center h-full transition duration-100 overflow-hidden whitespace-nowrap ${activeIndex === index ? 'text-accent-color-main group-hover:text-accent-color-main' : 'text-light-grey group-hover:text-primary-color'}`}>
                        { showMenu && <>{text}</> }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NavItem;
