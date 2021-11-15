import React, {useState,useEffect} from 'react';
import axios from 'axios';
import { Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './sample.css';
import { getApiUrl } from '../../utils/helper';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';

toast.configure();

// default fotm data
const defaultFormData = {
  userName: '',
  emailId: '',
  role: '',
  team: '',
  status: '',
 // dateCreated: '',
  contactNumber: '',
  password: '123',
};

const AddUserModal = ({ isOpen, closeModal, rowData, isEdit = false,updateToolStatus })  => {
    const [state, setState] = useState({
      ...defaultFormData,
      autoFill: false,
    });
    function handleOnChange(e, email=false) {
      console.log('check', e);
      const value = e.target.value.replace(/[^a-zA-Z ]/g, '');
      if (email) {
        handleEmailChange(e, email);
      } else if (value.match(/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+([\s]+)*$/)) {
        setState({
          ...state,
          [e.target.name]: e.target.value,
          autoFill: false,
        });
      } else if (e.target.name === 'date' || e.target.name === 'contactNumber') {
        let stateValue = e.target.value;
        if(e.target.name === 'contactNumber') {
          stateValue = 
              e.target.value.match(/^(\+\d{1,2}\s?)?1?\-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/) 
              ? e.target.value
              : '';
        }
        setState({
          ...state,
          [e.target.name]: e.target.value,
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

  function handleOnDropdownChange(stateName, value) {
    setState({
      ...state,
      [stateName]: value ? value.label : '',
    });
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
 const handleReset = () => {
   setState({
     ...state,
     ...defaultFormData
   })
 }
  return (
    <Modal
      centered
      size='lg'
      style={{ borderRadius: '0 !important' }}
      show={isOpen}
      backdrop='static'
      onHide={() => closeModal()}
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
              <label htmlFor='password'>Password *</label>
              <input
                type='password'
                className='form-control'
                onChange={handleOnChange}
                name='password'
                value={state?state.password: ''}
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
          </div>
          <div className='row'>
          <div className='form-group col-md-4'>
          <label>Team * </label>
          <Autocomplete
            options={[
              { label: 'BI Team', value: 1 },
              { label: 'Big Data Team', value: 2 },
              { label: 'Block Chain Team', value: 3 },
              { label: 'BPM Team', value: 4 },
              { label: 'BPO Team', value: 5 },
              { label: 'Data Science Team', value: 6 },
              { label: 'Delivery Team', value: 7 },
              { label: 'Java Team', value: 8 },
              { label: 'Microsoft Team', value: 9 },
              { label: 'Mobility Team', value: 10 },
              { label: 'Open Source Team', value: 11 },
              { label: 'Oracle Team', value: 12 },
              { label: 'Pega Team', value: 13 },
              { label: 'QA Team', value: 14 },
              { label: 'RPA Team', value: 15 },
              { label: 'Sales Force Team', value: 16 },
              { label: 'Service Now Team', value: 17 },
              { label: 'Support Team', value: 18 },
              { label: 'UI Team', value: 19 },
              { label: 'Other', value: 20 },
            ]}
            value={state ? state.team.label : ''}
            name="team"
            getOptionLabel={(option) => option.label}
            onChange={(event, value) => handleOnDropdownChange('team', value)}
            renderInput={(params) => (
              <TextField {...params} variant='outlined' name="team"/>
            )}
          />
        </div>
            <div className='form-group col-md-4'>
          <label>Status * </label>
          <Autocomplete
            options={[
              { label: 'Active', value: 1 },
              { label: 'InActive', value: 2 },
            ]}
            name='status'
            value={state ? state.status.label : ''}
            getOptionLabel={(option) => option.label}
            onChange={(event, value) => handleOnDropdownChange('status', value)}
            renderInput={(params) => (
              <TextField {...params} variant='outlined' name="status"/>
            )}
          />
        </div>
            <div className='form-group col-md-4'>
              <label htmlFor='contactNumber'>Contact Number *</label>
              <input
                type='text'
                className='form-control'
                onChange={(e) => handleOnChange(e)}
                name='contactNumber'
                disabled={isEdit}
                value={state ? state.contactNumber: ''}
              />
            </div>
            
          </div>

          <div className='row'>
            <div className='form-group col-md-4'>
          <label>Role * </label>
          <Autocomplete
            options={[
              { label: 'Admin', value: 1 },
              { label: 'SuperAdmin', value: 2 },
              { label: 'Guest', value: 3 },
            ]}
            value={state ? state.role.label : ''}
            name="role"
            getOptionLabel={(option) => option.label}
            onChange={(event, value) => handleOnDropdownChange('role', value)}
            renderInput={(params) => (
              <TextField {...params} variant='outlined' name="role"/>
            )}
          />
        </div>
            </div>
          <div className='form-group row share '>
            <div className='col-md-12 text-center'>
              <button
                className='form-control btn btn-primary'
                onClick={() => handleReset()}
              >
                Reset
              </button>
              <button
                className='form-control btn btn-primary share-btn'
                onClick={() => handleSubmit()}
                disabled={
                  Object.keys(state).some((key) =>
                  state[key] === ''
                  )
                }
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
