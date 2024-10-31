import { useContext, useEffect, useState } from 'react';

import useDelete from '../../hooks/useDeleteData.jsx';
import useUpdateData from '../../hooks/useUpdateData.jsx';
import { GlobalContext } from '../../context/GlobalContext.jsx';

import DropdownMenu from '../../ui/widgets/DropdownMenu.jsx'
import DeleteButton from '../../ui/formcomponents/DeleteButton.jsx';
import CloseButton from '../../ui/formcomponents/CloseButton.jsx';
import EditButton from '../../ui/formcomponents/EditButton.jsx';
import UpdateButton from '../../ui/formcomponents/UpdateButton.jsx';
import ErrorIcon from '../../assets/ErrorIcon.jsx'


function TableRow({ data, refetch, currencyConversion }) {
    const [showOptions, setShowOptions] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const { currency } = useContext(GlobalContext);

    const { data: deleteData, setData: setDeleteData, loading: deleteLoading, response: deleteResponse, error: deleteError, handleSubmit: deleteSubmit } = useDelete(`/api/securities/delete/`);
    const { data: updateData, setData: setUpdateData, loading: updateLoading, response: updateResponse, error: updateError, handleSubmit: updateSubmit } = useUpdateData(data.server_data ? `/api/securities/update/${data.server_data.uid}/` : null);

    useEffect(() => {
        const deleteSecurity = async () => {
            if (deleteData.uid) {
                await deleteSubmit();
            }
        }
        deleteSecurity();
    }, [deleteData]);

    useEffect(() => {
        if (deleteResponse?.success) {
            refetch();
        }
    }, [deleteResponse])

    useEffect(() => {
        if (updateResponse?.success) {
            refetch();
            setUpdateData({});
            setEditOpen(false);
            setShowOptions(false);
        }
    }, [updateResponse]);

    const handleShowOptionsClick = () => {
        if (!showOptions) {
            setShowOptions(true);
        }
    }

    const handleDeleteClick = () => {
        setDeleteData({
            uid: data.server_data.uid
        })
    }

    const handleEditClick = () => {
        setEditOpen(!editOpen)
    }

    const handleCloseClick = () => {
        setEditOpen(false);
        setShowOptions(false);
    }

    const handleUpdateClick = async () => {
        if (updateData.quantity !== data.server_data.quantity) {
            await updateSubmit();
        }
    }


    return (
        <div onClick={handleShowOptionsClick} className={`cursor-pointer flex-col justify-center text-sm border-b border-grey-border-color w-full bg-secondary-color ${!showOptions && 'hover:bg-table-hover'} `}>
            <div className="flex">
                <div className="flex items-center w-[10%] h-10 justify-start pl-5">
                    {data?.server_data?.ticker.toUpperCase()}
                </div>
                <div className="hidden sm:flex sm:w-[30%] items-center h-10 justify-center">
                    {data?.security_data?.longName}
                </div>
                <div className="flex items-center w-1/2 sm:w-[20%] h-10 justify-center">
                    {
                        editOpen ? (
                            <input onChange={(e) => setUpdateData({ quantity: e.target.value })} className="h-[90%] w-full rounded-lg border border-grey-border-color bg-secondary-color pl-3 outline-none hover:border-accent-color-main focus:border-accent-color-main" placeholder='New quantity' required />
                        ) : (
                            <>
                                {data?.server_data?.quantity}
                            </>
                        )
                    }
                </div>
                <div className="hidden sm:flex sm:w-[20%] items-center h-10 justify-center">
                    <div className="flex w-1/2 justify-end">
                        {data?.closing_value && Number((data?.closing_value * currencyConversion).toFixed(0)).toLocaleString()}
                    </div>
                    <div className="flex w-1/2 justify-start text-light-grey pl-2">
                        {currency.toUpperCase()}

                    </div>
                </div>
                <div className="flex items-center justify-end w-[40%] sm:w-[20%] h-10 pr-5">
                    {data?.closing_value && data?.server_data && Number((data?.closing_value * data?.server_data?.quantity * currencyConversion).toFixed(0)).toLocaleString()} <div className="text-light-grey pl-2">{currency.toUpperCase()}</div>
                </div>
            </div>
            <DropdownMenu showVariable={showOptions} >

                <div className="flex items-center justify-center h-10 gap-5 w-full">
                    <DeleteButton loading={deleteLoading} onClick={handleDeleteClick} />
                    {
                        editOpen ? <UpdateButton loading={updateLoading} onClick={handleUpdateClick} /> : <EditButton onClick={handleEditClick} />
                    }

                    <CloseButton onClick={handleCloseClick} />
                </div>
                {
                    updateResponse?.success === false && (
                        <div className="w-full h-10 flex items-center justify-center">
                            <div className="h-10 flex items-center pr-3">
                                <ErrorIcon dimensions={20} />
                            </div>
                            <div className="h-10 flex items-center">
                                {updateResponse.message}
                            </div>
                        </div>
                    )
                }
            </DropdownMenu>
        </div>
    );
}

export default TableRow;