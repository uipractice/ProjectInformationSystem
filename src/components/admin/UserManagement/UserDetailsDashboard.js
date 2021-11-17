// common imports
import React, { useState, useEffect } from 'react';
import NavBar from '../NavBar';
import Footer from '../Footer';
import UserTable from './UserTable';
import './UserDetails.css'
import axios from 'axios';
import { getApiUrl } from '../../utils/helper';
import { useHistory } from "react-router-dom";
const UserDetailsDashboard = () => {
    const [userDetails, setUserDetails] = useState([]);
    const history=useHistory();
 
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
       <NavBar title={'USER MANAGEMENT'}/>
       <div className='d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 mb-3 userDetail'>
       <button
            type='button'
            className='btn work_btn work_btn_blue center modal-button'
            onClick={()=>history.push('/dashboard')}
            >Dashboard</button>
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
