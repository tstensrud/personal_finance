import { useEffect, useRef, useState } from 'react';

import useSubmitData from '../../hooks/useSubmitData.jsx';

import Input from '../../ui/formcomponents/Input.jsx';
import SelectMenu from '../../ui/formcomponents/SelectMenu.jsx';
import LargeAddButton from '../../ui/formcomponents/LargeAddButton.jsx';
import DropdownMenu from '../../ui/widgets/DropdownMenu.jsx';


function AddNewDebt({ debtTypes, currentUser, refetch }) {

    const [showDropdown, setShowDropdown] = useState(false);
    const [resetFlagForSelectMenu, setResetFlagForResetMenu] = useState(false);

    const nameRef = useRef(null);
    const totalRef = useRef(null);
    const dateRef = useRef(null);

    const { data: newDebtData, setData: setNewDebtData, error: newDebtError, loading: newDebtLoading, response: newDebtResponse, handleSubmit: submitNewDebt } = useSubmitData(`/api/debts/new/${currentUser.uid}/`);

    useEffect(() => {
        if (newDebtResponse?.success) {
            nameRef.current.value = '';
            totalRef.current.value = '';
            dateRef.current.value = '';
            setResetFlagForResetMenu(!resetFlagForSelectMenu);
            refetch();
        }
    },[newDebtResponse])
    const handleDebtUidChange = (uid) => {
        setNewDebtData({ debt_type: uid })
    }

    const handleInputChange = (e) => {
        setNewDebtData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }))
    }

    const handleSubmitNewDebt = async () => {
        if (newDebtData.debt_type && newDebtData.name && newDebtData.value && newDebtData.end_date) {
            await submitNewDebt();
        }
    }


    return (
        <div className="flex flex-col mb-5 p-2 bg-tertiary-color  border-grey-border-color rounded-lg sm:w-96 w-full">

            <div onClick={() => setShowDropdown(!showDropdown)}  className="group cursor-pointer flex w-full h-8 items-center pl-1">
                <div className="flex h-full items-center">
                    Add new debt
                </div>
                <div className="flex flex-1 justify-end items-center h-full">
                    {
                        showDropdown ? (
                            <svg xmlns="http://www.w3.org/2000/svg" height={20} viewBox="0 -960 960 960" width={20} className="cursor-pointer fill-light-grey group-hover:fill-primary-color duration-200">
                                <path d="m296-80-56-56 240-240 240 240-56 56-184-184L296-80Zm184-504L240-824l56-56 184 184 184-184 56 56-240 240Z" />
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" height={20} viewBox="0 -960 960 960" width={20} className="cursor-pointer fill-light-grey group-hover:fill-primary-color duration-200">
                                <path d="M480-80 240-320l57-57 183 183 183-183 57 57L480-80ZM298-584l-58-56 240-240 240 240-58 56-182-182-182 182Z" />
                            </svg>
                        )
                    }
                </div>
            </div>
            <DropdownMenu showVariable={showDropdown}>
                <form>
                    <div className="flex flex-col gap-2 mt-2">
                        <div className="flex w-full h-10">
                            <SelectMenu resetFlag={resetFlagForSelectMenu} onClick={handleDebtUidChange} options={debtTypes} menuTitle="Choose debt type" />
                        </div>
                        <div className="flex w-full h-8">
                            <Input ref={nameRef} onChange={handleInputChange} name="name" placeholder="Lender" />
                        </div>
                        <div className="flex w-full h-8">
                            <Input ref={totalRef} onChange={handleInputChange} name="value" placeholder="Total owed" />
                        </div>
                        <div className="flex w-full h-8">
                            <Input ref={dateRef} onChange={handleInputChange} name="end_date" placeholder="Expected payed by year" />
                        </div>
                        <div className="flex w-full h-8">
                            <LargeAddButton loading={newDebtLoading} onClick={handleSubmitNewDebt} />
                        </div>
                    </div>
                </form>
            </DropdownMenu>
        </div>
    );
}

export default AddNewDebt;