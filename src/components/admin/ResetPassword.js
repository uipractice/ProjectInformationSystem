import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import axios from 'axios';
import NavBar from './NavBar';
import Footer from './Footer';
import { getApiUrl } from '../utils/helper';
import { getUser } from "../utils/userDetails";
import { toast } from 'react-toastify';
import showPassword from '../../assets/images/show-password.svg'
import hidePassword from '../../assets/images/hide-password.svg'


function ResetPassword() {
    const [password, setNewPassword] = useState({ 'newPassword': '', 'confirmPassword': null })
    const [passwordImage, setPasswordImage] = useState(showPassword)
    const [confirmPasswordImage, setConfirmPasswordImage] = useState(showPassword)

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

    function handlePasswordVisibility() {
        var x = document.getElementById("password");
        if (x.type === "password") {
            x.type = "text";
            setPasswordImage(hidePassword)
        } else {
            x.type = "password";
            setPasswordImage(showPassword)
        }
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
    function handlePasswordVisibility(type) {
        if (type == "password") {
            var x = document.getElementById("password");
            if (x.type === "password") {
                x.type = "text";
                setPasswordImage(hidePassword)
            } else {
                x.type = "password";
                setPasswordImage(showPassword)
            }
        }
        if (type == "confirmPassword") {
            var x = document.getElementById("confirmPassword");
            if (x.type === "password") {
                x.type = "text";
                setConfirmPasswordImage(hidePassword)
            } else {
                x.type = "password";
                setConfirmPasswordImage(showPassword)
            }
        }

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
                        <div className='form-group form-password'>

                            <label htmlFor='newPassword'>New Password</label>
                            <input
                                type='password'
                                className='form-control reset '
                                name='newPassword'
                                id='password'
                                onChange={(e) => { handleOnChange(e) }}
                            />
                            <img src={passwordImage} onClick={() => { handlePasswordVisibility("password") }} />

                        </div>

                    </div>
                    <div className='row d-flex justify-content-center confirm-password'>
                        <div className='form-group form-password'>
                            <label htmlFor='newPassword'>Confirm Password</label>
                            <input
                                type='password'
                                className='form-control reset '
                                name='confirmPassword'
                                id='confirmPassword'
                                onChange={(e) => { handleOnChange(e) }}
                            />
                            <img src={confirmPasswordImage} onClick={() => { handlePasswordVisibility("confirmPassword") }} />
                        </div>
                    </div>
                    <div className='row d-flex justify-content-center change-password'>
                        <div className='form-group '>
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