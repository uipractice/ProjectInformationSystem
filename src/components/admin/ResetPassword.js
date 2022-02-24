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
                    setInterval(()=>{
                        history.push("/dashboard");
                    },2000)
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
            <form>
                <div className='row d-flex justify-content-center' >
                    <label className='changePassword' htmlFor='changePassword'>Change Password</label>
                </div>
                <div className='row d-flex justify-content-center'>
                    <div className='form-group '>
                        <label htmlFor='newPassword'>New Password</label>
                        <input
                            type='password'
                            className='form-control reset '
                            onChange={(e) => { handleOnChange(e) }}
                            name='newPassword'
                            value={password ? password.newPassword : ''}
                        />
                    </div>
                </div>
                <div className='row d-flex justify-content-center'>
                    <div className='form-group'>
                        <label htmlFor='confirmPassword'>Confirm Password</label>
                        <input
                            type='password'
                            className='form-control reset'
                            onChange={(e) => { handleOnChange(e) }}
                            name='confirmPassword'
                            value={password ? password.confirmPassword : ''}
                        />
                    </div>
                </div>
                <div className='row d-flex justify-content-center'>
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
            </form>
            <Footer />
        </div>
    )
}
export default ResetPassword