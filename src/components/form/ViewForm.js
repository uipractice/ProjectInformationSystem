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
  } = location.state;


  return (
    <div className="Comp_Wrapper">
      <div className="navbar navbar-dark sticky-top flex-md-nowrap p-0 shadow header_nav">
        <div className="row">
          <a
            className="navbar-brand col-md-6 px-4"
            href="http://localhost:3000/admin"
          >
            <img src={Logo} alt="Evoke Technologies" />
          </a>
          <h3>Project Information System </h3>
        </div>
        <ul className="navbar-nav px-3">
          <li className="nav-item text-nowrap">
            <button></button>
          </li>
        </ul>
      </div>

      <Container>
        <Row>
          <Col md={{ span: 6, offset: 2 }}>
           
            <div style={{ width: "700px" }} className="project-details-form formView">
            <h2> Project Details </h2>
              <Form>
                <Form.Group style={{ marginBottom: "40px" }}>
                  <Form.Label>Name of the project or client</Form.Label>
                  <Form.Control
                    type="text"
                    value={projectNameByIT}
                    readOnly={true}
                  />
                </Form.Group>

                <Form.Group style={{ marginBottom: "40px" }}>
                  <Form.Label>Security measures from client side</Form.Label>
                  <Form.Control
                    type="text"
                    value={securityMeasure}
                    readOnly={true}
                  />
                </Form.Group>

                <Form.Group style={{ marginBottom: "40px" }}>
                  <Form.Label>
                    Information to IT at the time of project kick-off
                  </Form.Label>
                  <Form.Control type="text" value={informIT} readOnly={true} />
                </Form.Group>

                <Form.Group style={{ marginBottom: "40px" }}>
                  <Form.Label>Work stations type provided in Evoke </Form.Label>
                  <Form.Group style={{ marginBottom: "30px" }}>
                    <Button size="sm" style={{ width: "120px" }}>
                      {workStationSelected}
                    </Button>
                  </Form.Group>
                </Form.Group>

                <Form.Group style={{ marginBottom: "40px" }}>
                  <Form.Label> Development type </Form.Label>
                  <Form.Group style={{ marginBottom: "30px" }}>
                    <Button size="sm" style={{ width: "auto" }} className="dev-btn">
                      {devTypeSelected}
                    </Button>
                  </Form.Group>
                </Form.Group>

                <Form.Group style={{ marginBottom: "40px" }}>
                  <Form.Label>Websites need to be allowed</Form.Label>
                  <Form.Control
                    type="text"
                    value={allowedWebsite}
                    readOnly={true}
                  />
                </Form.Group>

                <Form.Group style={{ marginBottom: "40px" }}>
                  <Form.Label>
                    NDA/DPA (Data Privacy Agreement) signed ?{" "}
                  </Form.Label>
                  <Form.Group style={{ marginBottom: "30px" }}>
                    <Button size="sm" style={{ width: "95px" }}>
                      {isNDAsigned}
                    </Button>
                  </Form.Group>
                </Form.Group>

                <Form.Group style={{ marginBottom: "40px" }}>
                  <Form.Label>
                    Did all the project related documents (security, GDPR
                    complaiance and MSA) are collected from client ?{" "}
                  </Form.Label>
                  <Form.Group style={{ marginBottom: "30px" }}>
                    <Button size="sm" style={{ width: "95px" }}>
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
                    <Button size="sm" style={{ width: "95px" }}>
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
                    value={securityBreach}
                    readOnly={true}
                  />
                </Form.Group>

                <Form.Group style={{ marginBottom: "40px" }}>
                  <Form.Label>
                    Insurance coverage in case of disater issues ?{" "}
                  </Form.Label>
                  <Form.Group style={{ marginBottom: "30px" }}>
                    <Button
                      size="sm"
                      style={{
                        width: "95px",
                        marginBottom: "20px",
                      }}
                    >
                      {isDisasterInsuCovered}
                    </Button>

                    {showInsuranceDetails === "true" ? (
                      <div>
                        <Form.Text>
                          {" "}
                          Details for insurance company coverage terms and
                          insurance company spoc
                        </Form.Text>
                        <Form.Control
                          type="text"
                          value={disasterDetails}
                          readOnly={true}
                        />
                      </div>
                    ) : null}
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
                      style={{ width: "95px", marginBottom: "20px" }}
                    >
                      {isIsolatedEnvReq}
                    </Button>

                    {showIsolatedDetails === "true" ? (
                      <div>
                        <Form.Text>
                          {" "}
                          Details of physical isolation of network, physical
                          isolation for workspace, DLP etc
                        </Form.Text>
                        <Form.Control
                          type="text"
                          value={isolationDetails}
                          readOnly={true}
                        />
                      </div>
                    ) : null}
                  </Form.Group>
                </Form.Group>

                <Form.Group style={{ marginBottom: "40px" }}>
                  <Form.Label>
                    Does client require DLP/Encryption enabled laptops for their
                    users ?{" "}
                  </Form.Label>
                  <Form.Group style={{ marginBottom: "30px" }}>
                    <Button size="sm" style={{ width: "95px" }}>
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
                    <Button size="sm" style={{ width: "95px" }}>
                      {isClientEmailProvided}
                    </Button>
                  </Form.Group>
                </Form.Group>
              </Form>

              <Button
                variant="danger"
                onClick={() => window.location.reload()}
                className="reshare"
                style={{
                  marginBottom: "40px",
                  marginRight: "15px",
                  width: "130px",
                }}
              >
                {" "}
                Reshare
              </Button>

              <Button
                variant="primary"
                // onClick={handleSubmit}
                className="approve"
                style={{
                  marginBottom: "40px",
                  marginRight: "15px",
                  width: "130px",
                }}
              >
                {" "}
                Approve
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default ViewForm;
