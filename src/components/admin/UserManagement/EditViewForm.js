import React, { useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField'
import { commonTeams } from '../../common/commonTeams';

toast.configure();

function EditViewForm({ isOpen, closeModal, data }) {
  const [teams, setTeams] = useState(commonTeams)

  useEffect(() => {
    commonTeams.forEach((team) => {
      team.label = team.label + ' Team'
    })
    setTeams(commonTeams)
  }, []);

  function SubmitButton() {
    return (
      <Button
        variant='primary'
        className='submit-btn'
        style={{
          marginTop: '20px',
          marginBottom: '20px',
          width: '130px',
        }}
      >
        Update
      </Button>
    );

  }
  return (
    <Modal
      centered
      style={{ borderRadius: '0 !important' }}
      show={isOpen}
      backdrop='static'
      onHide={() => closeModal()}
      className='modalDesign deleteModal'
    >
      <div className='custom-scroll'>
        <Container>
          <Row>
            <Col md={{ span: 8, offset: 2 }}>
              <div style={{ width: '700px' }} className='project-details-form'>
                <h2> Project Details </h2>
                <button
                  className='modal-closeBtn'
                >
                  <svg className='_modal-close-icon' viewBox='0 0 40 40'>
                    <path d='M 10,10 L 30,30 M 30,10 L 10,30' />
                  </svg>
                </button>
                <Modal.Body>
                  <Form>
                    <Form.Group style={{ marginBottom: '40px' }}>
                      <Form.Label>User Name</Form.Label>
                      <Form.Control
                        value={data.userName}
                      />
                    </Form.Group>

                    <Form.Group style={{ marginBottom: '40px' }}>
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        value={data.password}
                        autoFocus
                      />
                    </Form.Group>

                    <Form.Group style={{ marginBottom: '40px' }}>
                      <Form.Label>
                        Email Address
                      </Form.Label>
                      <Form.Control
                        value={data.emailId}
                      />
                    </Form.Group>
                    <Form.Group style={{ marginBottom: '40px' }}>
                      <Form.Label>
                        Contact Number
                      </Form.Label>
                      <Form.Control
                        value={data.contactNumber}
                      />
                    </Form.Group>

                    <Form.Group style={{ marginBottom: '40px' }}>
                      <Form.Label>Team * </Form.Label>
                      <Autocomplete
                        options={teams}
                        value={data.team}
                        name="team"
                        getOptionLabel={(option) => data.team && option.label ? option.label : option}
                        getOptionSelected={(option, value) => option.value === value.value}
                        renderInput={(params) =>
                          <TextField {...params} variant='outlined' name="team" />
                        }
                      />
                    </Form.Group>
                    <Form.Group style={{ marginBottom: '40px' }}>
                      <Form.Label>Status * </Form.Label>
                      <Autocomplete
                        options={[
                          { label: 'Active', value: 1 },
                          { label: 'InActive', value: 2 },
                        ]}
                        name='status'
                        value={data ? data.status : ''}
                        getOptionLabel={(option) => data.status && option.label ? option.label : option}
                        getOptionSelected={(option, value) => option.value === value.value}
                        renderInput={(params) => (
                          <TextField {...params} variant='outlined' name="status" />
                        )}
                      />
                    </Form.Group>
                    <Form.Group style={{ marginBottom: '40px' }}>
                      <Form.Label>Role * </Form.Label>
                      <Autocomplete
                        options={[
                          { label: 'Admin', value: 1 },
                          { label: 'SuperAdmin', value: 2 },
                          { label: 'Guest', value: 3 },
                        ]}
                        name='role'
                        value={data ? data.role : ''}
                        getOptionLabel={(option) => data.role && option.label ? option.label : option}
                        getOptionSelected={(option, value) => option.value === value.value}
                        renderInput={(params) => (
                          <TextField {...params} variant='outlined' name="role" />
                        )}
                      />
                    </Form.Group>

                    <Button
                      onClick={() => window.location.reload()}
                      className='reshare'
                      style={{
                        marginTop: '20px',
                        marginBottom: '20px',
                        marginRight: '15px',
                        width: '130px',
                      }}
                    >
                      {' '}
                      Reset
                    </Button>

                    <SubmitButton />
                  </Form>
                </Modal.Body>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </Modal>
  );
}

export default EditViewForm;
