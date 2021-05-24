import React from 'react'
import RowHeaderValue from './RowHeaderValue'
import ShareButtonSection from './ShareButtonSection'
import TableBodyData from './TableBodyData'

import Logo from "../../assets/images/eoke_logo.svg" 
import User from "../../assets/images/user.svg"



export default function AdminDashboard() {

    return (
        <div>
            
            <div className="navbar navbar-dark sticky-top flex-md-nowrap p-0 shadow header_nav">
                <a className="navbar-brand col-md-3 col-lg-2 me-0 px-3" href="https://www.evoketechnologies.com/">
                    <img src={Logo} alt="Evoke Technologies" />
                </a>
                
                <ul className="navbar-nav px-3">
                    <li className="nav-item text-nowrap">
                    <a className="nav-link" href="https://www.evoketechnologies.com/">
                        <img src={User} alt="user"/>
                    </a>
                    </li>
                </ul>
            </div>

        
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12 ms-sm-auto col-lg-12">
                    
                        <ShareButtonSection/>

                        <div className="row">
                            <RowHeaderValue/>
                            <RowHeaderValue/>
                            <RowHeaderValue/>
                            <RowHeaderValue/>
                        </div>

                        <TableBodyData/>
                        
                    </div>
                </div>
            </div>
        </div>
    )
}
