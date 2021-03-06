import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './Container.css';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getApiUrl } from '../../utils/helper';

import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { exp1, exp4 } from '../../constants/regex';
import { commonTeams } from '../../common/commonTeams'

toast.configure();

function Form({ closeModal }) {
  const inputRef = useRef(null);

  const [teams, setTeams] = useState(commonTeams)

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  useEffect(() => {
    commonTeams.forEach((team)=>{
      team.label = team.label + ' Practice'
    })
    setTeams(commonTeams)
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
    const value = e.target.value.replace(/[^a-zA-Z ]/g, '');
    if (email) {
      handleEmailChange(e, email);
    } else if (value.match(exp1)) {
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

  function handleOnDropdownChange(value) {
    setState({
      ...state,
      practice: value ? value : '',
    });
  }

  function handleOtherPractice(e) {
    const value = e.target.value.replace(/[^a-zA-Z ]/g, '');
    if (value.match(exp4)) {
      setNewPractice(value);
    } else {
      setNewPractice('');
    }
  }

  const handleReset = (e) => {
    e.preventDefault();
    setState({
      ...state,
      projectNameByIT: '',
      projectManager: '',
      email: '',
      practice: '',
    });
    setNewPractice('');
  };

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
    if (ValidateEmail(state.email)) {
      if (state.practice.label !== 'Other') {
        state.practice = state.practice.label;
      } else if (state.practice.label === 'Other') {
        state.practice = newPractice;
      }
      axios
        .post(getApiUrl(`clientInfo/email`), state)
        .then((res) => {
          if (res.data === 'success') {
            closeModal();
            toast.success('Project form shared successfully !', {
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
        .then(() => {
          window.close();
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

      <div className='form-group row'>
        <label>Email address</label><h4 className='email-help-text' > (Add multiple emails with (,) separation)</h4 >
        <textarea
          type='textarea'
          className='form-control textArea'
          onChange={(e) => handleOnChange(e, true)}
          onKeyDown={(e) => handleOnChange(e, true)}
          name='email'
          value={
            state &&
            state.email &&
            state.email.match(mailformat) &&
            state.email.toLowerCase()
          }
          rows='3'
          cols='50'
        />
      </div>
      <div className='row'>
        <div className='form-group col-md-6'>
          <label>Practice Name </label>
          <Autocomplete
            options={teams}
            value={state.practice}
            getOptionLabel={(option) => option.label}
            onChange={(event, value) => handleOnDropdownChange(value)}
            renderInput={(params) => (
              <TextField {...params} variant='outlined' />
            )}
          />
        </div>
        {state.practice.label === 'Other' && (
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
            state.practice.label &&
            (state.practice.label !== 'Other' ||
              (state.practice.label === 'Other' && newPractice)) ? (
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
