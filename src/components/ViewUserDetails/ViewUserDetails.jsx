import { useContext } from "react";
import { context } from "../../App";
import './ViewUserDetails.css'
import { useNavigate } from "react-router-dom";
const ViewDetails = () => {
    const backBtn = '< Back'
    const contextData = useContext(context)
    const user = contextData?.selectedUser
    const navigation = useNavigate()

    /**
     * redirect user on listing page
     */
    const userListPage = () => {
        navigation('/')
    }
    return (
        <>
            <button onClick={userListPage} className="backButton"> {backBtn}</button>
            <div className="showUserDetail">
                <div>
                    <h1>First Name: <span>{user?.firstName}</span></h1>
                    <h1>Last Name: <span>{user?.lastName}</span></h1>
                    <h1>E-mail: <span>{user?.email}</span></h1>
                    <h1>Role: <span>{user?.role}</span></h1>
                    <h1>Mobile Number: <span>{user?.mobileNumber}</span></h1>
                </div>
            </div>
        </>

    )
}

export default ViewDetails;