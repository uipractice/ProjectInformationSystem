// common imports
import React, { useState, useEffect } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import Divider from '@material-ui/core/Divider';
import InputLabel from '@material-ui/core/InputLabel'
import MenuList from '@material-ui/core/MenuList';
import Logo from '../../assets/images/eoke_logo.svg';
import { clearTokens } from '../utils/authToken';
import { superAdmin } from '../constants/constants';
import { getUser } from "../utils/userDetails";
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

const NavBar = ({ validate, clientForm, title }) => {
  function handleLogout() {
    clearTokens();
    history.push('/');
    // checkAuth();
  }

  const history = useHistory();


  /**
   * Checking the authentication
   * @return {null}
   */
  const [userRole, setUserRole] = useState('');
  const [userDesignation, setUserDesignation] = useState([]);

  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const prevOpen = React.useRef(open);
  const handleToggle = () => {
    setOpen(!open);
  };
  const [feedbackText, setFeedbackText] = React.useState('');
  const [view] = React.useState(title)

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
      const feedbackDescription = {
        feedbackText
      }

      axios
        .post(getApiUrl(`clientInfo/feebackMail`), feedbackDescription)
        .then((res) => {
          console.log(res.data);
          toast.success('A feedback mail has been triggered !', {
            autoClose: 1800,
          });
        })
        .catch((err) => console.log(err.response));
    }
  };

  const handleClickAway = () => {
    setOpen(false)
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

  useEffect(() => {
    let user = JSON.parse(getUser());
    setUserRole(user.userName)
    if (user.role === "superAdmin") {
      let name = user.role.substring(0, 5) + " " + user.role.substring(5, user.role.length)
      let role = name.charAt(0).toUpperCase() + name.slice(1);
      setUserDesignation(role)
    } else {
      setUserDesignation(user.role)
    }
  }, [])
  // return focus to the button when we transitioned from !open -> open
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
  const handleUserDetails = () => {
    return history.push('/user-details');
  }
  const handleDashboard = () => {
    return history.push('/dashboard',);
  }
  const handleReset = () => {
    return history.push('/reset-password')
  }

  return (
    <div>
      <div className='navbar navbar-dark sticky-top  p-0 shadow header_nav'>
        <div className='full-width'>
          <div className="d-flex flex-1">
            <a
              className='navbar-brand  px-1'
            >
              <img src={Logo} alt='Evoke Technologies' />
            </a>
            <h3 >Project Information System </h3>
          </div>

          <div className="d-flex flex-1">
            <h3 className="view">{view}</h3>
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
                        <ClickAwayListener onClickAway={handleClickAway}>
                          <MenuList
                            autoFocusItem={open}
                            id='menu-list-grow'
                            onKeyDown={handleListKeyDown}
                          >
                            <MenuItem className='myprofile'>{userRole}</MenuItem>
                            <InputLabel
                              style={{
                                paddingLeft: '40px',
                                fontSize: '12px'
                              }}
                              className='user-designation'>{userDesignation}</InputLabel>
                            <Divider />
                            <FeedBackModal
                              open={feedback}
                              closeHandler={(e, closeClick) => {
                                setFeedbackText('');
                                handleClose(e, closeClick);
                              }}
                              handleInputChange={(e) => handleInputChange(e)}
                              feedbackText={feedbackText}
                            />
                            <MenuItem className='user' onClick={handleDashboard}>
                              DashBoard
                            </MenuItem>
                            <MenuItem className='resetPassword' onClick={handleReset}>
                              Reset Password
                            </MenuItem>

                            {JSON.parse(getUser()).role === superAdmin && <MenuItem className='dashboard' onClick={handleUserDetails}>
                              User Management
                            </MenuItem>}
                            <MenuItem
                              className='feedback'
                              onClick={handleClickOpen}
                            >
                              Provide Feedback
                            </MenuItem>
                            <Divider />
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
    </div>
  );
};

export default NavBar;
