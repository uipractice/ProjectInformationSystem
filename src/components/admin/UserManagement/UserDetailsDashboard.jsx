// common imports
import React, { useState, useEffect } from 'react';
import NavBar from '../NavBar';
import Footer from '../Footer';
import UserTable from '../UserManagement/UserTable';
import './UserDetails.css';
import AddUserModal from './AddUserModal';
const UserDetailsDashboard = () => {
   const [showModal, setShowModal] = useState(false);
       const openModal = () => {
    setShowModal(true);
   }
 
  return (
    <div>
       <NavBar />
       <div className='d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 mb-3 userDetail'>
           <h3>USER MANAGEMENT SYSTEM</h3>
           <button
            type='button'
            className='btn work_btn work_btn_blue center modal-button' onClick={() => openModal()}>Add User</button>
       </div>
       {showModal && <AddUserModal isOpen={showModal}/>}
       <Footer />
      
     </div>
  );
};

export default UserDetailsDashboard;
