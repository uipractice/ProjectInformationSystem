import React from 'react'
import "./AdminDashboard.css"
function AdminDashboard() {
    return (
        <div>
            
            <div class="container-fluid">
    <div class="row">
        <main class="col-md-12 ms-sm-auto col-lg-12">
            <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 mb-3">
                <h1 class="h2 work_area_title">Evoke Projects</h1>
                <div class="btn-toolbar mb-2 mb-md-0">
                
                    <button type="button" class="btn-light work_btn work_btn_light"><a href="openprojectform.html">Open Project Form</a></button>
                    <button type="button" class="btn-light work_btn work_btn_blue" data-bs-toggle="modal" data-bs-target="#shareform">Share Project Form</button>
                    
                    <div class="modal fade" id="shareform" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Share Project Form</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <form class="row g-3">
                            <div class="col-md-6">
                                <label class="form-label">Project Name</label>
                                <input type="text" class="form-control" id="projectname"/>
                            </div>
                            <div class="col-md-6">
                                <label class="form-label">Project Manager</label>
                                <input type="text" class="form-control" id="projectmanager" />
                            </div>
                            <div class="col-12 m-t-35">
                                <label class="form-label">Email ID (Enter multiple email id with comma seperation)</label>
                                <input type="text" class="form-control" id="emailids" />
                            </div>
                            </form>	
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-light btn_white" data-bs-dismiss="modal">RESET</button>
                            <button type="button" class="btn btn-primary btn_blue">SHARE</button>
                        </div>
                        </div>
                    </div>
                    </div>
                    
                </div>
            </div>

            <div class="row">
                <div class="col-md-3 col-lg-3">
                    <div class="card card-hover-shadow card_tile" >
                        <div class="card-body">
                            <div class="row">
                                <div class="col-md-9 ">
                                    <div class="count">210</div>
                                    <div class="count_text">Projects</div>
                                </div>
                                <div class="col-md-3 card_icon">
                                    <img src="../assets/images/Icon_Projects.svg" alt="Icon_Projects"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="col-md-3 col-lg-3"> 
                    <div class="card card-hover-shadow card_tile" >
                        <div class="card-body">
                            <div class="row">            
                                <div class="col-md-9">
                                    <div class="count">130</div>
                                    <div class="count_text">Submitted</div>
                                </div>
                                <div class="col-md-3 card_icon">
                                    <img src="../assets/images/Icon_submitted.svg" alt="Icon_submitted" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="col-md-3 col-lg-3">
                    
                    <div class="card card-hover-shadow card_tile" >
                    <div class="card-body">
                        
                        <div class="row">
                        
                            <div class="col-md-9 ">
                                <div class="count">30</div>
                                <div class="count_text">Approved</div>
                            </div>
                            <div class="col-md-3 card_icon">
                                <img src="../assets/images/Icon_approved.svg" alt="" />
                            </div>
                        
                        </div>
                        </div>
                    </div>
                </div>
                
                <div class="col-md-3 col-lg-3">
                    
                    <div class="card card-hover-shadow card_tile" >
                    <div class="card-body">
                        
                        <div class="row">
                        
                            <div class="col-md-9 ">
                                <div class="count">50</div>
                                <div class="count_text">Pending</div>
                            </div>
                            <div class="col-md-3 card_icon">
                                <img src="../assets/images/Icon_Pending.svg" alt="" />
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
                
            </div>

            <div class="records_table card-hover-shadow">
            
            <div class="records_title d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center">
                <h1 class="table_title">ACTIVE</h1>
                <div class="btn-toolbar mb-2 mb-md-0">
                    <div class="dropdown dd">
                    <button class="btn dropdown-toggle btn_filter" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                        <img src="../assets/images/filter.svg" class="filter"/>
                        Filter
                    </button>
                    <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                        <li><a class="dropdown-item" href="#">All</a></li>
                        <li><a class="dropdown-item" href="#">Active</a></li>
                        <li><a class="dropdown-item" href="#">Inactive</a></li>
                        <li><a class="dropdown-item" href="#">Pending</a></li>
                        <li><a class="dropdown-item" href="#">Completed</a></li>
                    </ul>
                    </div>
                </div>
            </div>
        
            <div class="table-responsive grid tableFixHead">

                <table class="table table-striped ">
                    <thead class="sticky-header">
                        <tr>
                        <th class="center sticky-top">SL.NO</th>
                        <th class="sticky-top" scope="col">PROJECT NAME</th>
                        <th class="sticky-top" scope="col">PROJECT MANAGER</th>
                        <th class="sticky-top" scope="col">PRACTICE NAME</th>
                        <th class="center sticky-top">ASSIGN DATE</th>
                        <th class="center sticky-top">SUBMITTED DATE</th>
                        <th class="sticky-top" scope="col" width="100px">STATUS</th>
                        <th class="center sticky-top" width="130px">ACTION</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr>
                            <td class="center">1</td>
                            <td>Alliance</td>
                            <td>Hari Babu Madduluri</td>
                            <td>Delivery</td>
                            <td class="center">10-05-2021</td>
                            <td class="center">-</td>
                            <td class="pending">Pending</td>
                            <td class="center user_actions"> 
                                <a><img src="../assets/images/delete.svg" width="12px" alt="delete" /></a>
                            </td>
                        </tr>
                    
                        <tr>
                            <td class="center">2</td>
                            <td>Alliance</td>
                            <td>Hari Babu Madduluri</td>
                            <td>Delivery</td>
                            <td class="center">10-05-2021</td>
                            <td class="center">-</td>
                            <td class="pending">Pending</td>
                            <td class="center user_actions">                           
                                <a><img src="../assets/images/delete.svg" width="12px" alt="delete" /></a>
                            </td>
                        </tr>

                        <tr>
                            <td class="center">3</td>
                            <td>Alliance</td>
                            <td>Hari Babu Madduluri</td>
                            <td>Delivery</td>
                            <td class="center">10-05-2021</td>
                            <td class="center">-</td>
                            <td class="pending">Pending</td>
                            <td class="center user_actions">
                                
                                <a><img src="../assets/images/delete.svg" width="12px" alt="delete" /></a>
                            </td>
                        </tr>
                    
                        <tr>
                            <td class="center">4</td>
                            <td>Alliance</td>
                            <td>Hari Babu Madduluri</td>
                            <td>Delivery</td>
                            <td class="center">10-05-2021</td>
                            <td class="center">08-05-2021</td>
                            <td class="submitted">Submitted</td>
                            <td class="center user_actions">
                                
                                <a><img src="../assets/images/delete.svg" width="12px" alt="delete" /></a>
                            </td>
                        </tr>

                        <tr>
                            <td class="center">5</td>
                            <td>Alliance</td>
                            <td>Hari Babu Madduluri</td>
                            <td>Delivery</td>
                            <td class="center">10-05-2021</td>
                            <td class="center">08-05-2021</td>
                            <td class="submitted">Submitted</td>
                            <td class="center user_actions">
                                
                                <a><img src="../assets/images/delete.svg" width="12px" alt="delete" /></a>
                            </td>
                        </tr>
                    
                        <tr>
                            <td class="center">6</td>
                            <td>Alliance</td>
                            <td>Hari Babu Madduluri</td>
                            <td>Delivery</td>
                            <td class="center">10-05-2021</td>
                            <td class="center">08-05-2021</td>
                            <td class="submitted">Submitted</td>
                            <td class="center user_actions">
                                
                                <a><img src="../assets/images/delete.svg" width="12px" alt="delete" /></a>
                            </td>
                        </tr>

                        <tr>
                            <td class="center">7</td>
                            <td>Alliance</td>
                            <td>Hari Babu Madduluri</td>
                            <td>Delivery</td>
                            <td class="center">10-05-2021</td>
                            <td class="center">08-05-2021</td>
                            <td class="completed">completed</td>
                            <td class="center user_actions">
                                
                                <a><img src="../assets/images/delete.svg" width="12px" alt="delete" /></a>
                            </td>
                        </tr>

                        <tr>
                            <td class="center">8</td>
                            <td>Alliance</td>
                            <td>Hari Babu Madduluri</td>
                            <td>Delivery</td>
                            <td class="center">10-05-2021</td>
                            <td class="center">08-05-2021</td>
                            <td class="completed">completed</td>
                            <td class="center user_actions">
                                
                                <a><img src="../assets/images/delete.svg" width="12px" alt="delete" /></a>
                            </td>
                        </tr>
                    
                        <tr>
                            <td class="center">9</td>
                            <td>Alliance</td>
                            <td>Hari Babu Madduluri</td>
                            <td>Delivery</td>
                            <td class="center">10-05-2021</td>
                            <td class="center">08-05-2021</td>
                            <td class="completed">completed</td>
                            <td class="center user_actions">
                                <img src="../assets/images/delete.svg" width="12px" alt="delete" />
                            </td>
                        </tr>

                        <tr>
                            <td class="center">10</td>
                            <td>Alliance</td>
                            <td>Hari Babu Madduluri</td>
                            <td>Delivery</td>
                            <td class="center">10-05-2021</td>
                            <td class="center">08-05-2021</td>
                            <td class="completed">completed</td>
                            <td class="center user_actions">
                                <img src="../assets/images/delete.svg" width="12px" alt="delete" /> 
                            </td>
                        </tr>
                    </tbody>
                
                </table>
        
        </div>
            
            </div>
        </main>
    </div>
</div>

        </div>
    )
}

export default AdminDashboard
