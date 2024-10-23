import { useState } from "react";

import InputRow from "./InputRow";

function TableRow({ currentUser, expense, income, source, amount, percentage, borderTop, editable }) {
    const [showOptions, setShowOptions] = useState(false);
    const [editRow, setShowEditRow] = useState(false);

    const handleEditClick = (e) => {
        e.preventDefault();
        setShowEditRow(!editRow)
    }

    const handleCloseClick = (e) => {
        e.preventDefault();
        setShowOptions(false);
    }

    const handleOpenOptions = (e) => {
        e.preventDefault();
        if (!showOptions) {
            setShowOptions(true);
        }
    }

    return (
        <div className="flex flex-col text-sm">
            <div onClick={editable && handleOpenOptions} className={`flex cursor-pointer w-full h-8 items-center  ${!borderTop && 'hover:bg-tertiary-color-faded'} ${(borderTop || showOptions) && 'border-t border-grey-border-color'}`}>
                <div className="flex items-center h-full pl-2">
                    {source}
                </div>
                <div className={`flex items-center h-full ${!editRow && 'pr-2'} flex-1 justify-end`}>
                    {
                        editRow ? (
                            <div className="flex w-full h-full justify-end">
                                <input type="text" className="top-0 border border-grey-border-color pl-2 w-1/3 h-full bg-secondary-color hover:border-accent-color-main focus:border-accent-color-main outline-none" />
                            </div>
                        ) : (
                            <>
                                {
                                    amount.toLocaleString()
                                }
                                {
                                    percentage ? '%' : 'kr'
                                }
                            </>
                        )
                    }
                </div>



            </div>
            {
                showOptions && (
                    <div className="flex p-2 bg-tertiary-color w-full justify-center gap-3 items-center border-b border-b-tertiary-color-faded">
                        <div>
                            <button className="pl-2 pr-2 pt-1 pb-1 border border-grey-border-color rounded-full hover:border-accent-color-main">Delete</button>
                        </div>
                        <div>
                            <button onClick={handleCloseClick} className="pl-2 pr-2 pt-1 pb-1 border border-grey-border-color rounded-full hover:border-accent-color-main">Close</button>
                        </div>
                        <div>
                            <button onClick={handleEditClick} className="pl-2 pr-2 pt-1 pb-1 border border-grey-border-color rounded-full hover:border-accent-color-main">
                                {
                                    editRow ? (
                                        'Cancel'
                                    ) : (
                                        'Edit'
                                    )
                                }
                            </button>
                        </div>
                        <div>
                            <button onClick={handleCloseClick} className="pl-2 pr-2 pt-1 pb-1 border border-grey-border-color rounded-full hover:border-accent-color-main">Update</button>
                        </div>
                    </div>
                )
            }
        </div>
    );
}

export default TableRow;