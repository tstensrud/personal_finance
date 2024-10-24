import { useState } from 'react';

import DeleteIcon from '../../assets/menusvgs/DeleteIcon.jsx';
import EditIcon from '../../assets/menusvgs/EditIcon.jsx';
import CloseIcon from '../../assets/menusvgs/CloseIcon.jsx'
import DropdownMenu from '../../ui/widgets/DropdownMenu.jsx'


function TableRow() {
    const [showOptions, setShowOptions] = useState(false);

    const handleShowOptionsClick = () => {
        if (!showOptions) {
            setShowOptions(true);
        }
    }
    return (
        <div onClick={handleShowOptionsClick} className={`cursor-pointer flex-col justify-center text-sm border-b border-grey-border-color w-full bg-tertiary-color ${!showOptions && 'hover:bg-accent-color-main-faded'} `}>
            <div className="flex">
                <div className="flex items-center w-[10%] h-10 justify-start pl-5">
                    Ticker
                </div>
                <div className="hidden sm:flex sm:w-[30%] items-center h-10 justify-center">
                    Name
                </div>
                <div className="flex items-center w-1/2 sm:w-[20%] h-10 justify-center">
                    Quantity
                </div>
                <div className="hidden sm:flex sm:w-[20%] items-center h-10 justify-center">
                    Last closing
                </div>
                <div className="flex items-center justify-end w-[40%] sm:w-[20%] h-10 pr-5">
                    Value
                </div>
            </div>
            <DropdownMenu showVariable={showOptions} >
                <div className="flex items-center justify-center gap-20 w-full">

                    <div onClick={null} className={`group cursor-pointer flex h-10 items-center`}>
                        <div className={`w-full h-full flex `}>
                            <div className={`flex items-center h-full `}>
                                <DeleteIcon />
                            </div>
                            <div className={`pl-1 font-semibold text-sm text-light-grey group-hover:text-primary-color flex flex-1 items-center h-full  duration-100 overflow-hidden`}>
                                Delete
                            </div>
                        </div>
                    </div>

                    <div onClick={null} className={`group cursor-pointer flex h-10 items-center`}>
                        <div className={`w-full h-full flex`}>
                            <div className={`flex items-center h-full `}>
                                <EditIcon />
                            </div>
                            <div className={`pl-1 font-semibold text-sm text-light-grey group-hover:text-primary-color flex flex-1 items-center h-full  duration-100 overflow-hidden`}>
                                Edit
                            </div>
                        </div>
                    </div>

                    <div onClick={() => setShowOptions(false)} className={`group cursor-pointer flex h-10 items-center`}>
                        <div className={`w-full h-full flex`}>
                            <div className={`flex items-center h-full `}>
                                <CloseIcon />
                            </div>
                            <div className={`pl-1 font-semibold text-sm text-light-grey group-hover:text-primary-color flex flex-1 items-center h-full  duration-100 overflow-hidden`}>
                                Close
                            </div>
                        </div>
                    </div>

                </div>
            </DropdownMenu>
        </div>
    );
}

export default TableRow;