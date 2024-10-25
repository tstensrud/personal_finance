import { useState } from 'react';

import DropdownMenu from '../../ui/widgets/DropdownMenu.jsx'
import DeleteButton from '../../ui/formcomponents/DeleteButton.jsx';
import CloseButton from '../../ui/formcomponents/CloseButton.jsx';
import EditButton from '../../ui/formcomponents/EditButton.jsx';
import UpdateButton from '../../ui/formcomponents/UpdateButton.jsx';


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
                <div className="flex items-center justify-center h-10 gap-5 w-full">
                    <DeleteButton />
                    <EditButton />
                    <CloseButton onClick={() => setShowOptions(false)} />
                </div>
            </DropdownMenu>
        </div>
    );
}

export default TableRow;