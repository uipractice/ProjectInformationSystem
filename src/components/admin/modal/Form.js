import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './Container.css';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getApiUrl } from '../../utils/helper';

import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

toast.configure();

function Form({ closeModal }) {
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const [newPractice, setNewPractice] = useState('');
  const [state, setState] = useState({
    projectNameByIT: '',
    projectManager: '',
    email: '',
    practice: '',
    status: 'Pending',
    deleteReason: '',
    restoreReason: '',
    reshareReason: '',
    autoFill: false,
  });

  function handleOnChange(e, email) {
    const value = e.target.value.replace(/[^a-zA-Z ]/g,'');
    if (email) {
      handleEmailChange(e, email);
    } else if (value.match(/[a-zA-Z]+([\s]+)*$/)) {
      setState({
        ...state,
        [e.target.name]: value,
        autoFill: false,
      });
    }else {
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
    } else if(!state.autoFill){
      setState({
        ...state,
        [e.target.name]: e.target.value,
        autoFill: false
      });
    } else {
      setState({
        ...state,
        autoFill: false
      });
    }
  }

  function handleOnDropdownChange(e) {
    setState({
      ...state,
      practice: e && e.label ? e.label : '',
    });
  }

  function handleOtherPractice(e) {
    const value = e.target.value.replace(/[^a-zA-Z ]/g,'');
    if (value.match(/[a-zA-Z]+([\s]+)*$/)) {
      setNewPractice(value);
    } else {
      setNewPractice('');
    }
  }

  const handleReset = (e) => {
    e.preventDefault();
    setState({
      projectNameByIT: '',
      projectManager: '',
      email: '',
      practice: '',
    });
    setNewPractice('');
  };

  function ValidateEmail(inputText) {
    const mailformat =
      /^([a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@evoketechnologies.com(\s*,\s*|\s*$))*$/;
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

    if (ValidateEmail(state.email)) {
      if (state.practice === 'Other') {
        state.practice = newPractice;
      }
      axios
        .post(getApiUrl(`clientInfo/email`), state)
        .then((res) => {
          if (res.data === 'success') {
            closeModal();
            toast.success('Data Saved Successfully !', {
              autoClose: 2000,
            });
            console.log(state);

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

        .catch((err) => console.log(err.response));
    }
  }
  return (
    <form>
      <div className='row'>
        <div className='form-group col-md-6'>
          <label htmlFor='projectNameByIT'>Project Name</label>
          <input
            type='text'
            ref={inputRef}
            className='form-control'
            onChange={handleOnChange}
            name='projectNameByIT'
            value={state.projectNameByIT}
          />
        </div>

        <div className='form-group col-md-6'>
          <label htmlFor='projectManager'>Project Manager</label>
          <input
            type='text'
            className='form-control'
            onChange={handleOnChange}
            name='projectManager'
            value={state.projectManager}
          />
        </div>
      </div>

      <div className='form-group row' style={{ margin: '0 auto 1rem' }}>
        <label>Email address</label>
        <textarea
          type='textarea'
          className='form-control'
          onChange={(e) => handleOnChange(e, true)}
          onKeyDown={(e) => handleOnChange(e, true)}
          name='email'
          value={state && state.email && state.email.toLowerCase()}
          rows='3'
          cols='50'
        />
      </div>
      <div className='row'>
        <div className='form-group col-md-6'>
          <label>Practice Name </label>
          <Autocomplete
            options={[
              { label: 'BI Practice', value: 1 },
              { label: 'Big Data Practice', value: 2 },
              { label: 'Block Chain Practice', value: 3 },
              { label: 'BPM Practice', value: 4 },
              { label: 'BPO Practice', value: 5 },
              { label: 'Data Science Practice', value: 6 },
              { label: 'Delivery Practice', value: 7 },
              { label: 'Java Practice', value: 8 },
              { label: 'Microsoft Practice', value: 9 },
              { label: 'Mobility Practice', value: 10 },
              { label: 'Open Source Practice', value: 11 },
              { label: 'Oracle Practice', value: 12 },
              { label: 'Pega Practice', value: 13 },
              { label: 'QA Practice', value: 14 },
              { label: 'RPA Practice', value: 15 },
              { label: 'Sales Force Practice', value: 16 },
              { label: 'Service Now Practice', value: 17 },
              { label: 'Support Practice', value: 18 },
              { label: 'UI Practice', value: 19 },
              { label: 'Other', value: 20 },
            ]}
            getOptionLabel={(option) => option.label}
            onChange={(event, value) => handleOnDropdownChange(value)}
            renderInput={(params) => (
              <TextField {...params} variant='outlined' />
            )}
          />
        </div>
        {state.practice === 'Other' && (
          <div className='form-group col-md-6'>
            <label htmlFor='projectManager'>Practice / Project name</label>
            <input
              type='text'
              className='form-control'
              value={newPractice}
              onChange={handleOtherPractice}
              autoFocus
            />
          </div>
        )}
      </div>

      <div className='form-group row share'>
        <div className='col-md-6'></div>
        <div className='col-md-6 text-right'>
          <button
            className='form-control btn btn-primary'
            onClick={handleReset}
          >
            Reset
          </button>

          {state.projectNameByIT &&
          state.projectManager &&
          state.email &&
          state.practice &&
          (state.practice !== 'Other' ||
            (state.practice === 'Other' && newPractice)) ? (
            <button
              className='form-control btn btn-primary share-btn'
              onClick={handleSubmit}
            >
              Share
            </button>
          ) : (
            <button
              className='form-control btn btn-primary share-btn'
              onClick={handleSubmit}
              disabled
            >
              Share
            </button>
          )}
        </div>
      </div>
    </form>
  );
}
export default Form;
