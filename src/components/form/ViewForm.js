import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Logo from "../../assets/images/eoke_logo.svg";

import "./ClinetForm.css";
import { useLocation } from "react-router-dom";

function ViewForm() {

  const location = useLocation();
  const {
    projectNameByIT,
    projectManager,
    // email,
    practice,
    status,
    // projectName,
    securityMeasure,
    // informIT,
    workStationSelected,
    // devTypeSelected,
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
  } = location.state;

  return (
    <div className="Comp_Wrapper">
      <div className="navbar navbar-dark sticky-top flex-md-nowrap p-0 shadow header_nav">
        <a className="navbar-brand col-md-3 col-lg-2 me-0 px-3" href="#/">
          <img src={Logo} alt="Evoke Logo" />
        </a>
      </div>
      

      <Container>
        <Row>
          <Col md={{ span: 6, offset: 2 }}>
            <br />
            <br />
            <div style={{ marginBottom: "10px" }}>
              {" "}
              <h2> Project Details </h2>
            </div>{" "}
            <br />
            <div style={{ width: "700px" }}>
              <Form>
                <Form.Group style={{ marginBottom: "40px" }}>
                  <Form.Label>Name of the project or client</Form.Label>
                  <Form.Control
                    type="text"
                    name="projectName"
                    value={projectNameByIT}
                    readOnly = {true} 
                  />
                </Form.Group>

                <Form.Group style={{ marginBottom: "40px" }}>
                  <Form.Label>Security measures from client side</Form.Label>
                  <Form.Control
                    type="text"
                    name="securityMeasure"
                    value={securityMeasure}
                    readOnly = {true} 
                  />
                </Form.Group>

                <Form.Group style={{ marginBottom: "40px" }}>
                  <Form.Label>
                    Information to IT at the time of project kick-off
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="informIT"
                    // value={informIT}
                    value={projectManager}
                    readOnly = {true} 
                  />
                </Form.Group>

                <Form.Group style={{ marginBottom: "40px" }}>
                  <Form.Label>Work stations type provided in Evoke </Form.Label>
                  <Form.Group style={{ marginBottom: "30px" }}>
                    <Button
                    // size="sm"
                    // value={workStationSelected}
                    // style={{ marginRight: "15px", width: "120px" }}
                    >
                      {workStationSelected}
                    </Button>
                  </Form.Group>
                </Form.Group>

                <Form.Group style={{ marginBottom: "40px" }}>
                  <Form.Label> Development type </Form.Label>
                  <Form.Group style={{ marginBottom: "30px" }}>
                    <Button
                    // size="sm"
                    // style={{ marginRight: "15px", width: "80px" }}
                    >
                      {/* {devTypeSelected} */}
                      {practice}
                    </Button>
                  </Form.Group>
                </Form.Group>

                <Form.Group style={{ marginBottom: "40px" }}>
                  <Form.Label>Websites need to be allowed</Form.Label>
                  <Form.Control
                    type="text"
                    name="allowedWebsite"
                    value={allowedWebsite}
                    readOnly = {true} 
                  />
                </Form.Group>

                <Form.Group style={{ marginBottom: "40px" }}>
                  <Form.Label>
                    NDA/DPA (Data Privacy Agreement) signed ?{" "}
                  </Form.Label>
                  <Form.Group style={{ marginBottom: "30px" }}>
                    <Button
                      size="sm"
                      name="Yes"
                      value={isNDAsigned}
                      style={{ width: "80px" }}
                    >
                      {status}
                      {/* {isNDAsigned} */}
                    </Button>
                  </Form.Group>
                </Form.Group>

                <Form.Group style={{ marginBottom: "40px" }}>
                  <Form.Label>
                    Did all the project related documents (security, GDPR
                    complaiance and MSA) are collected from client ?{" "}
                  </Form.Label>
                  <Form.Group style={{ marginBottom: "30px" }}>
                    <Button
                      size="sm"
                      name="Yes"
                      value={isGDPRcompliance}
                      style={{ marginRight: "15px", width: "80px" }}
                    >
                      {isGDPRcompliance}
                    </Button>
                  </Form.Group>
                </Form.Group>

                <Form.Group style={{ marginBottom: "40px" }}>
                  <Form.Label>
                    Cyber security induction meeting conducted with client as
                    well as in house (importance of data security to followed by
                    all users) ?{" "}
                  </Form.Label>
                  <Form.Group style={{ marginBottom: "30px" }}>
                    <Button
                      size="sm"
                      // variant={CyberSecConductedFirst}
                      name="Yes"
                      // value={CyberSecConductedFirst}
                      style={{ width: "80px" }}
                    >
                      {isCyberSecConducted}
                    </Button>
                  </Form.Group>
                </Form.Group>

                <Form.Group style={{ marginBottom: "40px" }}>
                  <Form.Label>
                    Any project risks identified in the course of interims of
                    security breach or calamities ?
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="securityBreach"
                    value={securityBreach}
                    readOnly = {true}
                  />
                </Form.Group>

                <Form.Group style={{ marginBottom: "40px" }}>
                  <Form.Label>
                    Insurance coverage in case of disater issues ?{" "}
                  </Form.Label>
                  <Form.Group style={{ marginBottom: "30px" }}>
                    <Button
                      size="sm"
                      // variant={DisasterInsuCoveredFirst}
                      name="Yes"
                      // value={DisasterInsuCoveredFirst}
                      style={{
                        marginRight: "15px",
                        marginBottom: "15px",
                        width: "80px",
                      }}
                    >
                      {isDisasterInsuCovered}
                    </Button>

                    {showInsuranceDetails && (
                      <div>
                        <Form.Text
                          className="text-muted"
                          style={{ marginLeft: "20px" }}
                        >
                          {" "}
                          Details for insurance company coverage terms and
                          insurance company spoc
                        </Form.Text>
                        <Form.Control
                          type="text"
                          style={{ marginLeft: "20px", width: "97%" }}
                          name="disasterDetails"
                          value={disasterDetails}
                          readOnly = {true}
                        />
                      </div>
                    )}
                  </Form.Group>
                </Form.Group>

                <Form.Group style={{ marginBottom: "40px" }}>
                  <Form.Label>
                    {" "}
                    Does client need any isolated environment requirement ?{" "}
                  </Form.Label>
                  <Form.Group style={{ marginBottom: "30px" }}>
                    <Button
                      size="sm"
                      // variant={IsolatedEnvReqFirst}
                      name="Yes"
                      // value={IsolatedEnvReqFirst}
                      style={{
                        marginRight: "15px",
                        marginBottom: "15px",
                        width: "80px",
                      }}
                    >
                      {isIsolatedEnvReq}
                    </Button>

                    {showIsolatedDetails && (
                      <div>
                        <Form.Text
                          className="text-muted"
                          style={{ marginLeft: "20px" }}
                        >
                          {" "}
                          Details of physical isolation of network, physical
                          isolation for workspace, DLP etc
                        </Form.Text>
                        <Form.Control
                          type="text"
                          name="isolationDetails"
                          value={isolationDetails}
                          style={{ marginLeft: "20px", width: "97%" }}
                          readOnly = {true} 
                        />
                      </div>
                    )}
                  </Form.Group>
                </Form.Group>

                <Form.Group style={{ marginBottom: "40px" }}>
                  <Form.Label>
                    Does client require DLP/Encryption enabled laptops for their
                    users ?{" "}
                  </Form.Label>
                  <Form.Group style={{ marginBottom: "30px" }}>
                    <Button
                      size="sm"
                      // variant={DLPreqFirst}
                      name="Yes"
                      // value={DLPreqFirst}
                      style={{ marginRight: "15px", width: "80px" }}
                    >
                      {isDLPreq}
                    </Button>
                  </Form.Group>
                </Form.Group>

                <Form.Group style={{ marginBottom: "40px" }}>
                  <Form.Label>
                    Is client providing Email services to user for regular
                    business communication ?{" "}
                  </Form.Label>
                  <Form.Group style={{ marginBottom: "60px" }}>
                    <Button
                      size="sm"
                      // variant={ClientEmailProvidedFirst}
                      name="Yes"
                      // value={ClientEmailProvidedFirst}
                      style={{ marginRight: "15px", width: "80px" }}
                    >
                      {isClientEmailProvided}
                    </Button>
                  </Form.Group>
                </Form.Group>
              </Form>

              <Button
                variant="danger"
                onClick={() => window.location.reload()}
                style={{
                  marginBottom: "80px",
                  marginLeft: "190px",
                  marginRight: "15px",
                  width: "130px",
                }}
              >
                {" "}
                Reset
              </Button>

              <Button
                variant="primary"
                // onClick={handleSubmit}
                style={{
                  marginBottom: "80px",
                  marginLeft: "20px",
                  marginRight: "15px",
                  width: "130px",
                }}
              >
                {" "}
                Submit
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default ViewForm;