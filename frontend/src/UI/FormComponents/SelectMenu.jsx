import { useEffect, useState } from "react";

function SelectMenu({ menuTitle, options, onClick, resetFlag }) {

    const [showDropdown, setShowDropdown] = useState(false);
    const [selectedOption, setSelectedOption] = useState("");

    useEffect(() => {
        setSelectedOption("");
    },[resetFlag]);
    
    const handleOptionClick = (option) => {
        onClick(option.uid);
        setSelectedOption(option);
        setShowDropdown(false);
    }
    
    return (
        <div className="w-full relative text-sm">
            <div onClick={() => setShowDropdown(!showDropdown)} className="flex border rounded-lg border-grey-border-color pl-2 w-full h-8 bg-secondary-color hover:border-accent-color-main focus:border-accent-color-main outline-none">
                <div className="h-full items-center flex">
                    {
                        selectedOption ? (
                            <>
                                {selectedOption.category_name.charAt(0).toUpperCase() + selectedOption.category_name.slice(1)}
                            </>
                        ) : (
                            <>
                                {menuTitle}
                            </>
                        )
                    }
                </div>
                <div className="flex flex-1 justify-end h-full items-center pr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" className="stroke-primary-color stroke-2">
                        <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                </div>
            </div>
            {
                showDropdown && (
                    <div className="absolute z-10 h-28 overflow-y-auto top-9 w-full rounded-lg border border-accent-color-main bg-secondary-color outline-none">

                        {
                            Object.keys(options)
                                .sort((a, b) => {
                                    return options[a].category_name.localeCompare(options[b].category_name);
                                })
                                .map((key, index) => {
                                    if (options[key].uid === selectedOption.uid) {
                                        return null;
                                    } else {
                                        return (
                                            <div onClick={() => handleOptionClick(options[key])} key={index} className="cursor-pointer p-2 h-8 w-full items-center hover:bg-accent-color-main-faded">
                                                {
                                                    options[key].category_name.charAt(0).toUpperCase() + options[key].category_name.slice(1)
                                                }
                                            </div>
                                        )
                                    }
                                }
                            )
                        }
                    </div>
                )
            }
        </div>
    );
}

export default SelectMenu;