// common imports
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getApiUrl } from '../../utils/helper';
import NavBar from '../NavBar';
import Footer from '../Footer';
import UserTable from '../UserManagement/CompleteTable';
import AddUserModal from './AddUserModal';
import { useHistory } from "react-router-dom";
import leftIcon from '../../../../src/assets/images/ums-left-icon.svg';
import './UserDetails.css';


const UserDetailsDashboard = () => {
    const [userDetails, setUserDetails] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [editData, setEditData] = useState({});
    
    const history = useHistory();
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
  setEditModal(false);
  getUserDetails();
  }


  return (
    <div>
       <NavBar/>
       <div className='d-flex justify-content-between align-items-center pt-3 mb-3 userDetail'>
       <span className='ums-label'>
       <img
        onClick={()=>history.push('/dashboard')}
        src={leftIcon} /> &nbsp;
       <label> USER MANAGEMENT SYSTEM </label>
       </span>
           <button
            type='button'
            className='btn work_btn work_btn_blue center modal-button' onClick={() => openModal()}>Add User</button>
       </div>
       {showModal && <AddUserModal 
                          isOpen={showModal}  
                          closeModal={() => {setShowModal(false);}} 
                          updateToolStatus={() => getUpdatedData()}/>}

       {editModal && <AddUserModal 
                          isOpen={editModal}  
                          updateToolStatus={() => getUpdatedData()} 
                          updatedData={editData} 
                          closeModal={() => setEditModal(false)}/>}

       {userDetails && userDetails.data && userDetails.data.length > 0 &&  
                <UserTable 
                    data ={userDetails.data} 
                    getEditForm={(data) => { setEditModal(true); setEditData(data)}} />}
       <Footer />
     </div>
  );
};

export default UserDetailsDashboard;
