import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToggleButtonGroup, ToggleButton, Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './sample.css';
import { getApiUrl } from '../../utils/helper';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import moment from 'moment';
import showPassword from '../../../assets/images/show-password.svg'
import hidePassword from '../../../assets/images/hide-password.svg'


toast.configure();

const AddUserModal = ({ isOpen, closeModal, updatedData = false, isEdit = false, updateToolStatus }) => {

  const defaultFormData1 = {
    userId: updatedData ? updatedData.values.userId : '',
    password: updatedData ? updatedData.values.password : '123',
    userName: updatedData ? updatedData.values.userName : '',
    contactNumber: updatedData ? updatedData.values.contactNumber : '',
    practice: updatedData ? updatedData.values.practice : '',
    practiceName: updatedData ? updatedData.values.practiceName : null,
    pset: updatedData ? updatedData.values.pset : [],
    status: updatedData ? updatedData.values.status : '',
    role: updatedData ? updatedData.values.role : '',
    createdAt: updatedData ? updatedData.values.createdAt : moment().format('YYYY-MM-DD'),
    updatedAt: moment().format('YYYY-MM-DD'),
  };

  const [passwordImage, setPasswordImage] = useState(showPassword)

  const [state, setState] = useState({
    ...defaultFormData1,
    autoFill: false,
  });
  const [data, setData] = useState(updatedData.values)

  function handleOnChange(e, email = false) {
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

  function handlePassword(e) {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  }

  function handlePset(e) {
    let psett = [...state.pset];
    if (e.target.checked == false) {
      if (psett.indexOf(e.target.name) > 0) {
        psett.splice(psett.indexOf(e.target.name), 1)
      }

    }
    else {
      if (psett.indexOf(e.target.name) < 0) {
        psett.push(e.target.name)
      }
    }
    setState({
      ...state,
      pset: psett,
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


  function handleEmailChange(e, email) {
    let lastChar = e.target.value.charAt(e.target.value.length - 1)
    if (lastChar === '@' && !state.autoFill && email) {
      setState({
        ...state,
        [e.target.name]: e.target.value + 'evoketechnologies.com',
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
  function handleUpdate() {
    delete state.autoFill;
    axios
      .put(getApiUrl(`users/updateUser/${updatedData.original._id}`), state)
      .then((res) => {
        console.log('testinside-outside');
        if (res && res.data.status === 'success') {
          toast.success('Data Updated Successfully !', {
            autoClose: 2000,
            onClose: updateToolStatus()
          });
        } else {
          toast.error('Data Update FAILED !', {
            autoClose: 2000,
          });
        }
      })
      .then(() => {
        window.close();
      })

      .catch((err) => console.log('error', err.response));

  }
  function handleSubmit(e) {
    e.preventDefault();
    if (data) {
      return handleUpdate();
    }
    if (state.contactNumber.length < 10) {
      toast.error('Please Enter Valid Phone Number !', {
        autoClose: 2000,
      });
      return;
    }
    if (ValidateEmail(state.userId)) {
      delete state.autoFill;
      console.log(state, 'state');
      axios
        .post(getApiUrl(`users/addUser`), state)
        .then((res) => {
          if (res && res.data.status === 'success') {
            // closeModal();
            toast.success('Data Saved Successfully !', {
              autoClose: 2000,
              onClose: updateToolStatus()
            });
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
  const handleReset = (e) => {
    e.preventDefault();
    setState({
      ...state,
      userId: '',
      password: '',
      userName: '',
      contactNumber: '',
      practice: '',
      practiceName: '',
      pset: [],
      status: '',
      role: '',
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
        <h3>{!updatedData ? 'Add User' : 'Update User Details Screen'}</h3>
      </Modal.Header>
      <Modal.Body>
        <form>
          <div className='row'>
            <div className='form-group col-md-6'>
              <label htmlFor='softwareType'>Role *</label>
              <ToggleButtonGroup
                type='radio'
                name='roleType'
                value={state?.role}
                disabled={isEdit}
                onChange={(val) => setState({ ...state, role: val })}
              >
                <ToggleButton
                  disabled={isEdit}
                  checked={state?.role === 'superAdmin'}
                  value={'superAdmin'}
                  className='superAdmin'
                >
                  Super Admin
                </ToggleButton>
                <ToggleButton
                  disabled={isEdit}
                  checked={state?.role === 'Admin'}
                  value={'Admin'}
                  className='Admin'
                >
                  Admin
                </ToggleButton>
                <ToggleButton
                  disabled={isEdit}
                  checked={state?.role === 'Guest'}
                  value={'Guest'}
                  className='Guest'
                >
                  Guest
                </ToggleButton>
              </ToggleButtonGroup>
            </div>
            <div className='form-group col-md-6'>
              <label htmlFor='softwareName'>Name</label>
              <input
                type='text'
                className='form-control'
                onChange={handleOnChange}
                name='userName'
                value={state ? state.userName : ''}
              />
            </div>
          </div>
          <div className='row'>
            <div className='form-group col-md-6'>
              <label htmlFor='email'>User ID/Email Address</label>
              <input
                type='text'
                className='form-control'
                onChange={(e) => { handleOnChange(e, true) }}
                name='userId'
                value={state ? state.userId : ''}
              />
            </div>
            <div className='form-group col-md-3'>
              <label htmlFor='conatactNumber'>Contact No.</label>
              <input
                type='text'
                className='form-control'
                onChange={(e) => handleOnChange(e)}
                name='contactNumber'
                disabled={isEdit}
                value={state ? state.contactNumber : ''}
              />
            </div>
            <div className='form-group col-md-3'>
              <label>Status * </label>
              <Autocomplete
                options={[
                  { label: 'Active', value: 1 },
                  { label: 'InActive', value: 2 },
                ]}
                name='status'
                value={state ? state.status : ''}
                getOptionLabel={(option) => state.status && !option.label ? option : option.label}
                getOptionSelected={(option, value) => option.value === value.value}
                onChange={(event, value) => handleOnDropdownChange('status', value)}
                renderInput={(params) => (
                  <TextField {...params} variant='outlined' name="status" />
                )}
              />
            </div>
          </div>
          <div className='row'>

            <div className='form-group form-password col-md-4'>
              <label htmlFor='password'>Password *</label>
              <input
                type='password'
                className='form-control'
                onChange={handlePassword}
                name='password'
                id='password'
                value={state ? state.password : ''}
              />
              <img src={passwordImage} onClick={() => { handlePasswordVisibility() }} />

            </div>
            <div className='form-group col-md-4'>
              <label htmlFor='email'>Practice</label>
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
                value={state.practice}
                name="practice"
                getOptionLabel={(option) => state.practice && !option.label ? option : option.label}
                getOptionSelected={(option, value) => option.value === value.value}
                onChange={(event, value) => handleOnDropdownChange('practice', value)}
                renderInput={(params) =>
                  <TextField {...params} variant='outlined' name="practice" />
                }
              />
            </div>
            <div className='form-group col-md-4'>
              <label htmlFor='practiceName'>Practice Name</label>
              <input
                type='text'
                className='form-control'
                onChange={handleOnChange}
                name='practiceName'
                disabled={state.practice == "Other" ? false : true}
                value={state ? state.practiceName : ''}
              />
            </div>
          </div>

          <div className='row form-group dashed-box'>
            <label htmlFor='actionsForUser'>Select  Actions user can perform </label>
            <div className='row form-group col-md-12 '>
              <div className='form-group col-md-3'>
                <input
                  className='checkBox'
                  name='shareProjectForm'
                  type="checkbox"
                  disabled={state.role == "Guest" || state.role == '' ? true : false}
                  defaultChecked={updatedData ? updatedData.values.pset.includes("shareProjectForm") ? true : false : false}
                  onClick={(e) => { handlePset(e) }}
                />
                <label>Share Project Form</label>
              </div>

              <div className='form-group col-md-3'>
                <input
                  className='checkBox'
                  name='sendRemainder'
                  type="checkbox"
                  disabled={state.role == "Guest" || state.role == '' ? true : false}
                  defaultChecked={updatedData ? updatedData.values.pset.includes("sendRemainder") ? true : false : false}
                  onClick={(e) => { handlePset(e) }}


                /> <label>Send Remainder</label>
              </div>
              <div className='form-group col-md-3'>
                <input
                  className='checkBox'
                  name='fillForm'
                  type="checkbox"
                  disabled={state.role == "Guest" ? true : false}
                  defaultChecked={updatedData ? updatedData.values.pset.includes("fillForm") ? true : false : false}
                  onClick={(e) => { handlePset(e) }}


                /> <label>Fill Form</label>
              </div>
              <div className='form-group col-md-3'>
                <input
                  className='checkBox'
                  name='approve'
                  type="checkbox"
                  disabled={state.role == "Guest" ? true : false}
                  defaultChecked={updatedData ? updatedData.values.pset.includes("approve") ? true : false : false}
                  onClick={(e) => { handlePset(e) }}


                /> <label>Approve</label>
              </div>

            </div>
            <div className='row form-group col-md-12 '>
              <div className='form-group col-md-3'>
                <input
                  className='checkBox'
                  name='reshareProjectForm'
                  type="checkbox"
                  disabled={state.role == "Guest" ? true : false}
                  defaultChecked={updatedData ? updatedData.values.pset.includes("reshareProjectForm") ? true : false : false}
                  defaultChecked={false}
                  onClick={(e) => { handlePset(e) }}


                /> <label>ReShare Project Form</label>
              </div>
              <div className='form-group col-md-3'>
                <input
                  className='checkBox'
                  name='editForm'
                  type="checkbox"
                  disabled={state.role == "Guest" ? true : false}
                  defaultChecked={updatedData ? updatedData.values.pset.includes("editForm") ? true : false : false}
                  onClick={(e) => { handlePset(e) }}


                /> <label>Edit Form</label>
              </div>
              <div className='form-group col-md-3'>
                <input
                  className='checkBox'
                  name='deleteForm'
                  type="checkbox"
                  disabled={state.role == "Guest" ? true : false}
                  defaultChecked={updatedData ? updatedData.values.pset.includes("deleteForm") ? true : false : false}
                  onClick={(e) => { handlePset(e) }}


                /><label>Delete Form</label>
              </div>
            </div>
          </div>

          <div className='form-group row share '>
            <div className='col-md-12 text-center'>
              <button
                className='form-control btn btn-primary'
                onClick={(e) => handleReset(e)}
              >
                Reset
              </button>
              <button
                className='form-control btn btn-primary share-btn'
                onClick={(e) => handleSubmit(e)}
                disabled={
                  Object.keys(state).some((key) =>
                    state[key] === ''
                  )
                }
              >
                {data ? 'Update' : 'Add'}
              </button>
            </div>
          </div>
        </form>
      </Modal.Body >
    </Modal >
  );
}
export default AddUserModal;
