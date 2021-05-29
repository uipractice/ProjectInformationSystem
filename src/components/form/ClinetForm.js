import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Logo from '../../assets/images/eoke_logo.svg'

import "./ClinetForm.css"

function ClinetForm() {

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

    allowedWebsite: [],

   
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
    ClientEmailProvidedSecond: "outline-info"

  })

  
  function handleClientEmailProvided(evt){
    const val = evt.target.name
    if(val === "Yes"){
      setState({
        ...state,
        ClientEmailProvidedFirst: "info",
        ClientEmailProvidedSecond: "outline-info",
        isClientEmailProvided: val
      })
    }
    else if(val === "No"){
      setState({
        ...state,
        ClientEmailProvidedFirst: "outline-info",
        ClientEmailProvidedSecond: "info",
        isClientEmailProvided: val
      })
    }
  }

  function handleDLPreq(evt){
    const val = evt.target.name
    if(val === "Yes"){
      setState({
        ...state,
        DLPreqFirst: "info",
        DLPreqSecond: "outline-info",
        isDLPreq: val
      })
    }
    else if(val === "No"){
      setState({
        ...state,
        DLPreqFirst: "outline-info",
        DLPreqSecond: "info",
        isDLPreq: val
      })
    }
  }

  function handleIsolatedEnvReq(evt){
    const val = evt.target.name
    if(val === "Yes"){
      setState({
        ...state,
        IsolatedEnvReqFirst: "info",
        IsolatedEnvReqSecond: "outline-info",
        isIsolatedEnvReq: val,
        showIsolatedDetails: true
      })
    }
    else if(val === "No"){
      setState({
        ...state,
        IsolatedEnvReqFirst: "outline-info",
        IsolatedEnvReqSecond: "info",
        isIsolatedEnvReq: val,
        showIsolatedDetails: false
      })
    }
  }

  function handleDisasterInsuCovered(evt){
    const val = evt.target.name
    if(val === "Yes"){
      setState({
        ...state,
        DisasterInsuCoveredFirst: "info",
        DisasterInsuCoveredSecond: "outline-info",
        isDisasterInsuCovered: val,
        showInsuranceDetails: true
      })
    }
    else if(val === "No"){
      setState({
        ...state,
        DisasterInsuCoveredFirst: "outline-info",
        DisasterInsuCoveredSecond: "info",
        isDisasterInsuCovered: val,
        showInsuranceDetails: false
      })
    }
  }

  function handleCyberSecConducted(evt){
    const val = evt.target.name
    if(val === "Yes"){
      setState({
        ...state,
        CyberSecConductedFirst: "info",
        CyberSecConductedSecond: "outline-info",
        isCyberSecConducted: val
      })
    }
    else if(val === "No"){
      setState({
        ...state,
        CyberSecConductedFirst: "outline-info",
        CyberSecConductedSecond: "info",
        isCyberSecConducted: val
      })
    }
  }

  function handleWorkStation(evt) {

    const val = evt.target.value

    if (val === "laptop"){
      setState({
        ...state,
        workStationFirstBtn: "info",
        workStationSecondBtn: "outline-info",
        workStationThirdBtn: "outline-info",
        workStationSelected: val        
      }) 
    }
    else if (val === "VM"){
      setState({
        ...state,
        workStationFirstBtn: "outline-info",
        workStationSecondBtn: "info",
        workStationThirdBtn: "outline-info",
        workStationSelected: val        
      })
    }
    else if (val === "cloud"){
        setState({
          ...state,
          workStationFirstBtn: "outline-info",
          workStationSecondBtn: "outline-info",
          workStationThirdBtn: "info",
          workStationSelected: val        
        })
    }

  }

  function handleNDAsigned(evt){
    const val = evt.target.name
    if(val === "Yes"){
      setState({
        ...state,
        NDAsignedFirst: "info",
        NDAsignedSecond: "outline-info",
        isNDAsigned: "Yes"
      })
    }
    else if( val === "No"){
      setState({
        ...state,
        NDAsignedFirst: "outline-info",
        NDAsignedSecond: "info",
        isNDAsigned: "No"
      })
    }
  }

  function handleGDPRcompliance(evt){
    const val = evt.target.name
    if(val === "Yes"){
      setState({
        ...state,
        GDPRcomplianceFirst: "info",
        GDPRcomplianceSecond: "outline-info",
        isGDPRcompliance: val
      })
    }
    else if(val === "No"){
      setState({
        ...state,
        GDPRcomplianceFirst: "outline-info",
        GDPRcomplianceSecond: "info",
        isGDPRcompliance: val
      })
    }
  }
  
  function handleDevType(evt) {
    const val = evt.target.value

    if (val === "Local"){
      setState({
        ...state,
        devTypeFirstBtn: "info",
        devTypeSecondBtn: "outline-info",
        devTypeThirdBtn: "outline-info",
        devTypeSelected: val        
      }) 
    }
    else if (val === "Cloud Plateform"){
      setState({
        ...state,
        devTypeFirstBtn: "outline-info",
        devTypeSecondBtn: "info",
        devTypeThirdBtn: "outline-info",
        devTypeSelected: val        
      })
    }
    else if (val === "Client Plateform"){
        setState({
          ...state,
          devTypeFirstBtn: "outline-info",
          devTypeSecondBtn: "outline-info",
          devTypeThirdBtn: "info",
          devTypeSelected: val        
        })
    }

  }

  function handlePlainText(evt) {
    setState({
      ...state,
      [evt.target.name]: evt.target.value
    });   
  }

  return (

    <div className='Comp_Wrapper'>

        <div className="navbar navbar-dark sticky-top flex-md-nowrap p-0 shadow header_nav">
          <a className="navbar-brand col-md-3 col-lg-2 me-0 px-3" href="https://www.evoketechnologies.com/">
              <img src={Logo} alt="Evoke Technologies" />
          </a>
        </div>

      <Container>

        <Row>

          <Col md={{ span: 6, offset: 2 }}><br/><br/>
          
            <div style={{marginBottom:'10px'}}> <h2> Project Details </h2></div>  <br/>

            <div style={{width: '700px'}}>

              <Form>

                <Form.Group style={{marginBottom:'40px'}}>
                  <Form.Label>Name of the project or client</Form.Label>
                  <Form.Control 
                    type="text" 
                    name="projectName"
                    value={state.projectName}
                    onChange={handlePlainText}  />
                </Form.Group>

                <Form.Group style={{marginBottom:'40px'}}>
                  <Form.Label>Security measures from client side</Form.Label>
                  <Form.Control 
                    type="text" 
                    name="securityMeasure"
                    value={state.securityMeasure}
                    onChange={handlePlainText}  />
                </Form.Group>

                <Form.Group style={{marginBottom:'40px'}}>
                  <Form.Label>Information to IT at the time of project kick-off</Form.Label>
                  <Form.Control 
                    type="text" 
                    name="informIT"
                    value={state.informIT}
                    onChange={handlePlainText}  />
                </Form.Group>

                <Form.Group style={{marginBottom:'40px'}}>
                  <Form.Label>Work stations type provided in Evoke </Form.Label>
                  <Form.Group style={{marginBottom:'30px'}}>
                    <Button 
                      size="sm" 
                      variant={state.workStationFirstBtn} 
                      onClick={handleWorkStation} 
                      value={state.workStationValue[0]} 
                      style={{marginRight:'15px', width: '80px'}}> Laptop 
                    </Button> 
                    <Button 
                      size="sm" 
                      variant={state.workStationSecondBtn} 
                      onClick={handleWorkStation} 
                      value={state.workStationValue[1]} 
                      style={{marginRight:'15px', width: '80px'}}> VM 
                    </Button>
                    <Button 
                      size="sm" 
                      variant={state.workStationThirdBtn} 
                      onClick={handleWorkStation} 
                      value={state.workStationValue[2]} 
                      style={{marginRight:'15px', width: '80px'}}> Cloud 
                    </Button>
                  </Form.Group>  
                </Form.Group>

                <Form.Group style={{marginBottom:'40px'}}>
                  <Form.Label> Development type </Form.Label>
                  <Form.Group style={{marginBottom:'30px'}}>
                    <Button 
                      size="sm" 
                      variant={state.devTypeFirstBtn} 
                      onClick={handleDevType} 
                      value={state.devTypeValue[0]} 
                      style={{marginRight:'15px', width: '80px'}}> Local 
                    </Button> 
                    <Button 
                      size="sm" 
                      variant={state.devTypeSecondBtn} 
                      onClick={handleDevType} 
                      value={state.devTypeValue[1]} 
                      style={{marginRight:'15px'}}> Cloud Plateform 
                    </Button>
                    <Button 
                      size="sm" 
                      variant={state.devTypeThirdBtn} 
                      onClick={handleDevType} 
                      value={state.devTypeValue[2]} 
                      style={{marginRight:'15px'}}> Client Plateform 
                    </Button>
                  </Form.Group>       
                </Form.Group>

                <Form.Group style={{marginBottom:'40px'}}>
                  <Form.Label>Websites need to be allowed</Form.Label>
                  <Form.Control 
                    type="text" 
                    name="allowedWebsite"
                    value={state.allowedWebsite}
                    onChange={handlePlainText} 
                    />
                    <Form.Text className="text-muted"> Optional field. Enter the website URL in this format (comma saperated): https://www.evoketechnologies.com/  </Form.Text> 
                </Form.Group>

                <Form.Group style={{marginBottom:'40px'}}>
                  <Form.Label>NDA/DPA (Data Privacy Agreement) signed ? </Form.Label>
                  <Form.Group style={{marginBottom:'30px'}}>
                    <Button 
                      size="sm" 
                      variant={state.NDAsignedFirst} 
                      name="Yes"
                      onClick={handleNDAsigned} 
                      value={state.NDAsignedFirst} 
                      style={{marginRight:'15px', width: '80px'}}> Yes 
                    </Button> 
                    <Button 
                      size="sm" 
                      variant={state.NDAsignedSecond} 
                      name="No"
                      onClick={handleNDAsigned} 
                      value={state.NDAsignedSecond}  
                      style={{marginRight:'15px', width: '80px'}}> No 
                    </Button>
                  </Form.Group>       
                </Form.Group>

                <Form.Group style={{marginBottom:'40px'}}>
                  <Form.Label>Did all the project related documents (security, GDPR complaiance and MSA) are collected from client ? </Form.Label>
                  <Form.Group style={{marginBottom:'30px'}}>
                    <Button 
                      size="sm" 
                      variant={state.GDPRcomplianceFirst} 
                      name="Yes"
                      onClick={handleGDPRcompliance} 
                      value={state.GDPRcomplianceFirst} 
                      style={{marginRight:'15px', width: '80px'}}> Yes 
                    </Button> 
                    <Button 
                      size="sm" 
                      variant={state.GDPRcomplianceSecond} 
                      name="No"
                      onClick={handleGDPRcompliance} 
                      value={state.GDPRcomplianceSecond} 
                      style={{marginRight:'15px', width: '80px'}}> No 
                    </Button>
                  </Form.Group>       
                </Form.Group>

                <Form.Group style={{marginBottom:'40px'}}>
                  <Form.Label>Cyber security induction meeting conducted with client as well as in house (importance of data security to followed by all users) ? </Form.Label>
                  <Form.Group style={{marginBottom:'30px'}}>
                    <Button 
                      size="sm" 
                      variant={state.CyberSecConductedFirst} 
                      name="Yes"
                      onClick={handleCyberSecConducted} 
                      value={state.CyberSecConductedFirst} 
                      style={{marginRight:'15px', width: '80px'}}> Yes 
                    </Button> 
                    <Button 
                      size="sm" 
                      variant={state.CyberSecConductedSecond} 
                      name="No"
                      onClick={handleCyberSecConducted} 
                      value={state.CyberSecConductedSecond} 
                      style={{marginRight:'15px', width: '80px'}}> No 
                    </Button>
                  </Form.Group>       
                </Form.Group>

                <Form.Group style={{marginBottom:'40px'}}>
                  <Form.Label>Any project risks identified in the course of interims of security breach or calamities ?</Form.Label>
                  <Form.Control 
                    type="text" 
                    name="securityBreach"
                    value={state.securityBreach}
                    onChange={handlePlainText} 

                  />
                </Form.Group>

                <Form.Group style={{marginBottom:'40px'}}>
                  <Form.Label>Insurance coverage in case of disater issues ? </Form.Label>
                  <Form.Group style={{marginBottom:'30px'}}>

                    <Button 
                      size="sm" 
                      variant={state.DisasterInsuCoveredFirst} 
                      name="Yes"
                      onClick={handleDisasterInsuCovered}
                      value={state.DisasterInsuCoveredFirst}   
                      style={{marginRight:'15px', marginBottom:'15px', width: '80px'}}> Yes 
                    </Button> 
                    <Button 
                      size="sm" 
                      variant={state.DisasterInsuCoveredSecond} 
                      name="No"
                      onClick={handleDisasterInsuCovered}
                      value={state.DisasterInsuCoveredSecond}  
                      style={{marginBottom:'15px', width: '80px'}}> No 
                    </Button>
                    {state.showInsuranceDetails && 
                      <div >
                        <Form.Text className="text-muted" style={{marginLeft:'20px'}}> Details for insurance company coverage terms and insurance company spoc</Form.Text> 
                        <Form.Control 
                          type="text" 
                          style={{marginLeft:'20px', width: '97%' }}
                          name="disasterDetails"
                          value={state.disasterDetails}
                          onChange={handlePlainText}  />
                      </div>
                    }                     

                  </Form.Group>                      
                </Form.Group>

                <Form.Group style={{marginBottom:'40px'}}>
                  <Form.Label> Does client need any isolated environment requirement ? </Form.Label>
                  <Form.Group style={{marginBottom:'30px'}}>
                    <Button 
                      size="sm" 
                      variant={state.IsolatedEnvReqFirst} 
                      name="Yes"
                      onClick={handleIsolatedEnvReq}
                      value={state.IsolatedEnvReqFirst}  
                      style={{marginRight:'15px', marginBottom:'15px', width: '80px'}}> Yes 
                    </Button> 
                    <Button 
                      size="sm" 
                      variant={state.IsolatedEnvReqSecond} 
                      name="No"
                      onClick={handleIsolatedEnvReq}
                      value={state.IsolatedEnvReqSecond}  
                      style={{marginRight:'15px', marginBottom:'15px', width: '80px'}}> No 
                    </Button>

                    {state.showIsolatedDetails && 
                      <div >
                        <Form.Text 
                          className="text-muted" 
                          style={{marginLeft:'20px'}}> Details of physical isolation of network, physical isolation for workspace, DLP etc
                        </Form.Text> 
                        <Form.Control 
                          type="text" 
                          name="isolationDetails"
                          value={state.isolationDetails}
                          onChange={handlePlainText} 
                          style={{marginLeft:'20px', width: '97%' }}  />
                      </div>
                    }

                  </Form.Group>                      
                </Form.Group>

                <Form.Group style={{marginBottom:'40px'}}>
                  <Form.Label>Does client require DLP/Encryption enabled laptops for their users ? </Form.Label>
                  <Form.Group style={{marginBottom:'30px'}}>
                    <Button 
                      size="sm" 
                      variant={state.DLPreqFirst} 
                      name="Yes"
                      onClick={handleDLPreq}
                      value={state.DLPreqFirst}  
                      style={{marginRight:'15px', width: '80px'}}> Yes 
                    </Button> 
                    <Button 
                      size="sm" 
                      variant={state.DLPreqSecond} 
                      name="No"
                      onClick={handleDLPreq}
                      value={state.DLPreqSecond}  
                      style={{marginRight:'15px', width: '80px'}}> No 
                    </Button>
                  </Form.Group>                      
                </Form.Group>

                <Form.Group style={{marginBottom:'40px'}}>
                  <Form.Label>Is client providing Email services to user for regular business communication ? </Form.Label>
                  <Form.Group style={{marginBottom:'60px'}}>
                    <Button 
                      size="sm" 
                      variant={state.ClientEmailProvidedFirst} 
                      name="Yes"
                      onClick={handleClientEmailProvided}
                      value={state.ClientEmailProvidedFirst}   
                      style={{marginRight:'15px', width: '80px'}}> Yes 
                    </Button> 
                    <Button 
                      size="sm" 
                      variant={state.ClientEmailProvidedSecond} 
                      name="No"
                      onClick={handleClientEmailProvided}
                      value={state.ClientEmailProvidedSecond}  
                      style={{marginRight:'15px', width: '80px' }}> No 
                    </Button>
                  </Form.Group>                      
                </Form.Group>


                {/* <Form.Group controlId="formBasicCheckbox" style={{marginBottom:'30px'}}>
                  <Form.Check type="checkbox" label = "Yes, I have re-checked my response and I am ready to submit" />
                </Form.Group> */}

              </Form>

              <Button 
                variant="danger" 
                onClick={() => window.location.reload()}
                style={{marginBottom:'80px', marginLeft:'190px', marginRight:'15px', width: '130px'}}>   Reset 
              </Button>

              <Button 
                variant="primary" 
                type="submit" 
                style={{marginBottom:'80px', marginLeft:'20px', marginRight:'15px', width: '130px'}}> Submit 
              </Button>
              
            </div>

          </Col>

        </Row>

      </Container>

    </div> 
      
  )
  
}

export default ClinetForm;