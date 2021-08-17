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
    setOpen(false);
    if (!closeClick) {
      axios
        .post(getApiUrl(`clientInfo/feebackMail`))
        .then((res) => {
          console.log(res.data);
          toast.success('A Reminder mail has been triggered !', {
            autoClose: 1800,
          });
        })
        .catch((err) => console.log(err.response));

      setTimeout(() => {
        history.push('/admin');
      }, 2000);
    }
  };

  return (
    <div className='footer'>
      <ul>
        <li>
          <p>Evoke Technologies Pvt Ltd © 2021 All Rights Reserved</p>
        </li>
        <li>
          <a href='#/' onClick={handleClickOpen}>
            Provide Feedback
          </a>
        </li>
        <FeedBackModal
          open={open}
          closeHandler={(value, closeClick) => handleClose(value, closeClick)}
        />
      </ul>
    </div>
  );
};
export default Footer;
