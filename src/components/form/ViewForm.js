import React, { useState, useEffect, useRef } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Modal from 'react-modal';
import Footer from '../admin/Footer';
import editIcon from '../../assets/images/edit-icon.svg';
import axios from 'axios';
import { useLocation, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NavBar from '../admin/NavBar';
import { getApiUrl } from '../utils/helper';
import { getUser } from "../utils/userDetails";
import { superAdmin } from '../constants/constants';
import { exp3 } from '../constants/regex';

toast.configure();

function ViewForm() {
  const history = useHistory();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRestoreModalOpen, setRestoreIsModalOpen] = useState(false);
  const [userRole, setUserRole] = useState('');
  const [pset, setPset] = useState([]);


  const handleEditViewForm = () => {
    history.push('/edit/' + id);
  };

  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.current.focus();
    let user = JSON.parse(getUser());
    setUserRole(user.role)
    setPset(user.pset)
  }, []);

  const location = useLocation();
  const {
    projectNameByIT,
    projectManager,
    email,
    practice,
    status,
    id,
    deleteReason,
    securityMeasure,
    informIT,
    workStationSelected,
    devTypeSelected,
    allowedWebsite,
    isNDAsigned,
    isGDPRcompliance,
    isCyberSecConducted,
    securityBreach,
    isDisasterInsuCovered,
    disasterDetails,
    showInsuranceDetails,
    isIsolatedEnvReq,
    isolationDetails,
    showIsolatedDetails,
    isDLPreq,
    isClientEmailProvided,
    uploadedFiles,
  } = location.state;

  const [totalState, setTotalState] = useState({
    projectNameByIT,
    projectManager,
    email,
    practice,
    status,
    id,
    deleteReason,
    securityMeasure,
    informIT,
    workStationSelected,
    devTypeSelected,
    allowedWebsite,
    isNDAsigned,
    isGDPRcompliance,
    isCyberSecConducted,
    securityBreach,
    isDisasterInsuCovered,
    disasterDetails,
    showInsuranceDetails,
    isIsolatedEnvReq,
    isolationDetails,
    showIsolatedDetails,
    isDLPreq,
    isClientEmailProvided,
    reshareReason: '',
  });

  const handlePSet = (pType) => {
    if (userRole === superAdmin) {
      return false
    }
    else {
      return pset.includes(pType) ? false : true
    }
  }

  function reshareReasonInput(evt) {
    const value = evt.target.value.replace(/[^a-zA-Z0-9 ]/g, '');
    if (value.match(exp3)) {
      setTotalState({
        ...totalState,
        reshareReason: value,
      });
    } else {
      setTotalState({
        ...totalState,
        reshareReason: '',
      });
    }
  }

  function restoreReasonInput(evt) {
    setTotalState({
      ...totalState,
      restoreReason: evt.target.value,
    });
  }
  const handleApprove = () => {
    totalState.status = 'Approved';
    axios
      .post(getApiUrl(`clientInfo/approvStatus/${id}`), totalState)
      .then((res) => {
        console.log(res.data);
        toast.success('Record Approved !', {
          autoClose: 1800,
        });
      })
      .catch((err) => console.log(err.response));

    setTimeout(() => {
      history.push('/dashboard');
    }, 2000);
  };

  const handleRestore = (e) => {
    e.preventDefault();
    totalState.status = 'Submitted';
    axios
      .post(getApiUrl(`clientInfo/restoreProject/${id}`), totalState)
      .then((res) => {
        console.log(totalState);
        toast.success('Record is Restored !', {
          autoClose: 1800,
        });
        setRestoreIsModalOpen(false);
        setTotalState({ ...totalState, deleteReason: false });
      })
      .catch((err) => console.log(err.response));
  };

  const downloadFiles = (files) => {
    let index = 0;
    for (let file of files) {
      const link = document.createElement('a');
      link.href = file;
      link.target = '_blank';
      link.setAttribute('id', 'downloadFile');
      link.setAttribute('download', uploadedFiles[index]);
      document.body.appendChild(link);
      link.click();
      index += 1;
      document.getElementById('downloadFile').remove();
    }
  };

  const handleDownload = () => {
    axios.get(getApiUrl(`clientInfo/download/${id}`)).then((res) => {
      const files = res.data;
      downloadFiles(files);
    });
  };

  const handleReshare = (e) => {
    e.preventDefault();
    totalState.status = 'Pending';
    axios
      .post(getApiUrl(`clientInfo/mailReshare/${id}`), totalState)
      .then((res) => {
        console.log(res.data);
        toast.success('Record is Re-Shared !', {
          autoClose: 1800,
        });
        setIsModalOpen(false);
      })
      .catch((err) => console.log(err.response));

    setTimeout(() => {
      history.push('/dashboard');
    }, 2000);
  };

  const handleReminder = () => {
    axios
      .post(getApiUrl(`clientInfo/mailReminder/${id}`), totalState)
      .then((res) => {
        console.log(res.data);
        toast.success('Reminder has been sent!', {
          autoClose: 1800,
        });
      })
      .catch((err) => console.log(err.response));

    setTimeout(() => {
      history.push('/dashboard');
    }, 2000);
  };

  function showInsurance() {
    return showInsuranceDetails === 'true' ? (
      <div>
        <Form.Text>
          {' '}
          Details for insurance company coverage terms and insurance company
          spoc
        </Form.Text>
        <Form.Control type='text' value={disasterDetails} readOnly={true} />
      </div>
    ) : null;
  }

  function showIsolated() {
    return showIsolatedDetails === 'true' ? (
      <div>
        <Form.Text>
          {' '}
          Details of physical isolation of network, physical isolation for
          workspace, DLP etc
        </Form.Text>
        <Form.Control type='text' value={isolationDetails} readOnly={true} />
      </div>
    ) : null;
  }

  function statusSub() {
    return status === 'Submitted' ? (
      <Button
        onClick={() => {
          setIsModalOpen(true);
        }}
        className='reshare'
        style={{
          marginBottom: '20px',
          marginTop: '20px',
          marginRight: '15px',
          width: '130px',
        }}
        disabled={handlePSet("reshareProjectForm")}
      >
        {' '}
        Reshare
      </Button>
    ) : null;
  }

  function statusSubmitted() {
    return status === 'Submitted' ? (
      <Button
        variant='primary'
        onClick={() => {
          handleApprove();
        }}
        className='approve'
        style={{
          marginBottom: '20px',
          marginTop: '20px',
          marginRight: '15px',
          width: '130px',
        }}
        disabled = {handlePSet("approve")}
      >
        {' '}
        Approve
      </Button>
    ) : null;
  }

  function statusDel() {
    return status === 'Deleted' ? (
      <Button
        className='reshare'
        onClick={() => history.push('/dashboard')}
        ref={inputRef}
        style={{
          marginBottom: '20px',
          marginTop: '20px',
          marginRight: '15px',
          width: '130px',
        }}
      >
        {' '}
        Close
      </Button>
    ) : null;
  }

  function statusDeleted() {
    return status === 'Deleted' ? (
      <Button
        className='approve'
        onClick={() => setRestoreIsModalOpen(true)}
        style={{
          marginBottom: '20px',
          marginTop: '20px',
          width: '130px',
        }}
      >
        {' '}
        Restore
      </Button>
    ) : null;
  }

  function statusApproved() {
    return status === 'Approved' ? (
      <Button
        className='reshare'
        onClick={() => history.push('/dashboard')}
        ref={inputRef}
        style={{
          marginBottom: '20px',
          marginTop: '20px',
          marginRight: '15px',
          width: '130px',
        }}
      >
        {' '}
        Close
      </Button>
    ) : null;
  }

  const modalClose = () => {
    setIsModalOpen(false);
    setTotalState({
      ...totalState,
      reshareReason: '',
    });
  }

  return (
    <div>
      <NavBar />
      <div>
        <Modal
          isOpen={isRestoreModalOpen}
          onRequestClose={() => {
            setIsModalOpen(false);
          }}
          className='modalDesign deleteModal'
        >
          <h2>Restore the project</h2>
          <button
            className='_modal-close'
            onClick={() => {
              setRestoreIsModalOpen(false);
            }}
          >
            <svg className='_modal-close-icon' viewBox='0 0 40 40'>
              <path d='M 10,10 L 30,30 M 30,10 L 10,30' />
            </svg>
          </button>
          <form>
            <p>Please enter why you want to restore the record.</p>
            <textarea
              type='text'
              autoFocus={true}
              style={{
                color: 'black',
                marginTop: '20px',
                marginBottom: '60px',
              }}
              onChange={restoreReasonInput}
              name='restoreReason'
            />

            <div className='row'>
              <div className='col-md-6 text-right padding0'>
                <button
                  className='form-control btn btn-primary'
                  onClick={() => {
                    setRestoreIsModalOpen(false);
                  }}
                >
                  Cancel
                </button>
              </div>
              <div className='col-md-6'>
                {totalState.restoreReason ? (
                  <button
                    onClick={handleRestore}
                    className='form-control btn btn-primary delete-btn'
                  >
                    Restore
                  </button>
                ) : (
                  <button
                    className='form-control btn btn-primary delete-btn'
                    disabled
                  >
                    Reshare
                  </button>
                )}
              </div>
            </div>
          </form>
        </Modal>
      </div>
      <div>
        <Modal
          isOpen={isModalOpen}
          onRequestClose={() => {
            setIsModalOpen(false);
          }}
          className='modalDesign deleteModal'
        >
          <h2>Request to re-submit the form</h2>
          <button
            className='_modal-close'
            onClick={() => modalClose()}
          >
            <svg className='_modal-close-icon' viewBox='0 0 40 40'>
              <path d='M 10,10 L 30,30 M 30,10 L 10,30' />
            </svg>
          </button>
          <form>
            <p>Please enter the data which is incomplete.</p>
            <textarea
              type='text'
              autoFocus={true}
              style={{
                color: 'black',
                marginTop: '20px',
                marginBottom: '60px',
              }}
              onChange={reshareReasonInput}
              name='reshareReason'
            />

            <div className='row'>
              <div className='col-md-6 text-right padding0'>
                <button
                  className='form-control btn btn-primary'
                  onClick={() => modalClose()}
                >
                  Cancel
                </button>
              </div>
              <div className='col-md-6'>
                {totalState.reshareReason ? (
                  <button
                    onClick={handleReshare}
                    className='form-control btn btn-primary delete-btn'
                  >
                    Reshare
                  </button>
                ) : (
                  <button
                    className='form-control btn btn-primary delete-btn'
                    disabled
                  >
                    Reshare
                  </button>
                )}
              </div>
            </div>
          </form>
        </Modal>
      </div>
      <div className='custom-scroll'>
        <Container>
          <Row>
            <Col md={{ span: 8, offset: 2 }}>
              <div
                style={{ width: '700px' }}
                className='project-details-form formView'
              >
                <h2> Project Details </h2>

                <button
                  className='edit-button'
                  onClick={() => {
                    handleEditViewForm();
                  }}
                  disabled = {handlePSet("editForm")}
                >
                  <img src={editIcon} alt='edit icon' />
                </button>
                <button
                  className='modal-closeBtn'
                  onClick={() => history.push('/dashboard')}
                >
                  <svg className='_modal-close-icon' viewBox='0 0 40 40'>
                    <path d='M 10,10 L 30,30 M 30,10 L 10,30' />
                  </svg>
                </button>

                {status !== 'Pending' ? (
                  <Form>
                    <Form.Group style={{ marginBottom: '0' }}>
                      {totalState.deleteReason &&
                        totalState.status !== 'Submitted' && (
                          <div>
                            <Form.Label
                              style={{ color: 'red', marginTop: '20px' }}
                            >
                              This project has been Deleted because
                            </Form.Label>

                            <Form.Control
                              type='text'
                              value={deleteReason}
                              readOnly
                            />
                          </div>
                        )}

                      {totalState.restoreReason && (
                        <div>
                          <Form.Label
                            style={{ color: 'blue', marginTop: '40px' }}
                          >
                            This project has been Restored back because
                          </Form.Label>

                          <Form.Control
                            type='text'
                            value={totalState.restoreReason}
                            readOnly
                          />
                        </div>
                      )}
                    </Form.Group>

                    <Form.Group style={{ marginBottom: '40px' }}>
                      <Form.Label>Name of the project or client</Form.Label>
                      <Form.Control
                        type='text'
                        value={totalState.projectNameByIT}
                        readOnly
                      />
                    </Form.Group>

                    <Form.Group style={{ marginBottom: '40px' }}>
                      <Form.Label>
                        Security measures from client side
                      </Form.Label>
                      <Form.Control
                        type='text'
                        value={totalState.securityMeasure}
                        readOnly
                      />
                    </Form.Group>

                    <Form.Group style={{ marginBottom: '40px' }}>
                      <Form.Label>
                        Information to IT at the time of project kick-off
                      </Form.Label>
                      <Form.Control
                        type='text'
                        value={totalState.informIT}
                        readOnly
                      />
                    </Form.Group>

                    <Form.Group style={{ marginBottom: '40px' }}>
                      <Form.Label>
                        Work stations type provided in Evoke{' '}
                      </Form.Label>
                      <Form.Group style={{ marginBottom: '30px' }}>
                        <Button
                          size='sm'
                          style={{ width: '100px' }}
                          ref={inputRef}
                        >
                          {workStationSelected}
                        </Button>
                      </Form.Group>
                    </Form.Group>

                    <Form.Group style={{ marginBottom: '40px' }}>
                      <Form.Label> Development type </Form.Label>
                      <Form.Group style={{ marginBottom: '30px' }}>
                        <Button
                          size='sm'
                          style={{ width: 'auto' }}
                          className='dev-btn'
                        >
                          {devTypeSelected}
                        </Button>
                      </Form.Group>
                    </Form.Group>

                    <Form.Group style={{ marginBottom: '40px' }}>
                      <Form.Label>Websites need to be allowed</Form.Label>
                      <Form.Control
                        type='text'
                        value={allowedWebsite}
                        readOnly={true}
                      />
                    </Form.Group>

                    <Form.Group style={{ marginBottom: '40px' }}>
                      <Form.Label>
                        NDA/DPA (Data Privacy Agreement) signed ?{' '}
                      </Form.Label>
                      <Form.Group style={{ marginBottom: '30px' }}>
                        <Button size='sm' style={{ width: '80px' }}>
                          {isNDAsigned}
                        </Button>
                      </Form.Group>
                    </Form.Group>

                    <Form.Group style={{ marginBottom: '40px' }}>
                      <Form.Label>
                        Did all the project related documents (security, GDPR
                        compliance and MSA) are collected from client ?{' '}
                      </Form.Label>
                      <Form.Group style={{ marginBottom: '30px' }}>
                        <Button size='sm' style={{ width: '80px' }}>
                          {isGDPRcompliance}
                        </Button>
                      </Form.Group>
                    </Form.Group>

                    <Form.Group style={{ marginBottom: '40px' }}>
                      <Form.Label>
                        Cyber security induction meeting conducted with client
                        as well as in house (importance of data security to
                        followed by all users) ?{' '}
                      </Form.Label>
                      <Form.Group style={{ marginBottom: '30px' }}>
                        <Button size='sm' style={{ width: '80px' }}>
                          {isCyberSecConducted}
                        </Button>
                      </Form.Group>
                    </Form.Group>

                    <Form.Group style={{ marginBottom: '40px' }}>
                      <Form.Label>
                        Any project risks identified in the course of interims
                        of security breach or calamities ?
                      </Form.Label>
                      <Form.Control
                        type='text'
                        value={securityBreach}
                        readOnly={true}
                      />
                    </Form.Group>

                    <Form.Group style={{ marginBottom: '40px' }}>
                      <Form.Label>
                        Insurance coverage in case of disaster issues ?{' '}
                      </Form.Label>
                      <Form.Group style={{ marginBottom: '30px' }}>
                        <Button
                          size='sm'
                          style={{
                            width: '80px',
                            marginBottom: '20px',
                          }}
                        >
                          {isDisasterInsuCovered}
                        </Button>
                        {showInsurance()}
                      </Form.Group>
                    </Form.Group>

                    <Form.Group style={{ marginBottom: '40px' }}>
                      <Form.Label>
                        {' '}
                        Does client need any isolated environment requirement ?{' '}
                      </Form.Label>
                      <Form.Group style={{ marginBottom: '30px' }}>
                        <Button
                          size='sm'
                          style={{ width: '80px', marginBottom: '20px' }}
                        >
                          {isIsolatedEnvReq}
                        </Button>
                        {showIsolated()}
                      </Form.Group>
                    </Form.Group>

                    <Form.Group style={{ marginBottom: '40px' }}>
                      <Form.Label>
                        Does client require DLP/Encryption enabled laptops for
                        their users ?{' '}
                      </Form.Label>
                      <Form.Group style={{ marginBottom: '30px' }}>
                        <Button size='sm' style={{ width: '80px' }}>
                          {isDLPreq}
                        </Button>
                      </Form.Group>
                    </Form.Group>

                    <Form.Group style={{ marginBottom: '0px' }}>
                      <Form.Label>
                        Is client providing Email services to user for regular
                        business communication ?{' '}
                      </Form.Label>
                      <Form.Group style={{ marginBottom: '20px' }}>
                        <Button size='sm' style={{ width: '80px' }}>
                          {isClientEmailProvided}
                        </Button>
                      </Form.Group>
                    </Form.Group>

                    <Form.Group style={{ marginBottom: '40px' }}>
                      <Form.Label> Download the Files attached </Form.Label>
                      <Button
                        style={{
                          width: '120px',
                          fontSize: '14px',
                          lineHeight: '19px',
                          marginLeft: '10px',
                        }}
                        onClick={handleDownload}
                        className='download-btn'
                      >
                        Download
                      </Button>
                    </Form.Group>
                    {statusSub()}

                    {statusSubmitted()}

                    {statusDel()}

                    {statusDeleted()}

                    {statusApproved()}
                  </Form>
                ) : (
                  <span>
                    <Form.Group style={{ marginTop: '120px' }}>
                      <Form.Label>
                        The project details have not been submitted by the{' '}
                        <b> {projectManager} </b> yet. <br />
                        <br />
                        Would you like to send a gentle reminder?
                      </Form.Label>
                    </Form.Group>

                    <Button
                      className='reshare'
                      onClick={() => history.push('/dashboard')}
                      ref={inputRef}
                      style={{
                        marginBottom: '90px',
                        marginTop: '80px',
                        marginRight: '15px',
                        width: '130px',
                      }}
                    >
                      {' '}
                      Close
                    </Button>

                    <Button
                      className='reshare active-reminder'
                      ref={inputRef}
                      style={{
                        marginBottom: '90px',
                        marginTop: '80px',
                        marginRight: '15px',
                        width: '130px',
                      }}
                      disabled={handlePSet("sendRemainder")}
                      onClick={() => {
                        handleReminder();
                      }}
                    >
                      {' '}
                      Reminder
                    </Button>
                  </span>
                )}

              </div>
            </Col>
          </Row>
        </Container>
      </div>
      <Footer />
    </div>
  );
}

export default ViewForm;
