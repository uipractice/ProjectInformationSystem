import React, { useState, useEffect } from 'react';
import RowHeaderValue from './RowHeaderValue';
import ShareButtonSection from './ShareButtonSection';
import Footer from './Footer';
import CompleteTable from '../table/CompleteTable';
import axios from 'axios';
import IconSubmitted from '../../assets/images/Icon_submitted.svg';
import IconPending from '../../assets/images/Icon_Pending.svg';
import IconApproved from '../../assets/images/Icon_approved.svg';
import IconProjects from '../../assets/images/Icon_Projects.svg';
import IconActive from '../../assets/images/active.svg';
import NavBar from './NavBar';
import { getApiUrl } from '../utils/helper';
import InternalClient from './InternalClient';
import { superAdmin } from '../constants/constants';
import { getUser } from "../utils/userDetails";

export default function AdminDashboard() {
  const [data, setData] = useState([]);
  const [totalCount, setTotalCount] = useState('');
  const [pendingCount, setPendingCount] = useState('');
  const [approvedCount, setApprovedCount] = useState('');
  const [submittedCount, setSubmittedCount] = useState('');
  const [activeCount, setActiveCount] = useState('');
  const [deleteCount, setDeleteCount] = useState('');
  const [showInternalProject, setShowInternalProject] = useState(false);
  const [showClientProject, setShowClientProject] = useState(true);
  console.log(JSON.parse(getUser()).role)
  useEffect(() => {
    axios(getApiUrl(`clientInfo`))
      .then((res) => {
        setData(res.data);
        setTotalCount(res.data.length);
        setActiveCount(res.data.length - deleteCount);
        setPendingCount(
          res.data.reduce(function (n, person) {
            return n + (person.status === 'Pending');
          }, 0)
        );
        setSubmittedCount(
          res.data.reduce(function (n, person) {
            return n + (person.status === 'Submitted');
          }, 0)
        );
        setDeleteCount(
          res.data.reduce(function (n, person) {
            return n + (person.status === 'Deleted');
          }, 0)
        );
        setApprovedCount(
          res.data.reduce(function (n, person) {
            return n + (person.status === 'Approved');
          }, 0)
        );
      })
      .catch((err) => console.log(err));
  }, [deleteCount, showClientProject, showInternalProject]);

  const showInternalContent = (client, internal) => {
    if (client) {
      setShowClientProject(client);
      setShowInternalProject(internal);
    } else if (internal) {
      setShowInternalProject(internal);
      setShowClientProject(client);
    }
  };
  return (
    <div>
      <NavBar validate={true} />
      <div className='container-fluid'>
        <div className='row'>
          <div className='col-md-12 ms-sm-auto col-lg-12 custom-scroll'>
             {JSON.parse(getUser()).role=== superAdmin && 
                        <ShareButtonSection
                        showInternalView={(client, internal) =>
                          showInternalContent(client, internal)
                        }
                        internal={showInternalProject}
                        client={showClientProject}
                      />
            } 

            {showClientProject && !showInternalProject && (
              <div className='row'>
                <RowHeaderValue
                  projectStatus='Projects'
                  iconImg={IconProjects}
                  className='totalCount'
                  count={totalCount}
                />
                <RowHeaderValue
                  projectStatus='Active'
                  iconImg={IconActive}
                  className='activeCount'
                  count={activeCount}
                />

                <RowHeaderValue
                  projectStatus='Submitted'
                  iconImg={IconSubmitted}
                  className='submitCount'
                  count={submittedCount}
                />
                <RowHeaderValue
                  projectStatus='Approved'
                  iconImg={IconApproved}
                  className='completCount'
                  count={approvedCount}
                />
                <RowHeaderValue
                  projectStatus='Pending'
                  iconImg={IconPending}
                  className='pendingCount'
                  count={pendingCount}
                />
              </div>
            )}
            {showClientProject && !showInternalProject && (
              <CompleteTable data={data} />
            )}
            {showInternalProject && <InternalClient />}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
