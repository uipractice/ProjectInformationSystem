// common imports
import React, { useState, useEffect } from 'react';
import NavBar from '../NavBar';
import Footer from '../Footer';
import UserTable from '../UserManagement/UserTable';
import './UserDetails.css'
import axios from 'axios';
import { getApiUrl } from '../../utils/helper';

const UserDetailsDashboard = () => {
    const [userDetails, setUserDetails] = useState([]);
 
    const getUserDetails = () => {
      axios.get(getApiUrl(`users`))
    .then((res) => {
      setUserDetails(res)
    })
    .catch((err) => err);
   }

   useEffect(()=>{
    getUserDetails();
}, []);
 
  return (
    <div>
       <NavBar />
       <div className='d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 mb-3 userDetail'>
           <h3>USER MANAGEMENT SYSTEM</h3>
           <button
            type='button'
            className='btn work_btn work_btn_blue center modal-button'>Add User</button>
       </div>
       <Footer />
       {userDetails && userDetails.data && userDetails.data.length > 0 &&  <UserTable 
       data ={userDetails.data} />}
      
     </div>
  );
};

export default UserDetailsDashboard;
