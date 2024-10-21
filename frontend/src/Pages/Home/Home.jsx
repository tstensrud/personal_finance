import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import LoadingSpinner from "../../ui/widgets/LoadingSpinner";
import LoadingBar from "../../ui/widgets/LoadingBar";

function PersonalFinance() {
    
    const { currentUser } = useContext(AuthContext);

    return (
        <div className="pt-5">

        </div>
    );
}

export default PersonalFinance;