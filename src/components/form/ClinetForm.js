import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Logo from "../../assets/images/eoke_logo.svg";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();

function ClinetForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { id } = useParams();
  console.log(id);

  const [state, setState] = React.useState({
    projectName: "",

    securityMeasure: "",

    informIT: "",

    workStationValue: ["laptop", "VM", "cloud"],
    workStationFirstBtn: "outline-info",
    workStationSecondBtn: "outline-info",
    workStationThirdBtn: "outline-info",
    workStationSelected: "",

    devTypeValue: ["Local", "Cloud Plateform", "Client Plateform"],
    devTypeFirstBtn: "outline-info",
    devTypeSecondBtn: "outline-info",
    devTypeThirdBtn: "outline-info",
    devTypeSelected: "",

    allowedWebsite: "",

    isNDAsigned: "",
    NDAsignedFirst: "outline-info",
    NDAsignedSecond: "outline-info",

    isGDPRcompliance: "",
    GDPRcomplianceFirst: "outline-info",
    GDPRcomplianceSecond: "outline-info",

    isCyberSecConducted: "",
    CyberSecConductedFirst: "outline-info",
    CyberSecConductedSecond: "outline-info",

    securityBreach: "",

    isDisasterInsuCovered: "",
    DisasterInsuCoveredFirst: "outline-info",
    DisasterInsuCoveredSecond: "outline-info",
    disasterDetails: "",
    showInsuranceDetails: false,

    isIsolatedEnvReq: "",
    IsolatedEnvReqFirst: "outline-info",
    IsolatedEnvReqSecond: "outline-info",
    isolationDetails: "",
    showIsolatedDetails: false,

    isDLPreq: "",
    DLPreqFirst: "outline-info",
    DLPreqSecond: "outline-info",

    isClientEmailProvided: "",
    ClientEmailProvidedFirst: "outline-info",
    ClientEmailProvidedSecond: "outline-info",

    newStatus: "Submitted",
  });

  function handleClientEmailProvided(evt) {
    const val = evt.target.name;
    if (val === "Yes") {
      setState({
        ...state,
        ClientEmailProvidedFirst: "info",
        ClientEmailProvidedSecond: "outline-info",
        isClientEmailProvided: val,
      });
    } else if (val === "No") {
      setState({
        ...state,
        ClientEmailProvidedFirst: "outline-info",
        ClientEmailProvidedSecond: "info",
        isClientEmailProvided: val,
      });
    }
  }

  function handleDLPreq(evt) {
    const val = evt.target.name;
    if (val === "Yes") {
      setState({
        ...state,
        DLPreqFirst: "info",
        DLPreqSecond: "outline-info",
        isDLPreq: val,
      });
    } else if (val === "No") {
      setState({
        ...state,
        DLPreqFirst: "outline-info",
        DLPreqSecond: "info",
        isDLPreq: val,
      });
    }
  }

  function handleIsolatedEnvReq(evt) {
    const val = evt.target.name;
    if (val === "Yes") {
      setState({
        ...state,
        IsolatedEnvReqFirst: "info",
        IsolatedEnvReqSecond: "outline-info",
        isIsolatedEnvReq: val,
        showIsolatedDetails: true,
      });
    } else if (val === "No") {
      setState({
        ...state,
        IsolatedEnvReqFirst: "outline-info",
        IsolatedEnvReqSecond: "info",
        isIsolatedEnvReq: val,
        showIsolatedDetails: false,
      });
    }
  }

  function handleDisasterInsuCovered(evt) {
    const val = evt.target.name;
    if (val === "Yes") {
      setState({
        ...state,
        DisasterInsuCoveredFirst: "info",
        DisasterInsuCoveredSecond: "outline-info",
        isDisasterInsuCovered: val,
        showInsuranceDetails: true,
      });
    } else if (val === "No") {
      setState({
        ...state,
        DisasterInsuCoveredFirst: "outline-info",
        DisasterInsuCoveredSecond: "info",
        isDisasterInsuCovered: val,
        showInsuranceDetails: false,
      });
    }
  }

  function handleCyberSecConducted(evt) {
    const val = evt.target.name;
    if (val === "Yes") {
      setState({
        ...state,
        CyberSecConductedFirst: "info",
        CyberSecConductedSecond: "outline-info",
        isCyberSecConducted: val,
      });
    } else if (val === "No") {
      setState({
        ...state,
        CyberSecConductedFirst: "outline-info",
        CyberSecConductedSecond: "info",
        isCyberSecConducted: val,
      });
    }
  }

  function handleWorkStation(evt) {
    const val = evt.target.value;

    if (val === "laptop") {
      setState({
        ...state,
        workStationFirstBtn: "info",
        workStationSecondBtn: "outline-info",
        workStationThirdBtn: "outline-info",
        workStationSelected: val,
      });
    } else if (val === "VM") {
      setState({
        ...state,
        workStationFirstBtn: "outline-info",
        workStationSecondBtn: "info",
        workStationThirdBtn: "outline-info",
        workStationSelected: val,
      });
    } else if (val === "cloud") {
      setState({
        ...state,
        workStationFirstBtn: "outline-info",
        workStationSecondBtn: "outline-info",
        workStationThirdBtn: "info",
        workStationSelected: val,
      });
    }
  }

  function handleNDAsigned(evt) {
    const val = evt.target.name;
    if (val === "Yes") {
      setState({
        ...state,
        NDAsignedFirst: "info",
        NDAsignedSecond: "outline-info",
        isNDAsigned: "Yes",
      });
    } else if (val === "No") {
      setState({
        ...state,
        NDAsignedFirst: "outline-info",
        NDAsignedSecond: "info",
        isNDAsigned: "No",
      });
    }
  }

  function handleGDPRcompliance(evt) {
    const val = evt.target.name;
    if (val === "Yes") {
      setState({
        ...state,
        GDPRcomplianceFirst: "info",
        GDPRcomplianceSecond: "outline-info",
        isGDPRcompliance: val,
      });
    } else if (val === "No") {
      setState({
        ...state,
        GDPRcomplianceFirst: "outline-info",
        GDPRcomplianceSecond: "info",
        isGDPRcompliance: val,
      });
    }
  }

  function handleDevType(evt) {
    const val = evt.target.value;

    if (val === "Local") {
      setState({
        ...state,
        devTypeFirstBtn: "info",
        devTypeSecondBtn: "outline-info",
        devTypeThirdBtn: "outline-info",
        devTypeSelected: val,
      });
    } else if (val === "Cloud Plateform") {
      setState({
        ...state,
        devTypeFirstBtn: "outline-info",
        devTypeSecondBtn: "info",
        devTypeThirdBtn: "outline-info",
        devTypeSelected: val,
      });
    } else if (val === "Client Plateform") {
      setState({
        ...state,
        devTypeFirstBtn: "outline-info",
        devTypeSecondBtn: "outline-info",
        devTypeThirdBtn: "info",
        devTypeSelected: val,
      });
    }
  }

  // function handlePlainText(evt) {
  //   setState({
  //     ...state,
  //     [evt.target.name]: evt.target.value,
  //   });
  // }

  function handleSubmitForm(data) {
  
    const postObj = {
      projectName: data.projectName,
      securityMeasure: data.securityMeasure,
      informIT: data.informIT,
      workStationSelected: state.workStationSelected,
      devTypeSelected: state.devTypeSelected,
      allowedWebsite: data.allowedWebsite,
      isNDAsigned: state.isNDAsigned,
      isGDPRcompliance: state.isGDPRcompliance,
      isCyberSecConducted: state.isCyberSecConducted,
      securityBreach: data.securityBreach,
      isDisasterInsuCovered: state.isDisasterInsuCovered,
      disasterDetails: data.disasterDetails,
      showInsuranceDetails: state.showInsuranceDetails,
      isIsolatedEnvReq: state.isIsolatedEnvReq,
      isolationDetails: data.isolationDetails,
      showIsolatedDetails: state.showIsolatedDetails,
      isDLPreq: state.isDLPreq,
      isClientEmailProvided: state.isClientEmailProvided,
      newStatus: state.newStatus,
    };

    axios
      .post(`http://localhost:5000/clientInfo/update/${id}`, postObj)

      .then((res) => {
        console.log("Data has been saved successfully. ", postObj);
        console.log(
          "response from backend after successful post request. ",
          res.data
        );
        toast.success("Data Saved Successfully !", {
          autoClose: 3000,
        });
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      })
      .catch((err) => {
        console.log("Data has NOT saved. ", postObj);
        console.log("response from backend after Failed to post request. ", err.response);
        toast.error("Failed to save the data !", {
          autoClose: 3000,
        });
      });
  }

  return (
    <div>
      <div className="navbar navbar-dark sticky-top flex-md-nowrap p-0 shadow header_nav">
        <div className="row">
          <a className="navbar-brand col-md-6 px-4" href="#/">
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
            <div style={{ width: "700px" }} className="project-details-form">
              <h2> Project Details </h2>
              <Form onSubmit={handleSubmit(handleSubmitForm)}>
                <Form.Group style={{ marginBottom: "40px" }}>
                  <Form.Label>Name of the project or client</Form.Label>
                  <Form.Control
                    type="text"
                    {...register("projectName", {
                      required: "Enter the Project Name!",
                    })}
                  />
                  {errors.projectName && (
                    <small className="text-denger">
                      {errors.projectName.message}
                    </small>
                  )}
                </Form.Group>

                <Form.Group style={{ marginBottom: "40px" }}>
                  <Form.Label>Security measures from client side</Form.Label>
                  <Form.Control
                    type="text"
                    {...register("securityMeasure", {
                      required: "Enter the Security Measures",
                    })}
                  />
                  {errors.securityMeasure && (
                    <small className="text-denger">
                      {errors.securityMeasure.message}
                    </small>
                  )}
                </Form.Group>

                <Form.Group style={{ marginBottom: "40px" }}>
                  <Form.Label>
                    Information to IT at the time of project kick-off
                  </Form.Label>
                  <Form.Control
                    // type="text"
                    {...register("informIT", {
                      required: "Enter the information provided to IT, if N/A then enter 'No' ",
                    })}
                  />
                  {errors.informIT && (
                    <small className="text-denger">
                      {errors.informIT.message}
                    </small>
                  )}
                </Form.Group>

                <Form.Group style={{ marginBottom: "40px" }}>
                  <Form.Label>Work stations type provided in Evoke </Form.Label>
                  <Form.Group style={{ marginBottom: "30px" }}>
                    <Button
                      size="sm"
                      className="btn-padding"
                      variant={state.workStationFirstBtn}
                      onClick={handleWorkStation}
                      value={state.workStationValue[0]}
                      style={{ marginRight: "15px", width: "100px" }}
                      // {...register("laptop", {
                      //   required: "Choose the WorkStation Type",
                      // })}
                    >
                      {" "}
                      Laptop
                    </Button>

                    <Button
                      size="sm"
                      variant={state.workStationSecondBtn}
                      onClick={handleWorkStation}
                      value={state.workStationValue[1]}
                      style={{ marginRight: "15px", width: "80px" }}
                      // {...register("VM", {
                      //   required: "Choose the WorkStation Type",
                      // })}
                    >
                      {" "}
                      VM
                    </Button>
                    <Button
                      size="sm"
                      variant={state.workStationThirdBtn}
                      onClick={handleWorkStation}
                      value={state.workStationValue[2]}
                      style={{ marginRight: "15px", width: "90px" }}
                      // {...register("cloud", {
                      //   required: "Choose the WorkStation Type",
                      // })}
                    >
                      {" "}
                      Cloud
                    </Button>
                  </Form.Group>
                  {/* {errors.projectNameByIT && (
                    <small className="text-denger">
                      {errors.projectNameByIT.message}
                    </small>
                  )} */}
                </Form.Group>

                <Form.Group style={{ marginBottom: "40px" }}>
                  <Form.Label> Development type </Form.Label>
                  <Form.Group style={{ marginBottom: "30px" }}>
                    <Button
                      size="sm"
                      variant={state.devTypeFirstBtn}
                      onClick={handleDevType}
                      value={state.devTypeValue[0]}
                      style={{ marginRight: "15px", width: "90px" }}
                    >
                      {" "}
                      Local
                    </Button>
                    <Button
                      size="sm"
                      variant={state.devTypeSecondBtn}
                      onClick={handleDevType}
                      value={state.devTypeValue[1]}
                      style={{ marginRight: "15px", width: "150px" }}
                      className="btn-padding"
                    >
                      {" "}
                      Cloud Plateform
                    </Button>
                    <Button
                      size="sm"
                      variant={state.devTypeThirdBtn}
                      onClick={handleDevType}
                      value={state.devTypeValue[2]}
                      style={{ marginRight: "15px", width: "150px" }}
                      className="btn-padding"
                    >
                      {" "}
                      Client Plateform
                    </Button>
                  </Form.Group>
                </Form.Group>

                <Form.Group style={{ marginBottom: "40px" }}>
                  <Form.Label>Website(s) need to be allowed</Form.Label>
                  <Form.Control

                    {...register("allowedWebsite", {
                      required: "If N/A then mention Evoke Website",
                    })}
                  />
                  <Form.Text className="text-muted">
                    {" "}
                    Use comma(,) to saperate multiple URLs, eg-
                    https://www.evoketechnologies.com/, 2nd URL{" "}
                  </Form.Text>
                  {errors.allowedWebsite && (
                    <small className="text-denger">
                      {errors.allowedWebsite.message}
                    </small>
                  )}
                </Form.Group>

                <Form.Group style={{ marginBottom: "40px" }}>
                  <Form.Label>
                    NDA/DPA (Data Privacy Agreement) signed ?{" "}
                  </Form.Label>
                  <Form.Group style={{ marginBottom: "30px" }}>
                    <Button
                      size="sm"
                      variant={state.NDAsignedFirst}
                      name="Yes"
                      onClick={handleNDAsigned}
                      value={state.NDAsignedFirst}
                      style={{ marginRight: "15px", width: "80px" }}
                    >
                      {" "}
                      Yes
                    </Button>
                    <Button
                      size="sm"
                      variant={state.NDAsignedSecond}
                      name="No"
                      onClick={handleNDAsigned}
                      value={state.NDAsignedSecond}
                      style={{ marginRight: "15px", width: "80px" }}
                    >
                      {" "}
                      No
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
                      variant={state.GDPRcomplianceFirst}
                      name="Yes"
                      onClick={handleGDPRcompliance}
                      value={state.GDPRcomplianceFirst}
                      style={{ marginRight: "15px", width: "80px" }}
                    >
                      {" "}
                      Yes
                    </Button>
                    <Button
                      size="sm"
                      variant={state.GDPRcomplianceSecond}
                      name="No"
                      onClick={handleGDPRcompliance}
                      value={state.GDPRcomplianceSecond}
                      style={{ marginRight: "15px", width: "80px" }}
                    >
                      {" "}
                      No
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
                      variant={state.CyberSecConductedFirst}
                      name="Yes"
                      onClick={handleCyberSecConducted}
                      value={state.CyberSecConductedFirst}
                      style={{ marginRight: "15px", width: "80px" }}
                    >
                      {" "}
                      Yes
                    </Button>
                    <Button
                      size="sm"
                      variant={state.CyberSecConductedSecond}
                      name="No"
                      onClick={handleCyberSecConducted}
                      value={state.CyberSecConductedSecond}
                      style={{ marginRight: "15px", width: "80px" }}
                    >
                      {" "}
                      No
                    </Button>
                  </Form.Group>
                </Form.Group>

                <Form.Group style={{ marginBottom: "40px" }}>
                  <Form.Label>
                    Any project risks identified in the course of interims of
                    security breach or calamities ?
                  </Form.Label>
                  <Form.Control
                    {...register("securityBreach", {
                      required: "If N/A then mention 'No'",
                    })}
                  />
                  {errors.securityBreach && (
                    <small className="text-denger">
                      {errors.securityBreach.message}
                    </small>
                  )}
                </Form.Group>

                <Form.Group style={{ marginBottom: "40px" }}>
                  <Form.Label>
                    Insurance coverage in case of disater issues ?{" "}
                  </Form.Label>
                  <Form.Group style={{ marginBottom: "30px" }}>
                    <Button
                      size="sm"
                      variant={state.DisasterInsuCoveredFirst}
                      name="Yes"
                      onClick={handleDisasterInsuCovered}
                      value={state.DisasterInsuCoveredFirst}
                      style={{
                        marginRight: "15px",
                        marginBottom: "15px",
                        width: "80px",
                      }}
                    >
                      {" "}
                      Yes
                    </Button>
                    <Button
                      size="sm"
                      variant={state.DisasterInsuCoveredSecond}
                      name="No"
                      onClick={handleDisasterInsuCovered}
                      value={state.DisasterInsuCoveredSecond}
                      style={{ marginBottom: "15px", width: "80px" }}
                    >
                      {" "}
                      No
                    </Button>
                    {state.showInsuranceDetails && (
                      <div>
                        <Form.Label>
                        {" "}
                          Details for insurance company coverage terms and
                          insurance company spoc
                        </Form.Label>

                        <Form.Control
                          {...register("disasterDetails", {
                            required:
                              "Please enter Insurance Details",
                          })}
                        />
                        {errors.disasterDetails && (
                          <small className="text-denger">
                            {errors.disasterDetails.message}
                          </small>
                        )}
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
                      variant={state.IsolatedEnvReqFirst}
                      name="Yes"
                      onClick={handleIsolatedEnvReq}
                      value={state.IsolatedEnvReqFirst}
                      style={{
                        marginRight: "15px",
                        marginBottom: "15px",
                        width: "80px",
                      }}
                    >
                      {" "}
                      Yes
                    </Button>
                    <Button
                      size="sm"
                      variant={state.IsolatedEnvReqSecond}
                      name="No"
                      onClick={handleIsolatedEnvReq}
                      value={state.IsolatedEnvReqSecond}
                      style={{
                        marginRight: "15px",
                        marginBottom: "15px",
                        width: "80px",
                      }}
                    >
                      {" "}
                      No
                    </Button>

                    {state.showIsolatedDetails && (
                      <div>
                        <Form.Label>
                          {" "}
                          Details of physical isolation of network, physical
                          isolation for workspace, DLP etc
                        </Form.Label>

                        <Form.Control
                          {...register("isolationDetails", {
                            required:
                              "Share the details of isolation requested by client",
                          })}
                        />
                        {errors.isolationDetails && (
                          <small className="text-denger">
                            {errors.isolationDetails.message}
                          </small>
                        )}
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
                      variant={state.DLPreqFirst}
                      name="Yes"
                      onClick={handleDLPreq}
                      value={state.DLPreqFirst}
                      style={{ marginRight: "15px", width: "80px" }}
                    >
                      {" "}
                      Yes
                    </Button>
                    <Button
                      size="sm"
                      variant={state.DLPreqSecond}
                      name="No"
                      onClick={handleDLPreq}
                      value={state.DLPreqSecond}
                      style={{ marginRight: "15px", width: "80px" }}
                    >
                      {" "}
                      No
                    </Button>
                  </Form.Group>
                </Form.Group>

                <Form.Group>
                  <Form.Label>
                    Is client providing Email services to user for regular
                    business communication ?{" "}
                  </Form.Label>
                  <Form.Group>
                    <Button
                      size="sm"
                      variant={state.ClientEmailProvidedFirst}
                      name="Yes"
                      onClick={handleClientEmailProvided}
                      value={state.ClientEmailProvidedFirst}
                      style={{ marginRight: "15px", width: "80px" }}
                    >
                      {" "}
                      Yes
                    </Button>
                    <Button
                      size="sm"
                      variant={state.ClientEmailProvidedSecond}
                      name="No"
                      onClick={handleClientEmailProvided}
                      value={state.ClientEmailProvidedSecond}
                      style={{ marginRight: "15px", width: "80px" }}
                    >
                      {" "}
                      No
                    </Button>
                  </Form.Group>
                </Form.Group>

                {/* <Form.Group
                  controlId="formBasicCheckbox"
                  style={{ marginBottom: "30px" }}
                >
                  <Form.Check
                    type="checkbox"
                    label="I have re-checked my response and now I am ready to submit"
                    {...register("checked", {
                      required:
                        "Please check this checkbox once you are ready to submit",
                    })}
                  />
                  {errors.checked && (
                    <small className="text-denger">
                      {errors.checked.message}
                    </small>
                  )}
                </Form.Group> */}
                <br></br>
                <br></br>

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
                  Reset
                </Button>

                <Button
                  variant="primary"
                  type="submit"
                  className="submit-btn"
                  onSubmit={handleSubmitForm}
                  style={{
                    marginBottom: "40px",
                    width: "130px",
                  }}
                >
                  {" "}
                  Submit
                </Button>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default ClinetForm;
