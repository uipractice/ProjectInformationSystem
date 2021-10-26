// common imports
import React, { useState, useEffect } from 'react';
const UserDetailsDashboard = () => {
    const sampleResponse = {
        "userDetails": {
            "userName": 'Rajesh',
            "email": "spaleti@evoketechnologies.com",
            "userRole": 'Admin',
            "team": "developer",
            "dateCreated": "26-10-2021",
            "contactNumber": "7995638533",
            "status": "active"
        }
    };
    const [userDetails, setUserDetails] = useState(sampleResponse);
    useEffect(()=>{
        getUserDetails();
    }, []);

    const getUserDetails = () => {
        // commentd for future use-once api is created will integrated here
    //     return axios.get(getApiUrl(`userDetails`))
    // .then((res) => {
    //      return setUserDetails(res)
    // })
    // .catch((err) => err);
   }
 
  return (
    <div>
        Test
     </div>
  );
};

export default UserDetailsDashboard;
