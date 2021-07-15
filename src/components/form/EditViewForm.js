import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Logo from "../../assets/images/eoke_logo.svg";
import axios from "axios";
import { useParams } from "react-router-dom";
import Footer from "../admin/Footer";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';

toast.configure();

function EditViewForm() {
  const { id } = useParams();

  const [status, setStatus] = useState("");
  const [projectNameByIT, setProjectNameByIT] = useState("");
  const [securityMeasure, setSecurityMeasure] = useState("");
  const [informIT, setInformIT] = useState("");
  const [securityBreach, setSecurityBreach] = useState("");
  const [allowedWebsite, setAllowedWebsite] = useState("");
  const [disasterDetails, setDisasterDetails] = useState("");
  const [isolationDetails, setIsolationDetails] = useState("");

  const [isNDAsigned, setIsNDAsigned] = useState("");
  const [NDAsigned, setNDAsigned] = useState(""); //REPLACE ORIGINAL VALUE WTTH THIS VALUE FROM BACKEND. CREATE EDIT API.
  const [NDAsignedFirst, setNDAsignedFirst] = useState("outline-info");
  const [NDAsignedSecond, setNDAsignedSecond] = useState("outline-info");

  const [isGDPRcompliance, setIsGDPRcompliance] = useState("");
  const [GDPRcompliance, setGDPRcompliance] = useState("");
  const [GDPRcomplianceFirst, setGDPRcomplianceFirst] = useState("");
  const [GDPRcomplianceSecond, setGDPRcomplianceSecond] = useState("");

  const [isCyberSecConducted, setIsCyberSecConducted] = useState("");
  const [CyberSecConducted, setCyberSecConducted] = useState("");
  const [CyberSecConductedFirst, setCyberSecConductedFirst] = useState("");
  const [CyberSecConductedSecond, setCyberSecConductedSecond] = useState("");

  const [isIsolatedEnvReq, setIsIsolatedEnvReq] = useState("");
  const [IsolatedEnvReq, setIsolatedEnvReq] = useState("");
  const [IsolatedEnvReqFirst, setIsolatedEnvReqFirst] = useState("");
  const [IsolatedEnvReqSecond, setIsolatedEnvReqSecond] = useState("");
  const [showIsolatedDetails, setShowIsolatedDetails] = useState("");

  const [isDisasterInsuCovered, setIsDisasterInsuCovered] = useState("");
  const [DisasterInsuCovered, setDisasterInsuCovered] = useState("");
  const [DisasterInsuCoveredFirst, setDisasterInsuCoveredFirst] = useState("");
  const [DisasterInsuCoveredSecond, setDisasterInsuCoveredSecond]=useState("");
  const [showInsuranceDetails, setShowInsuranceDetails] = useState("");

  const [isDLPreq, setIsDLPreq] = useState("");
  const [DLPreq, setDLPreq] = useState("");
  const [DLPreqFirst, setDLPreqFirst] = useState("");
  const [DLPreqSecond, setDLPreqSecond] = useState("");

  const [isClientEmailProvided, setIsClientEmailProvided] = useState("");
  const [ClientEmailProvided, setClientEmailProvided] = useState("");
  const [ClientEmailProvidedFirst, setClientEmailProvidedFirst] = useState("");
  const [ClientEmailProvidedSecond, setClientEmailProvidedSecond]=useState("");

  const [workStationSelected, setWorkStationSelected] = useState("");
  const [workStationValue, setWorkStationValue] = useState("");
  const [workStationFirstBtn, setWorkStationFirstBtn] = useState("");
  const [workStationSecondBtn, setWorkStationSecondBtn] = useState("");
  const [workStationThirdBtn, setWorkStationThirdBtn] = useState("");

  const [devTypeSelected, setDevTypeSelected] = useState("");
  const [devTypeValue, setDevTypeValue] = useState("");
  const [devTypeFirstBtn, setDevTypeFirstBtn] = useState("");
  const [devTypeSecondBtn, setDevTypeSecondBtn] = useState("");
  const [devTypeThirdBtn, setDevTypeThirdBtn] = useState("");

  // const [deleteReason, setDeleteReason] = useState("");
  // const [reshareReason, setReshareReason] = useState("");
  // const [restoreReason, setRestoreReason] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:5000/clientInfo/${id}`)
      .then((res) => {
        // console.log("Entire get API : ", res.data);

        setProjectNameByIT(res.data.projectNameByIT);
        setSecurityMeasure(res.data.securityMeasure);
        setInformIT(res.data.informIT);
        setAllowedWebsite(res.data.allowedWebsite);
        setSecurityBreach(res.data.securityBreach);
        setDisasterDetails(res.data.disasterDetails);
        setIsolationDetails(res.data.isolationDetails);
        setShowIsolatedDetails(res.data.showIsolatedDetails);

        setIsNDAsigned(res.data.isNDAsigned);
        setIsGDPRcompliance(res.data.isGDPRcompliance);
        setIsIsolatedEnvReq(res.data.isIsolatedEnvReq);
        setIsCyberSecConducted(res.data.isCyberSecConducted);
        setIsDisasterInsuCovered(res.data.isDisasterInsuCovered);
        setShowInsuranceDetails(res.data.showInsuranceDetails);
        setIsDLPreq(res.data.isDLPreq);
        setIsClientEmailProvided(res.data.isClientEmailProvided);
        setWorkStationSelected(res.data.workStationSelected);
        setDevTypeSelected(res.data.devTypeSelected);

        setStatus("Submitted");
        
        if (isNDAsigned === "Yes") {
          setNDAsignedFirst("info");
          setNDAsignedSecond("outline-info");
          setNDAsigned("Yes");
        } else {
          setNDAsignedFirst("outline-info");
          setNDAsignedSecond("info");
          setNDAsigned("No");
        }

        if (isGDPRcompliance === "Yes") {
          setGDPRcomplianceFirst("info");
          setGDPRcomplianceSecond("outline-info");
          setGDPRcompliance("Yes");
        } else {
          setGDPRcomplianceFirst("outline-info");
          setGDPRcomplianceSecond("info");
          setGDPRcompliance("No");
        }

        if (isCyberSecConducted === "Yes") {
          setCyberSecConductedFirst("info");
          setCyberSecConductedSecond("outline-info");
          setCyberSecConducted("Yes");
        } else {
          setCyberSecConductedFirst("outline-info");
          setCyberSecConductedSecond("info");
          setCyberSecConducted("No");
        }

        if (isIsolatedEnvReq === "Yes") {
          setIsolatedEnvReqFirst("info");
          setIsolatedEnvReqSecond("outline-info");
          setIsolatedEnvReq("Yes");
          setShowIsolatedDetails(true);
        } else {
          setIsolatedEnvReqFirst("outline-info");
          setIsolatedEnvReqSecond("info");
          setIsolatedEnvReq("No");
          setShowIsolatedDetails(false);
        }

        if (isDisasterInsuCovered === "Yes") {
          setDisasterInsuCoveredFirst("info");
          setDisasterInsuCoveredSecond("outline-info");
          setDisasterInsuCovered("Yes");
          setShowInsuranceDetails(true);
        } else {
          setDisasterInsuCoveredFirst("outline-info");
          setDisasterInsuCoveredSecond("info");
          setDisasterInsuCovered("No");
          setShowInsuranceDetails(false);
        }

        if (isDLPreq === "Yes") {
          setDLPreqFirst("info");
          setDLPreqSecond("outline-info");
          setDLPreq("Yes");
        } else {
          setDLPreqFirst("outline-info");
          setDLPreqSecond("info");
          setDLPreq("No");
        }

        if (isClientEmailProvided === "Yes") {
          setClientEmailProvidedFirst("info");
          setClientEmailProvidedSecond("outline-info");
          setClientEmailProvided("Yes");
        } else {
          setClientEmailProvidedFirst("outline-info");
          setClientEmailProvidedSecond("info");
          setClientEmailProvided("No");
        }

        if (workStationSelected === "Laptop") {
          setWorkStationFirstBtn("info");
          setWorkStationSecondBtn("outline-info");
          setWorkStationThirdBtn("outline-info");
          setWorkStationValue("Laptop");
        } else if (workStationSelected === "VM") {
          setWorkStationFirstBtn("outline-info");
          setWorkStationSecondBtn("info");
          setWorkStationThirdBtn("outline-info");
          setWorkStationValue("VM");
        } else {
          setWorkStationFirstBtn("outline-info");
          setWorkStationSecondBtn("outline-info");
          setWorkStationThirdBtn("info");
          setWorkStationValue("Cloud");
        }

        if (devTypeSelected === "Local") {
          setDevTypeFirstBtn("info");
          setDevTypeSecondBtn("outline-info");
          setDevTypeThirdBtn("outline-info");
          setDevTypeValue("Local");
        } else if (devTypeSelected === "Cloud Plateform") {
          setDevTypeFirstBtn("outline-info");
          setDevTypeSecondBtn("info");
          setDevTypeThirdBtn("outline-info");
          setDevTypeValue("Cloud Plateform");
        } else {
          setDevTypeFirstBtn("outline-info");
          setDevTypeSecondBtn("outline-info");
          setDevTypeThirdBtn("info");
          setDevTypeValue("Client Plateform");
        }
      })

      .catch((err) => {
        console.log("Failed to get the data: ", err.response);
      });
  }, [
    id,
    isNDAsigned,
    isGDPRcompliance,
    isCyberSecConducted,
    isIsolatedEnvReq,
    isDisasterInsuCovered,
    isDLPreq,
    isClientEmailProvided,
    workStationSelected,
    devTypeSelected,
  ]);

  function handleDevType(evt) {
    const val = evt.target.name;
    if (val === "Local") {
      setDevTypeFirstBtn("info");
      setDevTypeSecondBtn("outline-info");
      setDevTypeThirdBtn("outline-info");
      setDevTypeValue(val);
    } else if (val === "Cloud Plateform") {
      setDevTypeFirstBtn("outline-info");
      setDevTypeSecondBtn("info");
      setDevTypeThirdBtn("outline-info");
      setDevTypeValue(val);
    } else if (val === "Client Plateform") {
      setDevTypeFirstBtn("outline-info");
      setDevTypeSecondBtn("outline-info");
      setDevTypeThirdBtn("info");
      setDevTypeValue(val);
    }
  }

  function handleWorkStation(e) {
    const val = e.target.name;
    if (val === "Laptop") {
      setWorkStationFirstBtn("info");
      setWorkStationSecondBtn("outline-info");
      setWorkStationThirdBtn("outline-info");
      setWorkStationValue(val);
    } else if (val === "VM") {
      setWorkStationFirstBtn("outline-info");
      setWorkStationSecondBtn("info");
      setWorkStationThirdBtn("outline-info");
      setWorkStationValue(val);
    } else if (val === "Cloud") {
      setWorkStationFirstBtn("outline-info");
      setWorkStationSecondBtn("outline-info");
      setWorkStationThirdBtn("info");
      setWorkStationValue(val);
    }
  }

  function handleClientEmailProvided(evt) {
    const val = evt.target.name;
    if (val === "Yes") {
      setClientEmailProvidedFirst("info");
      setClientEmailProvidedSecond("outline-info");
      setClientEmailProvided(val);
    } else {
      setClientEmailProvidedFirst("outline-info");
      setClientEmailProvidedSecond("info");
      setClientEmailProvided(val);
    }
  }

  function handleDLPreq(evt) {
    const val = evt.target.name;
    if (val === "Yes") {
      setDLPreqFirst("info");
      setDLPreqSecond("outline-info");
      setDLPreq(val);
    } else {
      setDLPreqFirst("outline-info");
      setDLPreqSecond("info");
      setDLPreq(val);
    }
  }

  function handleIsolatedEnvReq(evt) {
    const val = evt.target.name;
    if (val === "Yes") {
      setIsolatedEnvReqFirst("info");
      setIsolatedEnvReqSecond("outline-info");
      setIsolatedEnvReq(val);
      setShowIsolatedDetails(true);
    } else {
      setIsolatedEnvReqFirst("outline-info");
      setIsolatedEnvReqSecond("info");
      setIsolatedEnvReq(val);
      setShowIsolatedDetails(false);
    }
  }

  function handleDisasterInsuCovered(e) {
    const val = e.target.name;
    if (val === "Yes") {
      setDisasterInsuCoveredFirst("info");
      setDisasterInsuCoveredSecond("outline-info");
      setDisasterInsuCovered(val);
      setShowInsuranceDetails(true);
    } else {
      setDisasterInsuCoveredFirst("outline-info");
      setDisasterInsuCoveredSecond("info");
      setDisasterInsuCovered(val);
      setShowInsuranceDetails(false);
    }
  }

  function handleCyberSecConducted(evt) {
    const val = evt.target.name;
    if (val === "Yes") {
      setCyberSecConducted(val);
      setCyberSecConductedFirst("info");
      setCyberSecConductedSecond("outline-info");
    } else {
      setCyberSecConductedFirst("outline-info");
      setCyberSecConductedSecond("info");
      setCyberSecConducted(val);
    }
  }

  function handleNDAsigned(e) {
    const val = e.target.name;
    if (val === "Yes") {
      setNDAsigned(val);
      setNDAsignedFirst("info");
      setNDAsignedSecond("outline-info");
    } else {
      setNDAsigned(val);
      setNDAsignedFirst("outline-info");
      setNDAsignedSecond("info");
    }
  }

  function handleGDPRcompliance(e) {
    const val = e.target.name;
    if (val === "Yes") {
      setGDPRcompliance(val);
      setGDPRcomplianceFirst("info");
      setGDPRcomplianceSecond("outline-info");
    } else {
      setGDPRcompliance(val);
      setGDPRcomplianceFirst("outline-info");
      setGDPRcomplianceSecond("info");
    }
  }

  function SubmitButton() {
    if (
      projectNameByIT &&
      securityMeasure &&
      informIT &&
      securityBreach &&
      allowedWebsite &&
      ((showInsuranceDetails === true && disasterDetails) ||
        showInsuranceDetails === false) &&
      ((showIsolatedDetails === true && isolationDetails) ||
        showIsolatedDetails === false)
    ) {
      return (
        <Button
          variant="primary"
          className="submit-btn"
          onClick={() => handleSubmitForm()}
          style={{
            marginTop: "50px",
            marginBottom: "40px",
            width: "130px",
          }}
        >
          Update
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
          Update
        </Button>
      );
    }
  }

  function handleSubmitForm() {
   

    const postObj = {
      projectNameByIT,
      securityMeasure,
      informIT,
      allowedWebsite,
      securityBreach,
      disasterDetails,
      isolationDetails,
      status,
      NDAsigned,
      GDPRcompliance,
      CyberSecConducted,
      IsolatedEnvReq,
      DisasterInsuCovered,
      showInsuranceDetails,
      showIsolatedDetails,
      DLPreq,
      ClientEmailProvided,
      workStationValue,
      devTypeValue,
    };
    console.log("postObj --- ", postObj);
    axios
      .post(`http://localhost:5000/clientInfo/editAndUpdate/${id}`, postObj)
      .then((res) => {
        console.log("Data has been saved successfully. ", postObj);
        console.log("response from backend : ", res.data);
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
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };
  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);
  const history = useHistory();
  return (
    <div>
      <div className="navbar navbar-dark sticky-top flex-md-nowrap p-0 shadow header_nav">
        <div className="row">
          <a className="navbar-brand col-md-6 px-4" href="/admin">
            <img src={Logo} alt="Evoke Technologies" />
          </a>
          <h3>Project Information System </h3>
        </div>
        <ul className="navbar-nav px-3">
          <li className="nav-item text-nowrap">
            {/* <button></button> */}
            <Button
            ref={anchorRef}
            aria-controls={open ? 'menu-list-grow' : undefined}
            aria-haspopup="true"
            onClick={handleToggle}
          >
          </Button>
            <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                    <MenuItem>Logout</MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
          </li>
        </ul>
      </div>
      <div className="custom-scroll">
        <Container>
          <Row>
            <Col md={{ span: 8, offset: 2 }}>
              <div style={{ width: "700px" }} className="project-details-form">
                <h2> Project Details </h2>
                <button
                className="modal-closeBtn"
                onClick={() => history.push("/admin")}
              >
                <svg className="_modal-close-icon" viewBox="0 0 40 40">
                  <path d="M 10,10 L 30,30 M 30,10 L 10,30" />
                </svg>
              </button>
                <Form>
                  <Form.Group style={{ marginBottom: "40px" }}>
                    <Form.Label>Name of the project or client</Form.Label>
                    <Form.Control
                      onChange={(e) => {
                        setProjectNameByIT(e.target.value);
                      }}
                      value={projectNameByIT}
                      autoFocus
                    />
                  </Form.Group>

                  <Form.Group style={{ marginBottom: "40px" }}>
                    <Form.Label>Security measures from client side</Form.Label>
                    <Form.Control
                      onChange={(e) => {
                        setSecurityMeasure(e.target.value);
                      }}
                      value={securityMeasure}
                    />
                  </Form.Group>

                  <Form.Group style={{ marginBottom: "40px" }}>
                    <Form.Label>
                      Information to IT at the time of project kick-off
                    </Form.Label>
                    <Form.Control
                      value={informIT}
                      onChange={(e) => {
                        setInformIT(e.target.value);
                      }}
                    />
                  </Form.Group>

                  <Form.Group style={{ marginBottom: "40px" }}>
                    <Form.Label>
                      Work stations type provided in Evoke
                    </Form.Label>
                    <Form.Group style={{ marginBottom: "30px" }}>
                      <Button
                        size="sm"
                        className="btn-padding"
                        variant={workStationFirstBtn}
                        onClick={handleWorkStation}
                        name="Laptop"
                        style={{ marginRight: "15px", width: "100px" }}
                      >
                        {" "}
                        Laptop
                      </Button>

                      <Button
                        size="sm"
                        variant={workStationSecondBtn}
                        onClick={handleWorkStation}
                        name="VM"
                        style={{ marginRight: "15px", width: "80px" }}
                      >
                        {" "}
                        VM
                      </Button>
                      <Button
                        size="sm"
                        variant={workStationThirdBtn}
                        onClick={handleWorkStation}
                        name="Cloud"
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
                        variant={devTypeFirstBtn}
                        onClick={handleDevType}
                        name="Local"
                        style={{ marginRight: "15px", width: "90px" }}
                      >
                        {" "}
                        Local
                      </Button>
                      <Button
                        size="sm"
                        variant={devTypeSecondBtn}
                        onClick={handleDevType}
                        name="Cloud Plateform"
                        style={{ marginRight: "15px", width: "150px" }}
                        className="btn-padding"
                      >
                        {" "}
                        Cloud Plateform
                      </Button>
                      <Button
                        size="sm"
                        variant={devTypeThirdBtn}
                        onClick={handleDevType}
                        name="Client Plateform"
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
                      onChange={(e) => {
                        setAllowedWebsite(e.target.value);
                      }}
                      value={allowedWebsite}
                    />
                    <Form.Text className="text-muted">
                      {" "}
                      Use comma(,) to saperate multiple URLs, eg-
                      https://www.evoketechnologies.com/, 2nd URL{" "}
                    </Form.Text>
                  </Form.Group>

                  <Form.Group style={{ marginBottom: "40px" }}>
                    <Form.Label>
                      NDA/DPA (Data Privacy Agreement) signed ?
                    </Form.Label>
                    <Form.Group style={{ marginBottom: "30px" }}>
                      <Button
                        size="sm"
                        variant={NDAsignedFirst}
                        name="Yes"
                        onClick={handleNDAsigned}
                        value={NDAsignedFirst}
                        style={{ marginRight: "15px", width: "80px" }}
                      >
                        {" "}
                        Yes
                      </Button>
                      <Button
                        size="sm"
                        variant={NDAsignedSecond}
                        name="No"
                        onClick={handleNDAsigned}
                        value={NDAsignedSecond}
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
                        variant={GDPRcomplianceFirst}
                        name="Yes"
                        onClick={handleGDPRcompliance}
                        value={GDPRcomplianceFirst}
                        style={{ marginRight: "15px", width: "80px" }}
                      >
                        {" "}
                        Yes
                      </Button>
                      <Button
                        size="sm"
                        variant={GDPRcomplianceSecond}
                        name="No"
                        onClick={handleGDPRcompliance}
                        value={GDPRcomplianceSecond}
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
                      well as in house (importance of data security to followed
                      by all users) ?{" "}
                    </Form.Label>
                    <Form.Group style={{ marginBottom: "30px" }}>
                      <Button
                        size="sm"
                        variant={CyberSecConductedFirst}
                        name="Yes"
                        onClick={handleCyberSecConducted}
                        value={CyberSecConductedFirst}
                        style={{ marginRight: "15px", width: "80px" }}
                      >
                        {" "}
                        Yes
                      </Button>
                      <Button
                        size="sm"
                        variant={CyberSecConductedSecond}
                        name="No"
                        onClick={handleCyberSecConducted}
                        value={CyberSecConductedSecond}
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
                      onChange={(e) => {
                        setSecurityBreach(e.target.value);
                      }}
                      value={securityBreach}
                    />
                  </Form.Group>

                  <Form.Group style={{ marginBottom: "40px" }}>
                    <Form.Label>
                      Insurance coverage in case of disater issues ?{" "}
                    </Form.Label>
                    <Form.Group style={{ marginBottom: "30px" }}>
                      <Button
                        size="sm"
                        variant={DisasterInsuCoveredFirst}
                        name="Yes"
                        onClick={handleDisasterInsuCovered}
                        value={DisasterInsuCoveredFirst}
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
                        variant={DisasterInsuCoveredSecond}
                        name="No"
                        onClick={handleDisasterInsuCovered}
                        value={DisasterInsuCoveredSecond}
                        style={{ marginBottom: "15px", width: "80px" }}
                      >
                        {" "}
                        No
                      </Button>
                      {showInsuranceDetails && (
                        <div>
                          <Form.Label>
                            {" "}
                            Details for insurance company coverage terms and
                            insurance company spoc
                          </Form.Label>

                          <Form.Control
                            onChange={(e) => {
                              setDisasterDetails(e.target.value);
                            }}
                            value={disasterDetails}
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
                        variant={IsolatedEnvReqFirst}
                        name="Yes"
                        onClick={handleIsolatedEnvReq}
                        value={IsolatedEnvReqFirst}
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
                        variant={IsolatedEnvReqSecond}
                        name="No"
                        onClick={handleIsolatedEnvReq}
                        value={IsolatedEnvReqSecond}
                        style={{
                          marginRight: "15px",
                          marginBottom: "15px",
                          width: "80px",
                        }}
                      >
                        {" "}
                        No
                      </Button>

                      {showIsolatedDetails && (
                        <div>
                          <Form.Label>
                            {" "}
                            Details of physical isolation of network, physical
                            isolation for workspace, DLP etc
                          </Form.Label>

                          <Form.Control
                            onChange={(e) => {
                              setIsolationDetails(e.target.value);
                            }}
                            value={isolationDetails}
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
                        variant={DLPreqFirst}
                        name="Yes"
                        onClick={handleDLPreq}
                        value={DLPreqFirst}
                        style={{ marginRight: "15px", width: "80px" }}
                      >
                        {" "}
                        Yes
                      </Button>
                      <Button
                        size="sm"
                        variant={DLPreqSecond}
                        name="No"
                        onClick={handleDLPreq}
                        value={DLPreqSecond}
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
                        variant={ClientEmailProvidedFirst}
                        name="Yes"
                        onClick={handleClientEmailProvided}
                        value={ClientEmailProvidedFirst}
                        style={{ marginRight: "15px", width: "80px" }}
                      >
                        {" "}
                        Yes
                      </Button>
                      <Button
                        size="sm"
                        variant={ClientEmailProvidedSecond}
                        name="No"
                        onClick={handleClientEmailProvided}
                        value={ClientEmailProvidedSecond}
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
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      <Footer />
    </div>
  );
}

export default EditViewForm;
