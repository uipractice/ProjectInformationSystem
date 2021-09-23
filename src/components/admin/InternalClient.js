import React from 'react';
import Footer from './Footer';
import internalImage from '../../assets/images/internal-project.png';

function InternalClient() {
  return (
    <div>
      <div className='container-fluid'>
        <div className='row'>
          <div className='col-md-12 ms-sm-auto col-lg-12 internal-sec text-center'>
            <img src={internalImage} />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
export default InternalClient;
