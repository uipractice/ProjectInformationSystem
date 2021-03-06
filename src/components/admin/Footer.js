// common imorts
import React from 'react';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
// components
import FeedBackModal from '../utils/FeedBackModal';
// helpers
import { getApiUrl } from '../utils/helper';

toast.configure();

// Footer component
const Footer = () => {
  const [open, setOpen] = React.useState(false);
  const [feedbackText, setFeedbackText] = React.useState('');
  const history = useHistory();

  /**
   * settign modal open state.
   * @return {null}.
   */
  const handleClickOpen = () => {
    setOpen(true);
  };

  /**
   * Setting modal close state and call api to send the mail.
   *
   * @param {Object} event current event object.
   * @param {Boolean} closeClick contains boolean to defined the close click.
   * @return {null}
   */

  const handleClose = (event, closeClick) => {
    const feedback = {
      feedbackText,
    };
    setOpen(false);
    if (!closeClick) {
      axios
        .post(getApiUrl(`clientInfo/feebackMail`), feedback)
        .then((res) => {
          console.log(res.data);
          toast.success('A feedback mail has been triggered !', {
            autoClose: 1800,
          });
        })
        .catch((err) => console.log(err.response));

      setTimeout(() => {
        history.push('/dashboard');
      }, 2000);
    }
  };
  const handleInputChange = (e) => {
    const value = e.target.value.replace(/[^a-zA-Z0-9 ]/g,'');
    setFeedbackText(value);
  };
  return (
    <div className='footer'>
      <ul>
        <li>
          <p>Evoke Technologies Pvt Ltd © 2021 All Rights Reserved</p>
        </li>
        <li>
          <button onClick={handleClickOpen} className='link-btn'>
            Provide Feedback
          </button>
        </li>
        <FeedBackModal
          open={open}
          closeHandler={(value, closeClick) => {
            setFeedbackText('');
            handleClose(value, closeClick);
          }}
          handleInputChange={(e) => handleInputChange(e)}
          feedbackText={feedbackText}
        />
      </ul>
    </div>
  );
};
export default Footer;
