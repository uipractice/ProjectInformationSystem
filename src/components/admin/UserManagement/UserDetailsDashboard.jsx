// common imports
import React, { useState, useEffect } from 'react';
import NavBar from '../NavBar';
import Footer from '../Footer';
import UserTable from '../UserManagement/UserTable';
import './UserDetails.css';
import AddUserModal from './AddUserModal';
const UserDetailsDashboard = () => {
    // const sampleResponse = {
    //     "userDetails": {
    //         "userName": 'Rajesh',
    //         "email": "spaleti@evoketechnologies.com",
    //         "role": 'Admin',
    //         "team": "developer",
    //         "dateCreated": "26-10-2021",
    //         "contactNumber": "7995638533",
    //         "status": "active"
    //     }
    // };
   //const [userDetails, setUserDetails] = useState(sampleResponse);
   const [showModal, setShowModal] = useState(false);
    useEffect(()=>{
        // getUserDetails(sampleResponse);
    }, []);

    //const getUserDetails = () => {
        // commentd for future use-once api is created will integrated here
    //     return axios.get(getApiUrl(`userDetails`))
    // .then((res) => {
    //      return setUserDetails(res)
    // })
    // .catch((err) => err);
  // }
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
            className='btn work_btn work_btn_blue center modal-button' onClick={openModal}>Add User</button>
       </div>
       {showModal && <AddUserModal isOpen={showModal}/>}
       <Footer />
       <UserTable />
     </div>
  );
};

export default UserDetailsDashboard;
