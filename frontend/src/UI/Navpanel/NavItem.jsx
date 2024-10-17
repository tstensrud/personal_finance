import HomeIcon from "../../assets/menusvgs/HomeIcon";

function NavItem({ svg, url, text, activeIndex, index }) {

    return (
        <div className="pt-1">
            <div className="group flex w-full p-3 h-9 cursor-pointer bg-tertiary-color rounded-lg hover:bg-grey text-light-grey text-base tracking-wide hover:text-primary-color transition duration-200">
                <div className="flex items-center h-full">
                    {svg}
                </div>
                <div className="flex items-center h-full pl-3">
                    {text}
                </div>
            </div>
        </div>
    );
}

export default NavItem;