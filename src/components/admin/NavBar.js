// common imports
import React from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import Logo from '../../assets/images/eoke_logo.svg';
// components
import FeedBackModal from '../utils/FeedBackModal';
// helpers
import { getApiUrl } from '../utils/helper';

toast.configure();

/**
 * NavBar component
 *
 * @param {Boolean} validate contains boolean to validate.
 * @return {null}
 */

const NavBar = ({ validate, clientForm }) => {
  function handleLogout() {
    sessionStorage.removeItem('auth-token');
    checkAuth();
  }

  const history = useHistory();

  /**
   * Checking the authentication
   * @return {null}
   */
  const checkAuth = () => {
    if (!sessionStorage.getItem('auth-token')) {
      history.push('/');
    } else {
      const authToken = '123456abcdef';
      if (sessionStorage.getItem('auth-token') === authToken) {
        return <Redirect to='/admin_dashboard' />;
      } else {
        history.push('/');
      }
    }
  };

  if (validate) {
    checkAuth();
  }

  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const handleToggle = () => {
    setOpen(() => !prevOpen);
  };
  const [feedbackText, setFeedbackText] = React.useState('');

  /**
   * Setting modal close state and call api to send the mail.
   *
   * @param {Object} event current event object.
   * @param {Boolean} closeClick contains boolean to defined the close click.
   * @return {null}
   */
  const handleClose = (event, closeClick) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
    setFeedback(false);
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
    }
  };

  const [feedback, setFeedback] = React.useState(false);
  const handleClickOpen = () => {
    setFeedback(!feedback);
  };
  const prevOpenfeedback = React.useRef(feedback);
  React.useEffect(() => {
    if (prevOpenfeedback.current === true && feedback === false) {
      anchorRef.current.focus();
    }
    prevOpenfeedback.current = feedback;
  }, [feedback]);

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }
  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }
    prevOpen.current = open;
  }, [open]);

  const handleInputChange = (e) => {
    const value = e.target.value.replace(/[^a-zA-Z0-9 ]/g, '');
    setFeedbackText(value);
  };
  return (
    <div>
      <div className='navbar navbar-dark sticky-top  p-0 shadow header_nav'>
        <div className='row'>
          <a
            className='navbar-brand col-md-6 px-4'
          >
            <img src={Logo} alt='Evoke Technologies' />
          </a>
          <h3>Project Information System </h3>
        </div>

        {!clientForm && (
          <ul className='navbar-nav px-3'>
            <li className='nav-item text-nowrap'>
              <Button
                ref={anchorRef}
                aria-controls={open ? 'menu-list-grow' : undefined}
                aria-haspopup='true'
                onClick={handleToggle}
              ></Button>
              <Popper
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                transition
                disablePortal
              >
                {({ TransitionProps, placement }) => (
                  <Grow
                    {...TransitionProps}
                    style={{
                      transformOrigin:
                        placement === 'bottom' ? 'center top' : 'center bottom',
                    }}
                  >
                    <Paper>
                      <ClickAwayListener onClickAway={handleClose}>
                        <MenuList
                          autoFocusItem={open}
                          id='menu-list-grow'
                          onKeyDown={handleListKeyDown}
                        >
                          {/* <MenuItem className='myprofile'>My profile</MenuItem> */}
                          <MenuItem
                            className='feedback'
                            onClick={handleClickOpen}
                          >
                            Provide Feedback
                          </MenuItem>
                          <FeedBackModal
                            open={feedback}
                            closeHandler={(e, closeClick) => {
                              setFeedbackText('');
                              handleClose(e, closeClick);
                            }}
                            handleInputChange={(e) => handleInputChange(e)}
                            feedbackText={feedbackText}
                          />
                          <MenuItem className='logout' onClick={handleLogout}>
                            Logout
                          </MenuItem>
                        </MenuList>
                      </ClickAwayListener>
                    </Paper>
                  </Grow>
                )}
              </Popper>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default NavBar;
