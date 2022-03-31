import React from 'react'
import Modal from 'react-modal';

Modal.setAppElement('#root');

export default function DeleteRow(props) {
    return (
        <div>
            <Modal
                isOpen={props.isModalOpen}
                shouldCloseOnOverlayClick={false}
                onRequestClose={() => {
                    props.setIsModalOpen(false);
                }}
                className='modalDesign deleteModal'
            >
                <h2>Are you sure?</h2>
                <button
                    className='_modal-close'
                    onClick={() => {
                        props.setIsModalOpen(false);
                    }}
                >
                    <svg className='_modal-close-icon' viewBox='0 0 40 40'>
                        <path d='M 10,10 L 30,30 M 30,10 L 10,30' />
                    </svg>
                </button>
                <form>
                    <p>Please enter the reason to delete the record.</p>
                    <textarea
                        type='text'
                        autoFocus={true}
                        style={{ color: 'black' }}
                        onChange={(e) => props.handleInputChange(e)}
                        name='deleteReason'
                        value={props.deleteReason}
                    />
                    <br></br>
                    <span style={{ fontSize: '10px' }}>
                        Note: *Allows only alphabetics and numerics
                    </span>
                    <p className='descr'>
                        {' '}
                        Take a deep breath! <br />
                        Because if deleted once, it is gone forever.
                    </p>
                    <br></br>

                    <div className='row'>
                        <div className='col-md-6 text-right padding0'>
                            <button
                                className='form-control btn btn-primary'
                                onClick={() => {
                                    props.setIsModalOpen(false);
                                }}
                            >
                                Cancel
                            </button>
                        </div>
                        <div className='col-md-6'>
                            {props.deleteReason ? (
                                <button
                                    onClick={(e) => props.handleUpdateStatus(e)}
                                    className='form-control btn btn-primary delete-btn'
                                >
                                    Delete
                                </button>
                            ) : (
                                <button
                                    className='form-control btn btn-primary delete-btn'
                                    disabled
                                >
                                    Delete
                                </button>
                            )}
                        </div>
                    </div>
                </form>
            </Modal>
        </div>
    )
}
