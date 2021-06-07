// import React from 'react'
// import Delete from "../../assets/images/delete.svg"
// import Filter from "../../assets/images/filter.svg"

// function TableBodyData() {
//     return (
//         <div className="records_table card-hover-shadow">
//             <div className="records_title d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center">
//                 <h1 className="table_title">ACTIVE</h1>
//                 <div className="btn-toolbar mb-2 mb-md-0">
//                     <div className="dropdown dd">
//                         <button className="btn dropdown-toggle btn_filter" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
//                             <img src={Filter} alt="filter" className="filter"/>
//                             Filter
//                         </button>
//                         <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
//                             <li><a className="dropdown-item" href="https://www.evoketechnologies.com/">All</a></li>
//                             <li><a className="dropdown-item" href="https://www.evoketechnologies.com/">Active</a></li>
//                             <li><a className="dropdown-item" href="https://www.evoketechnologies.com/">Inactive</a></li>
//                             <li><a className="dropdown-item" href="https://www.evoketechnologies.com/">Pending</a></li>
//                             <li><a className="dropdown-item" href="https://www.evoketechnologies.com/">Completed</a></li>
//                         </ul>
//                     </div>
//                 </div>
//             </div>

//             <div className="table-responsive grid tableFixHead">

//                 <table className="table table-striped ">
//                     <thead className="sticky-header">
//                         <tr>
//                         <th className="center sticky-top">SL.NO</th>
//                         <th className="sticky-top" scope="col">PROJECT NAME</th>
//                         <th className="sticky-top" scope="col">PROJECT MANAGER</th>
//                         <th className="sticky-top" scope="col">PRACTICE NAME</th>
//                         <th className="center sticky-top">ASSIGN DATE</th>
//                         <th className="center sticky-top">SUBMITTED DATE</th>
//                         <th className="sticky-top" scope="col" width="100px">STATUS</th>
//                         <th className="center sticky-top" width="130px">ACTION</th>
//                         </tr>
//                     </thead>

//                     <tbody>
//                         <tr>
//                             <td className="center">1</td>
//                             <td>Alliance</td>
//                             <td>Hari Babu Madduluri</td>
//                             <td>Delivery</td>
//                             <td className="center">10-05-2021</td>
//                             <td className="center">-</td>
//                             <td className="pending">Pending</td>
//                             <td className="center user_actions"> 
//                                 <a href="https://www.evoketechnologies.com/"><img src={Delete} width="12px" alt="delete" /></a>
//                             </td>
//                         </tr>
                    
//                         <tr>
//                             <td className="center">2</td>
//                             <td>Alliance</td>
//                             <td>Hari Babu Madduluri</td>
//                             <td>Delivery</td>
//                             <td className="center">10-05-2021</td>
//                             <td className="center">-</td>
//                             <td className="pending">Pending</td>
//                             <td className="center user_actions">                           
//                                 <a href="https://www.evoketechnologies.com/"><img src={Delete} width="12px" alt="delete" /></a>
//                             </td>
//                         </tr>

//                         <tr>
//                             <td className="center">3</td>
//                             <td>Alliance</td>
//                             <td>Hari Babu Madduluri</td>
//                             <td>Delivery</td>
//                             <td className="center">10-05-2021</td>
//                             <td className="center">-</td>
//                             <td className="pending">Pending</td>
//                             <td className="center user_actions">
                                
//                                 <a href="https://www.evoketechnologies.com/"><img src={Delete} width="12px" alt="delete" /></a>
//                             </td>
//                         </tr>
                    
//                         <tr>
//                             <td className="center">4</td>
//                             <td>Alliance</td>
//                             <td>Hari Babu Madduluri</td>
//                             <td>Delivery</td>
//                             <td className="center">10-05-2021</td>
//                             <td className="center">08-05-2021</td>
//                             <td className="submitted">Submitted</td>
//                             <td className="center user_actions">
                                
//                                 <a href="https://www.evoketechnologies.com/"><img src={Delete} width="12px" alt="delete" /></a>
//                             </td>
//                         </tr>

//                         <tr>
//                             <td className="center">5</td>
//                             <td>Alliance</td>
//                             <td>Hari Babu Madduluri</td>
//                             <td>Delivery</td>
//                             <td className="center">10-05-2021</td>
//                             <td className="center">08-05-2021</td>
//                             <td className="submitted">Submitted</td>
//                             <td className="center user_actions">
                                
//                                 <a href="https://www.evoketechnologies.com/"><img src={Delete} width="12px" alt="delete" /></a>
//                             </td>
//                         </tr>
                    
//                         <tr>
//                             <td className="center">6</td>
//                             <td>Alliance</td>
//                             <td>Hari Babu Madduluri</td>
//                             <td>Delivery</td>
//                             <td className="center">10-05-2021</td>
//                             <td className="center">08-05-2021</td>
//                             <td className="submitted">Submitted</td>
//                             <td className="center user_actions">
                                
//                                 <a href="https://www.evoketechnologies.com/"><img src={Delete} width="12px" alt="delete" /></a>
//                             </td>
//                         </tr>

//                         <tr>
//                             <td className="center">7</td>
//                             <td>Alliance</td>
//                             <td>Hari Babu Madduluri</td>
//                             <td>Delivery</td>
//                             <td className="center">10-05-2021</td>
//                             <td className="center">08-05-2021</td>
//                             <td className="completed">completed</td>
//                             <td className="center user_actions">
                                
//                                 <a href="https://www.evoketechnologies.com/"><img src={Delete} width="12px" alt="delete" /></a>
//                             </td>
//                         </tr>

//                         <tr>
//                             <td className="center">8</td>
//                             <td>Alliance</td>
//                             <td>Hari Babu Madduluri</td>
//                             <td>Delivery</td>
//                             <td className="center">10-05-2021</td>
//                             <td className="center">08-05-2021</td>
//                             <td className="completed">completed</td>
//                             <td className="center user_actions">
                                
//                                 <a href="https://www.evoketechnologies.com/"><img src={Delete} width="12px" alt="delete" /></a>
//                             </td>
//                         </tr>
                    
//                         <tr>
//                             <td className="center">9</td>
//                             <td>Alliance</td>
//                             <td>Hari Babu Madduluri</td>
//                             <td>Delivery</td>
//                             <td className="center">10-05-2021</td>
//                             <td className="center">08-05-2021</td>
//                             <td className="completed">completed</td>
//                             <td className="center user_actions">
//                                 <img src={Delete} width="12px" alt="delete" />
//                             </td>
//                         </tr>

//                         <tr>
//                             <td className="center">10</td>
//                             <td>Alliance</td>
//                             <td>Hari Babu Madduluri</td>
//                             <td>Delivery</td>
//                             <td className="center">10-05-2021</td>
//                             <td className="center">08-05-2021</td>
//                             <td className="completed">completed</td>
//                             <td className="center user_actions">
//                                 <img src={Delete} width="12px" alt="delete" /> 
//                             </td>
//                         </tr>
//                     </tbody>
                
//                 </table>
    
//             </div>
        
//         </div>
//     )
// }

// export default TableBodyData
