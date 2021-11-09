import React, {useState,useEffect} from 'react';
import axios from 'axios';
import { Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './sample.css';
import { getApiUrl } from '../../utils/helper';

toast.configure();

// default fotm data
const defaultFormData = {
  userName: '',
  emailId: '',
  role: '',
  team: '',
  status: '',
  dateCreated: '',
};

const AddUserModal = ({ isOpen, closeModal, rowData, isEdit = false,updateToolStatus })  => {
    const [state, setState] = useState({
      ...defaultFormData,
      autoFill: false,
    });
    function handleOnChange(e, email) {
      const value = e.target.value.replace(/[^a-zA-Z ]/g, '');
      if (email) {
        handleEmailChange(e, email);
      } else if (value.match(/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+([\s]+)*$/)) {
        setState({
          ...state,
          [e.target.name]: e.target.value,
          autoFill: false,
        });
      } else {
        setState({
          ...state,
          [e.target.name]: '',
          autoFill: false,
        });
      }
    }
   function handleEmailChange(e, email) {
    if (e.key === '@' && !state.autoFill && email) {
      setState({
        ...state,
        [e.target.name]: e.target.value + '@evoketechnologies.com',
        autoFill: true,
      });
    } else if (!state.autoFill) {
      setState({
        ...state,
        [e.target.name]: e.target.value,
        autoFill: false,
      });
    } else {
      setState({
        ...state,
        autoFill: false,
      });
    }
  }
  const mailformat =
  /^([a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@evoketechnologies.com(\s*,\s*|\s*$))*$/;
  
  function ValidateEmail(inputText) {
    if (inputText.match(mailformat)) {
      return true;
    } else {
      toast.error('Invalid email ID !', {
        autoClose: 1800,
      });
      return false;
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (ValidateEmail(state.emailId)) {
      delete state.autoFill;
      console.log(state,'state');
          axios
        .post(getApiUrl(`users/addUser`), state)
        .then((res) => {
          if (res && res.data.status === 'success') {
            // closeModal();
            toast.success('Data Saved Successfully !', {
              autoClose: 2000,
            });
            setTimeout(() => {
              window.location.reload();
            }, 2000);
          } else {
            toast.error('Data Saved FAILED !', {
              autoClose: 2000,
            });
            console.log(state);
          }
        })
        .then(() => {
          window.close();
        })

        .catch((err) => console.log(err.response));
    }
  }
 
  return (
    <Modal
      centered
      size='lg'
      style={{ borderRadius: '0 !important' }}
      show={isOpen}
      backdrop='static'
      onHide={closeModal}
      className='software-modal'
    >
      <Modal.Header closeButton className=''>
        <h3>Add User</h3>
      </Modal.Header>
      <Modal.Body>
        <form>
          <div className='row'>
            <div className='form-group col-md-4'>
              <label htmlFor='softwareName'>User Name *</label>
              <input
                type='text'
                className='form-control'
                onChange={handleOnChange}
                name='userName'
                value={state?state.userName: ''}
              />
            </div>
            <div className='form-group col-md-4'>
              <label htmlFor='email'>Email Id * </label>
              <span className='email-help-text'>
                {' '}
                (Add multiple emails with (,) separation)
              </span>

              <textarea
                type='textarea'
                className='form-control'
                onChange={(e) => handleOnChange(e, true)}
                onKeyDown={(e) => handleOnChange(e, true)}
                disabled={isEdit}
                name='emailId'
                value={
                  state.emailId &&
                  state.emailId.match(mailformat) &&
                  state.emailId.toLowerCase()
                }
                rows='3'
                cols='50'
              />
            </div>
            <div className='form-group col-md-4'>
              <label htmlFor='team'>Team *</label>
              <input
                type='text'
                className='form-control'
                onChange={handleOnChange}
                name='team'
                disabled={isEdit}
                value={state ? state.team : ''}
              />
            </div>
          </div>
          <div className='row'>
          <div className='form-group col-md-4'>
              <label htmlFor='owner'>Status *</label>
              <input
                type='text'
                className='form-control'
                onChange={handleOnChange}
                name='status'
                disabled={isEdit}
                value={state ? state.status : ''}
              />
            </div>
            <div className='form-group col-md-4'>
              <label htmlFor='owner'>Date Created *</label>
              <input
                type='text'
                className='form-control'
              //  onChange={handleOnChange}
                name='owner'
                disabled={isEdit}
               // value={state?.owner}
              />
            </div>
            <div className='form-group col-md-4'>
              <label htmlFor='owner'>Contact Number *</label>
              <input
                type='number'
                className='form-control'
                onChange={handleOnChange}
                name='contactNumber'
                disabled={isEdit}
                value={state ? state.contactNumber: ''}
              />
            </div>
            
          </div>

          <div className='row'>
          <div className='form-group col-md-4'>
              <label htmlFor='owner'>Role *</label>
              <input
                type='text'
                className='form-control'
              //  onChange={handleOnChange}
                name='owner'
                disabled={isEdit}
               // value={state?.owner}
              />
            </div>
            </div>
          <div className='form-group row share '>
            <div className='col-md-12 text-center'>
              <button
                className='form-control btn btn-primary'
               // onClick={handleReset}
              >
                Reset
              </button>
              <button
                className='form-control btn btn-primary share-btn'
                onClick={handleSubmit}
                // disabled={
                //   Object.keys(state).some((key) =>
                //     nonMandatoryFields.includes(key) ? false : state[key] === ''
                //   ) ||
                //   Object.keys(billingDetails).some((key) =>
                //     nonMandatoryFields.includes(key)
                //       ? false
                //       : billingDetails[key] === ''
                //   )
                // }
              >
                {isEdit ? 'Renew' : 'Save'}
              </button>
            </div>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
}
export default AddUserModal;
