import { useState } from 'react';
import VerticalDots from '../../assets/VerticalDots.jsx';
import NavItem from '../../ui/navpanel/NavItem.jsx';
import DeleteIcon from '../../assets/menusvgs/DeleteIcon.jsx';
import EditIcon from '../../assets/menusvgs/EditIcon.jsx';
import CloseIcon from '../../assets/menusvgs/CloseIcon.jsx'


function TableRow() {
    const [showOptions, setShowOptions] = useState(false);

    const handleShowOptions = () => {
        setShowOptions(!showOptions)
    }
    return (
        <tr className="border-t border-grey-border-color hover:bg-tertiary-color-faded text-sm">
            <td className="relative items-center w-[5%] text-center justify-center h-10">
                <div onClick={handleShowOptions} className="h-full w-full flex justify-center items-center group cursor-pointer">
                    <VerticalDots dimensions={20} />
                </div>
                {
                    showOptions && (
                        <div className="absolute bg-tertiary-color border border-grey-border-color rounded-lg p-2 w-32 top-5 left-full z-50">
                            <div onClick={null} className={`group cursor-pointer flex w-full h-full`}>
                                <div className={`w-full flex`}>
                                    <div className={`flex items-center h-full `}>
                                        <DeleteIcon />
                                    </div>
                                    <div className={`pl-3 font-semibold text-sm text-light-grey group-hover:text-primary-color flex flex-1 items-center h-full transition duration-100 overflow-hidden`}>
                                        Delete
                                    </div>
                                </div>
                            </div>

                            <div onClick={null} className={`group cursor-pointer flex w-full h-full pt-3`}>
                                <div className={`w-full flex`}>
                                    <div className={`flex items-center h-full `}>
                                        <EditIcon />
                                    </div>
                                    <div className={`pl-3 font-semibold text-sm text-light-grey group-hover:text-primary-color flex flex-1 items-center h-full transition duration-100 overflow-hidden`}>
                                        Edit
                                    </div>
                                </div>
                            </div>

                            <div onClick={handleShowOptions} className={`group cursor-pointer flex w-full h-full pt-3`}>
                                <div className={`w-full flex`}>
                                    <div className={`flex items-center h-full `}>
                                        <CloseIcon />
                                    </div>
                                    <div className={`pl-3 font-semibold text-sm text-light-grey group-hover:text-primary-color flex flex-1 items-center h-full transition duration-100 overflow-hidden`}>
                                        Close
                                    </div>
                                </div>
                            </div>

                        </div>
                    )
                }
            </td>
            <td className="w-[25%] h-10 text-center">
                Apple
            </td>
            <td className="w-[10%] h-10 text-center">
                AAPL
            </td>
            <td className="w-[20%] h-10 text-center">
                5
            </td>
            <td className="w-[20%] h-10 text-center">
                $ 123
            </td>
            <td className="w-[20%] h-10 text-center">
                $ {5 * 123}
            </td>
        </tr>
    );
}

export default TableRow;