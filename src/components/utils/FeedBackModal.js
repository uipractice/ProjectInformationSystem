import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const FeedBackModal = (props) => {
  const feedBackText = /^[a-zA-Z]+$/;
  return (
    <Dialog
      open={props.open}
      onClose={props.closeHandler}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
      className='feedback-modal'
    >
      <DialogTitle id='alert-dialog-title'>{'Feedback'}</DialogTitle>
      <Button
        onClick={(e) => props.closeHandler(e, true)}
        color='primary'
        className='feedback-close'
      >
        <svg className='_modal-close-icon' viewBox='0 0 40 40'>
          <path d='M 10,10 L 30,30 M 30,10 L 10,30' />
        </svg>
      </Button>
      <DialogContent>
        <DialogContentText id='alert-dialog-description'>
          <h3>Hello Friends</h3>
          <p>Your review will help us go give you the better experience</p>
          <textarea
            type='text'
            autoFocus={true}
            style={{ color: 'black' }}
            onChange={(e) => props.handleInputChange(e)}
            name='deleteReason'
          />
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        {/* <Button onClick={handleClose} color="primary">
                            Disagree
                        </Button> */}
        <Button
          onClick={(e) => props.closeHandler(e, false)}
          color='primary'
          autoFocus
          className='feedback-submit'
          disabled={!props.feedbackText.match(feedBackText)}
        >
          Send
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default FeedBackModal;
