import React, { Component } from 'react';
import './modal/Container.css';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Button } from '@material-ui/core';
import Form from './modal/Form';

export class ShareModalContainer extends Component {
  state = { isShown: false, open: false };
  showModal = () => {
    this.setState({ isShown: true }, () => {
      // this.closeButton.focus();
    });
    this.toggleScrollLock();
  };
  closeModal = () => {
    this.setState({ isShown: false });
    this.toggleScrollLock();
  };
  onKeyDown = (event) => {
    if (event.keyCode === 27) {
      this.closeModal();
    }
  };
  onClickOutside = (event) => {
    if (this.modal && this.modal.contains(event.target)) return;
    this.closeModal();
  };

  toggleScrollLock = () => {
    document.querySelector('html').classList.toggle('scroll-lock');
  };

  // const [alignment, setAlignment] = React.useState('left');
  //   const handleAlignment = (event, newAlignment) => {
  //       setAlignment(newAlignment);
  //   };

  render() {
    return (
      <div className='d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 mb-3'>
        <ToggleButtonGroup
          // value={alignment}
          exclusive
          // onChange={handleAlignment}
          aria-label='text alignment'
        >
          <ToggleButton
            value='left'
            aria-label='left aligned'
            className='Mui-selected'
          >
            Client Project
          </ToggleButton>
          <ToggleButton value='center' aria-label='centered'>
            Internal Project
          </ToggleButton>
        </ToggleButtonGroup>

        <div className='btn-toolbar mb-2 mb-md-0'>
          <button
            type='button'
            className='btn work_btn work_btn_blue center modal-button'
            ref={this.buttonRef}
            onClick={() => this.setState({ open: true })}
          >
            SHARE PROJECT FORM
          </button>

          {this.state.open ? (
            <Dialog
              open={this.state.open}
              onClose={() => this.setState({ open: false })}
              aria-labelledby='alert-dialog-title'
              aria-describedby='alert-dialog-description'
              className='share-modal'
            >
              <DialogTitle id='alert-dialog-title'>
                {'Share Project Form'}
              </DialogTitle>
              <Button
                onClick={() => this.setState({ open: false })}
                color='primary'
                className='feedback-close'
              >
                <svg className='_modal-close-icon' viewBox='0 0 40 40'>
                  <path d='M 10,10 L 30,30 M 30,10 L 10,30' />
                </svg>
              </Button>
              <DialogContent>
                <Form closeModal={() => this.setState({ open: false })} />
              </DialogContent>
            </Dialog>
          ) : null}
        </div>
      </div>
    );
  }
}

export default ShareModalContainer;
