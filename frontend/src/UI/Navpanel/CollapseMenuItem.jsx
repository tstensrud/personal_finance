import PlusSquareIcon from "../../assets/menusvgs/PlusSquareIcon";
import MinusSquareIcon from "../../assets/menusvgs/MinusSquareIcon";
import MaximizeIcon from "../../assets/menusvgs/MaximizeIcon";
import MinimizeIcon from "../../assets/menusvgs/MinimizeIcon";

function CollapseMenuItem({ showMenu, setShowMenu }) {

    const handleOnClick = () => {
        setShowMenu(!showMenu);
    }
    return (
        <div onClick={handleOnClick} className={`flex justify-center cursor-pointer items-center h-9 w-full`}>
            <div className="flex p-1">
                {
                    showMenu ? (
                        <MinimizeIcon />
                    ) : (
                        <MaximizeIcon />
                    )
                }
            </div>
        </div>
    );
}

export default CollapseMenuItem;