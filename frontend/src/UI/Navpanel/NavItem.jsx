import { useNavigate } from 'react-router-dom';
import HomeIcon from "../../assets/menusvgs/HomeIcon";

function NavItem({ svg, url, text, activeIndex, index, setActiveIndex }) {
    const navigate = useNavigate();
    
    const handleClick = () => {
        setActiveIndex(index);
    }

    return (
        <div className="pt-1">
            <div onClick={handleClick} className="group flex w-full p-3 h-9 cursor-pointer bg-tertiary-color rounded-lg hover:bg-grey">
                <div className="flex items-center h-full">
                    {svg}
                </div>
                <div className={`${activeIndex === index ? 'text-primary-color' : 'text-light-grey'} group-hover:text-primary-color text-base flex items-center h-full pl-3 transition duration-200`}>
                    {text}
                </div>
            </div>
        </div>
    );
}

export default NavItem;