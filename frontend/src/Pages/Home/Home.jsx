import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

function PersonalFinance() {
    
    const { currentUser } = useContext(AuthContext);

    return (
        <div className="">
            Home
        </div>
    );
}

export default PersonalFinance;