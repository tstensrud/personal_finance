import PlusSquareIcon from "../../assets/menusvgs/PlusSquareIcon";
import MinusSquareIcon from "../../assets/menusvgs/MinusSquareIcon";
import MaximizeIcon from "../../assets/menusvgs/MaximizeIcon";
import MinimizeIcon from "../../assets/menusvgs/MinimizeIcon";

function CollapseMenuItem({ showMenu, menuPinned, handlePinMenuClick }) {

    const handleOnClick = (e) => {
        e.preventDefault();
        handlePinMenuClick(e);
        console.log(menuPinned)
    }
    return (
        <div onClick={handleOnClick} className={`flex justify-center cursor-pointer items-center h-9 w-full`}>
            <div className="border border-light-grey rounded-lg p-1">
                {
                    menuPinned ? (
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