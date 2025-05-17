import { useContext, useEffect, useState } from 'react'
import InputField from '../inputField'
import axios from 'axios'
import './userAddDetails.css'
import { useNavigate } from 'react-router-dom'
import { context } from '../../App'
// import
const UserDetails = () => {
    const navigate = useNavigate()
    const [userData, setUserData] = useState({ firstName: '', lastName: '', email: '', mobileNumber: '', role: '' })
    const [userDetails, setUserDetails] = useState([])
    const [editUserId, setEditUserId] = useState(null)
    const userContext = useContext(context)

    useEffect(() => {
        fetchAllUsers()
    }, [])

    /**
     * fetch all users from backend
     */
    const fetchAllUsers = async () => {
        setEditUserId(null)
        try {
            const result = await axios.get('http://localhost:3000/api/user/fetch-all-users')
            if (result.status == 200) {
                setUserDetails(result.data.data);
            } else {
                alert(result.data.message)
            }
        } catch (err) {
            console.log(err)
        }
    }

    /**
     * 
     * @param {*} name get name of specific intput 
     * @param {*} value get input value from child component
     */
    const getInputValue = (name, value) => {
        setUserData({ ...userData, [name]: value })
    }

    /**
     * 
     * @returns while add new user check if any value not empty and push data into backend and get response 
     */
    const creatUser = async () => {
        if (userData.firstName.length == 0 && userData.lastName.length == 0 && userData.email.length == 0 && userData.mobileNumber.length == 0 && userData.role.length == 0) {
            alert('All fields are required')
            return
        } else if (userData.firstName.length == 0) {
            alert('First name field is required')
            return
        } else if (userData.lastName.length == 0) {
            alert('Last name field is required')
            return
        } else if (userData.email.length == 0) {
            alert('Email field is required')
            return
        } else if (userData.mobileNumber.length == 0) {
            alert('Mobile number field id required')
            return
        } else if (userData.role.length == 0) {
            alert('Role field is required')
            return
        }

        try {
            const result = await axios.post('http://localhost:3000/api/user/create-user', userData)
            if (result.status !== 200) {
                alert(result.data.message)
            } else {
                alert(result.data.message)
                setUserDetails((prev) => [...prev, result.data.user])
                setUserData({ firstName: '', lastName: '', email: '', mobileNumber: '', role: '' })
            }
        } catch (err) {
            console.log(err)
        }

    }

    /**
     * 
     * @param {*} user get user details for delete into backned
     * @param {*} index get index value of user from array to instant remove from array after get 200 status from backend
     */
    const deleteUser = async (user, id) => {
        try {
            const result = await axios.get(`http://localhost:3000/api/user/delete-user/${id}`)
            if (result.status == 200) {
                alert(result.data.message)
                const updatedUserDetails = userDetails.filter((val) => val._id != id)
                setUserDetails(updatedUserDetails)

            } else {
                alert(result.data.message)
            }
        } catch (err) {
            console.log(err)
        }
    }

    /**
     * 
     * @param {*} user get user details for edit and make user data editable
     * @param {*} id get id value for update that user
     */
    const editUserDetails = (user, id) => {
        setEditUserId(id)
    }

    /**
     * 
     * @param {*} user get edited user data 
     * @param {*} id get id to update specific user details
     */
    const updateUserDetails = async (user, id) => {
        try {
            const result = await axios.post(`http://localhost:3000/api/user/update-user`, user)
            if (result.status == 200) {
                const editedUserDetails = userDetails.map((userData) => {
                    if (user._id == id) {
                        return { ...userData, user }
                    }
                    return editedUserDetails
                })
                setUserDetails(editedUserDetails)
                setEditUserId(null)
            }
        } catch (err) {
            console.log(err)
        }

    }

    /**
     * 
     * @param {*} name get input name 
     * @param {*} value get edited input value of specific data
     * @param {*} id  get  user id for edit specific user details
     */
    const getEditedUsersDetiails = (name, value, id) => {
        const usersDetail = userDetails.map((user) => {
            if (user._id === id) {
                return { ...user, [name]: value }
            }
            return user
        })
        setUserDetails(usersDetail)
    }

    /**
     * 
     * @param {*} user get user data and pass into userContext and navigate on view page
     */
    const viewUser = (user) => {
        userContext?.setSelectedUser(user)
        navigate('/view')
    }
    return (
        <>
            <div className='container'>
                <div className='form'>
                    <div className='inputFields'>
                        <InputField className={'inputField'} type={'text'} name={'firstName'} placeholder={'First Name'} getInputValue={getInputValue} value={userData.firstName} />
                        <InputField className={'inputField'} type={'text'} name={'lastName'} placeholder={'Last Name'} getInputValue={getInputValue} value={userData.lastName} />
                        <InputField className={'inputField'} type={'email'} name={'email'} placeholder={'E-mail'} getInputValue={getInputValue} value={userData.email} />
                        <InputField className={'inputField'} type={'text'} name={'role'} placeholder={'Role'} getInputValue={getInputValue} value={userData.role} />
                        <InputField className={'inputField'} type={'number'} name={'mobileNumber'} placeholder={'Mobile Number'} getInputValue={getInputValue} value={userData.mobileNumber} />
                    </div>
                </div>
                <div className='btnClass'>
                    <button className='btn' onClick={creatUser}> Add User</button>
                </div>
                <div className='showData'>
                    <table className='tableData' border="1">
                        <thead>
                            <tr>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Mobile Number</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {userDetails.length > 0 ? userDetails.map((user) => {
                                const { _id, firstName, lastName, email, mobileNumber, role } = user
                                return (
                                    <tr key={_id}>
                                        {editUserId == _id ?
                                            <>
                                                <td><InputField className={'editedInputField'} type={'text'} name={'firstName'} placeholder={'First Name'} getInputValue={(name, value) => getEditedUsersDetiails(name, value, _id)} value={firstName} /></td>
                                                <td><InputField className={'editedInputField'} type={'text'} name={'lastName'} placeholder={'Last Name'} getInputValue={(name, value) => getEditedUsersDetiails(name, value, _id)} value={lastName} /></td>
                                                <td><InputField className={'editedInputField'} type={'email'} name={'email'} placeholder={'E-mail'} getInputValue={(name, value) => getEditedUsersDetiails(name, value, _id)} value={email} /></td>
                                                <td><InputField className={'editedInputField'} type={'text'} name={'role'} placeholder={'Role'} getInputValue={(name, value) => getEditedUsersDetiails(name, value, _id)} value={role} /></td>
                                                <td><InputField className={'editedInputField'} type={'number'} name={'mobileNumber'} placeholder={'Mobile Number'} getInputValue={(name, value) => getEditedUsersDetiails(name, value, _id)} value={mobileNumber} /></td>
                                                <td style={{ display: 'flex', justifyContent: 'center' }}><button onClick={fetchAllUsers}>Cancel</button><button onClick={() => updateUserDetails(user, _id)}>Update</button></td>
                                            </>
                                            :
                                            <>
                                                <td>{firstName}</td>
                                                <td>{lastName}</td>
                                                <td>{email}</td>
                                                <td>{role}</td>
                                                <td>{mobileNumber}</td>
                                                <td style={{ display: 'flex', justifyContent: 'center' }}><button disabled={editUserId != null} onClick={() => editUserDetails(user, _id)}>Edit</button><button disabled={editUserId != null} onClick={() => deleteUser(user, _id)}>Delete</button> <button disabled={editUserId != null} onClick={() => viewUser(user)}>View</button></td>
                                            </>
                                        }
                                    </tr>
                                )
                            })
                                :
                                <tr>
                                    <td colSpan="6" style={{ textAlign: 'center' }}>
                                        User Not Exist
                                    </td>
                                </tr>
                            }

                        </tbody>
                    </table>

                </div>
            </div>

        </>
    )
}

export default UserDetails