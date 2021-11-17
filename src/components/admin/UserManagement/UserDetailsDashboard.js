// common imports
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getApiUrl } from '../../utils/helper';
import NavBar from '../NavBar';
import Footer from '../Footer';
import UserTable from '../UserManagement/UserTable';
import AddUserModal from './AddUserModal';
import './UserDetails.css';


const UserDetailsDashboard = () => {
    const [userDetails, setUserDetails] = useState([]);
    const [showModal, setShowModal] = useState(false);
    
    const openModal = () => {
       setShowModal(true);
    }
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
 
const getUpdatedData = ()=>{
  setShowModal(false);
  getUserDetails();
  }


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
            className='btn work_btn work_btn_blue center modal-button' onClick={() => openModal()}>Add User</button>
       </div>
       {showModal && <AddUserModal isOpen={showModal}  closeModal={() => {
            setShowModal(false);
          }} updateToolStatus={() => getUpdatedData()}/>}
       {userDetails && userDetails.data && userDetails.data.length > 0 &&  <UserTable 
       data ={userDetails.data} />}
       <Footer />
     </div>
  );
};

export default UserDetailsDashboard;
