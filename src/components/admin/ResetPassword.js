import React, { useState, useEffect } from 'react';
import NavBar from './NavBar';
import Footer from './Footer';

function ResetPassword() {
    return(
            <div>
                <NavBar validate={true} />
                    <form>
                        <div className='row d-flex justify-content-center' >
                        <label className='changePassword'  htmlFor='changePassword'>Change Password</label>
                        </div>
                        <div className='row d-flex justify-content-center'>
                            <div className='form-group '>
                                <label htmlFor='newPassword'>New Password</label>
                                <input
                                    type='text'
                                    className='form-control reset '
                                // onChange={(e) => { handleOnChange(e, true) }}
                                    name='newPassword'
                                // value={state ? state.userId : ''}
                                />
                            </div>
                        </div>
                        <div className='row d-flex justify-content-center'>
                            <div className='form-group'>
                                <label htmlFor='confirmPassword'>Confirm Password</label>
                                <input
                                    type='text'
                                    className='form-control reset'
                                // onChange={(e) => { handleOnChange(e, true) }}
                                    name='confirmPassword'
                                // value={state ? state.userId : ''}
                                />
                            </div>
                        </div>
                        <div className='row d-flex justify-content-center'>
                            <div className='form-group'>
                                <button
                                    type='button'
                                    className='btn work_btn work_btn_blue center modal-button'
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