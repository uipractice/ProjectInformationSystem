// import React from 'react'
// import { useHistory } from "react-router-dom";

// function ShareButtonSection() {
//     const history = useHistory();

//     function handleFormOpen(){
//         history.push('/client_form');
//     }
//     return (
//         <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 mb-3">
//             <h1 className="h2 work_area_title">Evoke Projects</h1>
//             <div className="btn-toolbar mb-2 mb-md-0">
            
//                 <button type="button" className="btn-light work_btn work_btn_light" onClick={handleFormOpen}>Open Project Form </button>
//                 <button type="button" className="btn-light work_btn work_btn_blue" data-bs-toggle="modal" data-bs-target="#shareform">Share Project Form</button>
                
//                 <div className="modal fade" id="shareform" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
//                     <div className="modal-dialog">
//                         <div className="modal-content">
//                             <div className="modal-header">
//                                 <h5 className="modal-title" id="exampleModalLabel">Share Project Form</h5>
//                                 <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
//                             </div>
//                             <div className="modal-body">
//                                 <form className="row g-3">
//                                     <div className="col-md-6">
//                                         <label className="form-label">Project Name</label>
//                                         <input type="text" className="form-control" id="projectname"/>
//                                     </div>
//                                     <div className="col-md-6">
//                                         <label className="form-label">Project Manager</label>
//                                         <input type="text" className="form-control" id="projectmanager" />
//                                     </div>
//                                     <div className="col-12 m-t-35">
//                                         <label className="form-label">Email ID (Enter multiple email id with comma seperation)</label>
//                                         <input type="text" className="form-control" id="emailids" />
//                                     </div>
//                                 </form>	
//                             </div>
//                             <div className="modal-footer">
//                                 <button type="button" className="btn btn-light btn_white" data-bs-dismiss="modal">RESET</button>
//                                 <button type="button" className="btn btn-primary btn_blue">SHARE</button>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
                
//             </div>
//         </div>
//     )
// }

// export default ShareButtonSection
