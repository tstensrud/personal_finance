import { useEffect, useContext, useState } from "react";

import { GlobalContext } from '../../context/GlobalContext.jsx';

import useUpdateData from '../../hooks/useUpdateData.jsx';
import useDeleteData from '../../hooks/useDeleteData.jsx';

import DropdownMenu from "../../ui/widgets/DropdownMenu.jsx";
import DeleteButton from '../../ui/formcomponents/DeleteButton.jsx';
import CloseButton from '../../ui/formcomponents/CloseButton.jsx';
import EditButton from '../../ui/formcomponents/EditButton.jsx';
import UpdateButton from '../../ui/formcomponents/UpdateButton.jsx';

function TableRow({ expense, percentage, borderTop, editable, data, refetch }) {
    const { currency } = useContext(GlobalContext);

    const [showOptions, setShowOptions] = useState(false);
    const [editRow, setShowEditRow] = useState(false);
    const [newValue, setNewValue] = useState(0);

    const { data: updatedData, setData: setUpdatedData, loading: updateLoading, error: errorLoading, response: updateResponse, handleSubmit: handleUpdateSubmit } = useUpdateData(`/api/spending_plan/update_post/`);
    const { data: deletedData, setData: setDeleteData, loading: deleteLoading, error: deleteError, response: deleteResponse, handleSubmit: handleDeleteSubmit } = useDeleteData(`/api/spending_plan/delete_post/`);


    useEffect(() => {
        const updateData = async () => {
            if (updatedData.user_uid && updatedData.post_uid && updatedData.data) {
                await handleUpdateSubmit();
            }
        }
        updateData();
    }, [updatedData]);

    useEffect(() => {
        if (updateResponse?.success) {
            setUpdatedData({});
            setShowEditRow(false);
            setShowOptions(false);
            refetch();
        }
    }, [updateResponse]);

    useEffect(() => {
        const deleteData = async () => {
            if (deletedData.uuid && deletedData.post_uid) {
                await handleDeleteSubmit();
            }
        }
        deleteData();
    }, [deletedData]);

    useEffect(() => {
        if (deleteResponse?.success) {
            setShowEditRow(false);
            setShowOptions(false);
            refetch();
        }
    }, [deleteResponse]);

    // Handlers
    const handleUpdateChange = (e) => {
        setNewValue(e.target.value);
    }

    const handleEditClick = () => {
        setShowEditRow(!editRow);
        setUpdatedData({});
    }

    const handleCloseClick = () => {
        setShowOptions(false);
        setShowEditRow(false);
        setUpdatedData({})
    }

    const handleOpenOptions = (e) => {
        e.preventDefault();
        if (!showOptions) {
            setShowOptions(true);
        }
    }

    const handleUpdateClick = () => {
        setUpdatedData({
            user_uid: data.user_uid,
            post_uid: data.uid,
            data: newValue,
            expense: expense ? true : false
        });
    }

    const handleDeleteClick = () => {
        setDeleteData({
            uuid: data.user_uid,
            post_uid: data.uid,
            expense: expense ? true : false
        })
    }

    return (
        <div className="flex flex-col text-sm">
            <div onClick={editable ? handleOpenOptions : null} className={`flex cursor-pointer w-full h-8 items-center  ${!borderTop && 'hover:bg-table-hover'} ${(borderTop || showOptions) && 'border-t border-grey-border-color'}`}>
                <div className="flex items-center h-full pl-2">
                    {data?.type_name}
                </div>
                <div className={`flex items-center h-full ${!editRow && 'pr-2'} flex-1 justify-end`}>
                    {
                        editRow ? (
                            <div className="flex w-full h-full justify-end">
                                <input onChange={handleUpdateChange} name="newValue" type="text" className="top-0 border border-grey-border-color pl-2 w-1/3 h-full rounded-lg bg-secondary-color hover:border-accent-color-main focus:border-accent-color-main outline-none" placeholder="New value" />
                            </div>
                        ) : (
                            <>
                                {
                                    data?.amount.toLocaleString()
                                }
                                <div className="pl-2">
                                    {
                                        percentage ? '%' : currency.toUpperCase()
                                    }
                                </div>
                            </>
                        )
                    }
                </div>

            </div>
            <DropdownMenu showVariable={showOptions}>
                <div className="flex p-2 bg-secondary-color w-full justify-center gap-3 items-center border-b border-b-grey-border-color">
                        <DeleteButton loading={deleteLoading} onClick={handleDeleteClick} />
                        <CloseButton onClick={handleCloseClick} />
                        {
                            editRow ? (
                                <UpdateButton loading={updateLoading} onClick={handleUpdateClick} />
                            ) : (
                                <EditButton onClick={handleEditClick} />
                            )
                        }
                </div>
            </DropdownMenu>
        </div>
    );
}

export default TableRow;