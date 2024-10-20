import { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";
import LoadingSpinner from "../../UI/Widgets/LoadingSpinner";
import LoadingBar from "../../UI/Widgets/LoadingBar";

function PersonalFinance() {
    
    const { currentUser } = useContext(AuthContext);

    return (
        <div className="pt-5">

        </div>
    );
}

export default PersonalFinance;