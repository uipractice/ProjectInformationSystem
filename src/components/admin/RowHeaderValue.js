import React from 'react'
import Score from "../../assets/images/Icon_submitted.svg"

function RowHeaderValue() {
    
    return (             
        <div className="col-md-3 col-lg-3"> 
            <div className="card card-hover-shadow card_tile" >
                <div className="card-body">
                    <div className="row">            
                        <div className="col-md-9">
                            <div className="count">130</div>
                            <div className="count_text">Submitted</div>
                        </div>
                        <div className="col-md-3 card_icon">
                            <img src={Score} alt="Icon" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RowHeaderValue
