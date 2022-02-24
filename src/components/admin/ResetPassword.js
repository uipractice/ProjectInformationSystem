import React, { useState, useEffect } from 'react';
import { Redirect, useHistory } from 'react-router-dom';

import NavBar from './NavBar';
import Footer from './Footer';

function ResetPassword() {

    const history = useHistory();
    const handleDashboard = () => {
        return  history.push('/dashboard',);
      }
    return(
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
                                        />
                                </div>
                            </div>
                            <div className='row d-flex justify-content-center change-password'>
                                <div className='form-group'>
                                    <button
                                        type='button'
                                        className='btn work_btn work_btn_blue center modal-button'
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