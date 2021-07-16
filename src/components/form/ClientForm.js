import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";
import { useParams } from "react-router-dom";
import Footer from "../admin/Footer";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NavBar from "../admin/NavBar";
toast.configure();

function ClientForm() {
  const { id } = useParams();
  const [prevStatus, setPrevStatus] = useState("");
  const [prevProjectName, setPrevProjectName] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:5000/clientInfo/${id}`)
      .then((res) => {
        setPrevStatus(res.data.status); // Don't allow form submittion for Pending or Deleted Project
        setPrevProjectName(res.data.projectNameByIT);
      })
      .catch((err) => {
        console.log("Failed to get the status: ", err.response);
      });
  }, [id, prevProjectName, prevStatus]);

  const [fileData, setFileData] = useState();

  const [state, setState] = useState({
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
  });

  function uploadFileHandler(e) {
    axios
      .post(`http://localhost:5000/multiple/`, fileData)
      // .post("http://httpbin.org/anything", data)
      .then((res) => {
        console.log("Data has been . ", res);
        console.log("File saved successfully : ", res.fileData);
        toast.success("File Saved !", {
          autoClose: 900,
        });
      })
      .catch((err) => {
        console.log("Failed to save Files : ", err.response);
        toast.error("Failed to save FIles !", {
          autoClose: 900,
        });
      });
  }

  function SubmitButton() {
    if (
      // state.projectName &&
      // state.securityMeasure &&
      // state.informIT &&
      // state.workStationSelected &&
      // state.devTypeSelected &&
      // state.allowedWebsite &&
      // state.isNDAsigned &&
      // state.isGDPRcompliance &&
      // state.isCyberSecConducted &&
      // state.securityBreach &&
      // state.isDLPreq &&
      state.isClientEmailProvided
    ) {
      return (
        <Button
          variant="primary"
          className="submit-btn"
          onClick={(e) => handleSubmitForm(e)}
          style={{
            marginTop: "50px",
            marginBottom: "40px",
            width: "130px",
          }}
        >
          {" "}
          Submit{" "}
        </Button>
      );
    } else {
      return (
        <Button
          disabled
          variant="primary"
          className="submit-btn"
          style={{
            marginTop: "50px",
            marginBottom: "40px",
            width: "130px",
          }}
        >
          {" "}
          Submit{" "}
        </Button>
      );
    }
  }

  function handleSubmitForm(e) {
    e.preventDefault();

    const postObj = {
      preProjectNameByIT: prevProjectName,
      securityMeasure: state.securityMeasure,
      informIT: state.informIT,
      workStationSelected: state.workStationSelected,
      devTypeSelected: state.devTypeSelected,
      allowedWebsite: state.allowedWebsite,
      isNDAsigned: state.isNDAsigned,
      isGDPRcompliance: state.isGDPRcompliance,
      isCyberSecConducted: state.isCyberSecConducted,
      securityBreach: state.securityBreach,
      isDisasterInsuCovered: state.isDisasterInsuCovered, //True or False
      disasterDetails: state.disasterDetails,
      showInsuranceDetails: state.showInsuranceDetails,
      isIsolatedEnvReq: state.isIsolatedEnvReq, //True or False
      isolationDetails: state.isolationDetails,
      showIsolatedDetails: state.showIsolatedDetails,
      isDLPreq: state.isDLPreq,
      isClientEmailProvided: state.isClientEmailProvided,
    };

    // const data = new FormData();
    // data.append("postObj", postObj);
    // // data.append("fileData", fileData);

    axios
      .post(`http://localhost:5000/clientInfo/mailAndUpdate/${id}`, postObj)

      .then((res) => {
        console.log("Data has been saved successfully. ", postObj);
        console.log("response from backend : ", res.postObj);
        toast.success("Form sumbitted successfully !", {
          autoClose: 1900,
        });
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      })
      .catch((err) => {
        console.log("Data has NOT saved. ", postObj);
        console.log(
          "response from backend after Failed to post request. ",
          err.response
        );
        toast.error("Failed to save the data !", {
          autoClose: 3000,
        });
      });
  }

  function handlePlainText(e) {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  }

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

  return (
    <div>

      <NavBar validate= {false}/>

      <div className="custom-scroll">
        <Container>
          <Row>
            <Col md={{ span: 6, offset: 2 }}>
              <div style={{ width: "700px" }} className="project-details-form">
                <h2> Project Details </h2>
                {prevStatus === "Pending" && prevStatus !== "deleted" ? (
                  // <Form action="/multiple" method="POST" enctype = "multipart/form-data">
                  <Form action="/multiple">
                    <Form.Group style={{ marginBottom: "40px" }}>
                      <Form.Label>Name of the project or client</Form.Label>
                      <Form.Control
                        value={prevProjectName}
                        onChange={(e) => setPrevProjectName(e.target.value)}
                      />
                    </Form.Group>

                    <Form.Group style={{ marginBottom: "40px" }}>
                      <div className="flex">
                        <label htmlFor="files">Choose files to upload </label>{" "}
                        <br></br>
                        <input
                          type="file"
                          name="fileName"
                          id="file"
                          htmlFor="file"
                          accept="*.*"
                          onChange={(e) => {
                            setFileData(e.target.files[0]);
                            console.log("clicked")
                          }}
                        />
                        <button onClick={uploadFileHandler}> Upload files</button>
                      </div>
                    </Form.Group>

                    <Form.Group style={{ marginBottom: "40px" }}>
                      <Form.Label>
                        Security measures from client side
                      </Form.Label>
                      <Form.Control
                        name="securityMeasure"
                        onChange={handlePlainText}
                        autoFocus={true}
                      />
                    </Form.Group>

                    <Form.Group style={{ marginBottom: "40px" }}>
                      <Form.Label>
                        Information to IT at the time of project kick-off
                      </Form.Label>
                      <Form.Control
                        name="informIT"
                        onChange={handlePlainText}
                      />
                    </Form.Group>

                    <Form.Group style={{ marginBottom: "40px" }}>
                      <Form.Label>
                        Work stations type provided in Evoke{" "}
                      </Form.Label>
                      <Form.Group style={{ marginBottom: "30px" }}>
                        <Button
                          size="sm"
                          className="btn-padding"
                          variant={state.workStationFirstBtn}
                          onClick={handleWorkStation}
                          value={state.workStationValue[0]}
                          style={{ marginRight: "15px", width: "100px" }}
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
                        >
                          {" "}
                          Cloud
                        </Button>
                      </Form.Group>
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
                        name="allowedWebsite"
                        onChange={handlePlainText}
                      />
                      <Form.Text className="text-muted">
                        {" "}
                        Use comma(,) to saperate multiple URLs, eg-
                        https://www.evoketechnologies.com/, 2nd URL{" "}
                      </Form.Text>
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
                        Cyber security induction meeting conducted with client
                        as well as in house (importance of data security to
                        followed by all users) ?{" "}
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
                        Any project risks identified in the course of interims
                        of security breach or calamities ?
                      </Form.Label>
                      <Form.Control
                        name="securityBreach"
                        onChange={handlePlainText}
                      />
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
                              name="disasterDetails"
                              onChange={handlePlainText}
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
                              name="isolationDetails"
                              onChange={handlePlainText}
                            />
                          </div>
                        )}
                      </Form.Group>
                    </Form.Group>

                    <Form.Group style={{ marginBottom: "40px" }}>
                      <Form.Label>
                        Does client require DLP/Encryption enabled laptops for
                        their users ?{" "}
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

                    <Button
                      onClick={() => window.location.reload()}
                      className="reshare"
                      style={{
                        marginTop: "50px",
                        marginBottom: "40px",
                        marginRight: "15px",
                        width: "130px",
                      }}
                    >
                      {" "}
                      Reset
                    </Button>
                    <SubmitButton />
                  </Form>
                ) : (
                  <div
                    style={{
                      padding: "140px",
                    }}
                  >
                    Thank you for your time ! <br />
                    Form has been submitted or NOT required anymore. <br />
                    We will let you know, if any further information is
                    required. <br />
                  </div>
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

export default ClientForm;
