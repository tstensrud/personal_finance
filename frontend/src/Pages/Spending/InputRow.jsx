import { useEffect, useRef, useState } from 'react';

// Hooks
import useSubmitData from '../../hooks/useSubmitData.jsx';
import useFetch from '../../hooks/useFetch.jsx';

import SelectMenu from '../../ui/formcomponents/SelectMenu.jsx';
import ErrorIcon from '../../assets/ErrorIcon.jsx';
import LoadingSpinner from '../../ui/widgets/LoadingSpinner.jsx';

function InputRow({ currentUser, showInputRow, placeholder, expense, refetch }) {

    const { data: categories, loading: categoriesLoading, error: categoriesError } = useFetch(
        expense ?
            `/api/spending_categories/expenses/` :
            `/api/spending_categories/income/`
    );

    const { data, setData, response, loading, error, handleSubmit } = useSubmitData(
        expense ?
            `/api/add_post/expense/${currentUser.uid}/` :
            `/api/add_post/income/${currentUser.uid}/`
    );

    const [submittedFlag, setSubmittedFlag] = useState(false);
    const [emptySelectError, setEmptySelectError] = useState("");

    const sourceRef = useRef(null);
    const amountRef = useRef(null);

    useEffect(() => {
        setData({});
        sourceRef.current.value = '';
        amountRef.current.value = '';
    }, [showInputRow]);

    useEffect(() => {
        if (response?.success) {
            sourceRef.current.value = '';
            amountRef.current.value = '';
            setSubmittedFlag(!submittedFlag);
            refetch();
        }
    }, [response])

    const submitExpensePost = async (e) => {
        e.preventDefault();
        setEmptySelectError("");
        if (!data.category) {
            setEmptySelectError("Select category");
            return;
        }
        if (data) {
            await handleSubmit();
        }
    }

    const handleChange = (e) => {
        setData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }))
    }

    const handleSelectChange = (uid) => {
        setData((prev) => ({
            ...prev,
            category: uid,
        }))
    }

    return (
        <div className={`flex w-full h-44 items-center text-sm hover:bg-tertiary-color-faded justify-start pl-2 border-b border-t border-grey-border-color pt-2 pb-2`}>

            <div className="flex flex-col w-1/2">
                <form onSubmit={submitExpensePost} className="w-full">

                    <div className="flex items-center h-10 w-full">
                        <SelectMenu resetFlag={submittedFlag} onClick={handleSelectChange} menuTitle="Choose category" options={categories?.data} />
                    </div>

                    <div className="flex items-center h-10 w-full">
                        <input ref={sourceRef} onChange={handleChange} id="source" name="source" type="text" className="top-0 border rounded-lg border-grey-border-color pl-2 w-full h-8 bg-secondary-color hover:border-accent-color-main focus:border-accent-color-main outline-none" placeholder={placeholder} required />
                    </div>

                    <div className="flex items-center h-10 w-full">
                        <input ref={amountRef} onChange={handleChange} id="amount" name="amount" type="text" className="top-0 border rounded-lg border-grey-border-color pl-2 w-full h-8 bg-secondary-color hover:border-accent-color-main focus:border-accent-color-main outline-none" placeholder="Amount" required />
                    </div>
                    <div className="flex items-center h-10 w-full">
                        <button type="submit" className="pl-3 pr-3 w-24 rounded-full border border-grey-border-color  hover:border-accent-color-main focus:border-accent-color-main h-8 bg-secondary-color outline-none">
                            {
                                loading ? <LoadingSpinner /> : 'Add'
                            }
                        </button>
                    </div>
                </form>
            </div>

            <div className="flex flex-col text-sm rounded-lg text-center justify-center h-20 flex-1">
                {
                    (response?.success === false || emptySelectError) && (
                        <>
                            <div className="flex justify-center">
                                <ErrorIcon dimensions={24} />
                            </div>
                            <div className="">
                                {response.message}
                                {emptySelectError}
                            </div>
                        </>
                    )
                }
            </div>
        </div>
    );
}

export default InputRow;