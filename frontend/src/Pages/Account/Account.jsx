import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";

import { GlobalContext } from "../../context/GlobalContext";
import useFetch from "../../hooks/useFetch";

import ChangePassword from "./ChangePassword";
import Currency from "./Currency";

function Account() {
    const { currentUser} = useContext(AuthContext);

    const { data, loading, error, refetch } = useFetch(`/account/get/${currentUser.uid}/`);

    return (
        <div className="flex flex-col w-full">

            <div className="flex flex-col w-full sm:w-10/12">
                <div className="flex flex-col sm:flex-row">
                    <div className="w-52 sm:border-r border-grey-border-color">
                        Account info
                    </div>
                    <div className="flex flex-col flex-1 sm:pl-10 pb-2 pt-2">
                        
                        <div className="flex">
                            <div className="w-36 text-light-grey">Name:</div>
                            <div>{currentUser.displayName}</div>
                        </div>

                        <div className="flex">
                            <div className="w-36 text-light-grey">Email:</div>
                            <div className="flex-1 flex justify-end sm:justify-start">{currentUser.email}</div>
                        </div>

                        <div className="flex">
                            <div className="w-36 text-light-grey">Last login:</div>
                            <div className="flex-1 flex justify-end sm:justify-start">12.12.12</div>
                        </div>

                        <div className="flex">
                            <div className="sm:w-36 w-fit text-light-grey">Member since:</div>
                            <div className="flex-1 flex justify-end sm:justify-start">12.12.12</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-col w-full sm:w-10/12 mt-2">
                <div className="flex sm:flex-row flex-col">
                    <div className="w-52 sm:border-r border-grey-border-color">
                        Settings
                    </div>
                    <div className="flex flex-col flex-1 sm:pl-10 pb-2 pt-2">
                        
                        <div className="flex">
                            <div className="w-36 text-light-grey">Currency:</div>
                            <div className="flex-1 flex justify-end sm:justify-start">
                                <Currency refetch={refetch} currentUser={currentUser} currentCurrency={data?.data?.user_data?.currency} />
                            </div>
                        </div>

                        <div className="flex">
                            <div className="w-36 text-light-grey">Timezone</div>
                            <div className="flex-1 flex justify-end sm:justify-start">+01 GMT</div>
                        </div>

                    </div>
                </div>
            </div>

            <div className="flex flex-col w-full sm:w-10/12 mt-2">
                <div className="flex flex-col sm:flex-row">
                    <div className="w-52 sm:border-r border-grey-border-color">
                        Change password
                    </div>
                    <div className="flex flex-col flex-1 sm:pl-10 pb-2 pt-2">
                        <ChangePassword />
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Account;
