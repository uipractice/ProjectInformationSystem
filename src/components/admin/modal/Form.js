import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './Container.css';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getApiUrl } from '../../utils/helper';

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

  function handleOtherPractice(e) {
    setNewPractice(e.target.value);
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

      <div className='form-group col-md-12'>
        <label>Email address</label>
        <textarea
          type='textarea'
          className='form-control'
          onChange={(e) => handleOnChange(e, true)}
          onKeyDown={(e) => handleOnChange(e, true)}
          name='email'
          value={state.email}
          rows='3'
          cols='50'
        />
      </div>
      <div className='row'>
        <div className='form-group col-md-6'>
          <label>Practice Name </label>
          <select
            className='form-control'
            onChange={handleOnChange}
            name='practice'
            value={state.practice}
          >
            <option value=''></option>
            <option value='QA Practice'>QA Practice</option>
            <option value='Oracle Practice'>Oracle Practice</option>
            <option value='Java Practice'>Java Practice</option>
            <option value='Microsoft Practice'>Microsoft Practice</option>
            <option value='Other'>Other Practice</option>
          </select>
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
