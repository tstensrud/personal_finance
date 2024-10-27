import { useState } from 'react';

import Input from '../../ui/formcomponents/Input.jsx';
import SelectMenu from '../../ui/formcomponents/SelectMenu.jsx';
import LargeAddButton from '../../ui/formcomponents/LargeAddButton.jsx';
import DropdownMenu from '../../ui/widgets/DropdownMenu.jsx';


function AddNewDebt() {

    const [showDropdown, setShowDropdown] = useState(false);

    return (
        <div className="flex flex-col mb-5 p-2 border border-grey-border-color rounded-lg w-96">
            <div className="flex w-full h-6 items-center pl-1 mb-2">
                <div className="h-full items-center">
                    Add new debt
                </div>
                <div className="flex flex-1 justify-end h-full">
                    {
                        showDropdown ? (
                            <svg onClick={() => setShowDropdown(!showDropdown)} xmlns="http://www.w3.org/2000/svg" height={20} viewBox="0 -960 960 960" width={20} className="cursor-pointer fill-light-grey hover:fill-primary-color duration-200">
                                <path d="m296-80-56-56 240-240 240 240-56 56-184-184L296-80Zm184-504L240-824l56-56 184 184 184-184 56 56-240 240Z" />
                            </svg>
                        ) : (
                            <svg onClick={() => setShowDropdown(!showDropdown)} xmlns="http://www.w3.org/2000/svg" height={20} viewBox="0 -960 960 960" width={20} className="cursor-pointer fill-light-grey hover:fill-primary-color duration-200">
                                <path d="M480-80 240-320l57-57 183 183 183-183 57 57L480-80ZM298-584l-58-56 240-240 240 240-58 56-182-182-182 182Z" />
                            </svg>
                        )
                    }
                </div>
            </div>
            <DropdownMenu showVariable={showDropdown}>
                <div className="flex flex-col gap-2">
                <div className="flex w-full h-10">
                        <SelectMenu menuTitle="Choose debt type" />
                    </div>
                    <div className="flex w-full h-10">
                        <Input placeholder="Lender" />
                    </div>
                    <div className="flex w-full h-10">
                        <Input placeholder="Total owed" />
                    </div>
                    <div className="flex w-full h-10">
                        <Input placeholder="Expected payed by" />
                    </div>
                    <div className="flex w-full h-10">
                        <LargeAddButton />
                    </div>
                </div>
            </DropdownMenu>
        </div>
    );
}

export default AddNewDebt;