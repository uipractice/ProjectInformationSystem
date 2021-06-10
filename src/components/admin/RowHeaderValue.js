import React from 'react'

function RowHeaderValue({count, projectStatus, iconImg}) {
    
    return (             
        <div className="col-md-3 col-lg-3"> 
            <div className="card card-hover-shadow card_tile" >
                <div className="card-body">
                    <div className="row">            
                        <div className="col-md-9">
                            <div className="count">{count}</div>
                            <div className="count_text">{projectStatus}</div>
                        </div>
                        <div className="col-md-3 card_icon">
                            <img src={iconImg} alt="Icon" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RowHeaderValue
