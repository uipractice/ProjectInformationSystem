import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import axios from 'axios';
import NavBar from './NavBar';
import Footer from './Footer';
import { getApiUrl } from '../utils/helper';
import { getUser } from "../utils/userDetails";
import { toast } from 'react-toastify';


function ResetPassword() {
    const [password, setNewPassword] = useState({ 'newPassword': '', 'confirmPassword': null })
    const history = useHistory();
    const handleDashboard = () => {
        return history.push('/dashboard',);
    }
    function handleOnChange(e) {

        setNewPassword({
            ...password,
            [e.target.name]: e.target.value,
        });
    }

    function handleSubmit() {

        let userData = JSON.parse(getUser())
        userData.password = password.confirmPassword

        axios
            .put(getApiUrl(`users/updateUser/${userData._id}`), userData)
            .then((res) => {
                console.log('testinside-outside');
                if (res && res.data.status === 'success') {
                    toast.success('Password Updated Successfully !', {
                        autoClose: 2000,
                    });
                    setInterval(() => {
                        history.push("/dashboard");
                    }, 2000)
                } else {
                    toast.error('Password Update FAILED !', {
                        autoClose: 2000,
                    });
                }
            })
            .catch((err) => console.log('error', err.response));
    }

    return (
        <div>
            <NavBar validate={true} />
            <div className='reset-box'>
                <div className='reset-header'>
                    <div className='change-pwd-header'>
                        <label>Change Password</label>
                    </div>
                    <svg onClick={handleDashboard} className='pointer _modal-close-icon cancel-btn' viewBox='0 0 40 40'>
                        <path d='M 10,10 L 30,30 M 30,10 L 10,30' />
                    </svg>
                    {/* </button> */}
                    <div className='row d-flex justify-content-center new-password'>
                        <div className='form-group '>
                            <label htmlFor='newPassword'>New Password</label>
                            <input
                                type='password'
                                className='form-control reset '
                                name='newPassword'
                                onChange={(e) => { handleOnChange(e) }}
                            />
                        </div>
                    </div>
                    <div className='row d-flex justify-content-center confirm-password'>
                        <div className='form-group '>
                            <label htmlFor='newPassword'>Confirm Password</label>
                            <input
                                type='password'
                                className='form-control reset '
                                name='confirmPassword'
                                onChange={(e) => { handleOnChange(e) }}
                            />
                        </div>
                    </div>
                    <div className='row d-flex justify-content-center change-password'>
                        <div className='form-group'>
                            <button
                                type='button'
                                className='btn work_btn work_btn_blue center modal-button'
                                disabled={password.newPassword == password.confirmPassword ? false : true}
                                onClick={() => { handleSubmit() }}
                            >
                                CHANGE PASSWORD
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}
export default ResetPassword