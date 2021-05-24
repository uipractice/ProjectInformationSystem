import React from 'react'
import { useHistory } from "react-router-dom";
import "./Login.css"
import "../../index.css"

function Login() {
	
	const [state, setState] = React.useState({

		adminUserName: "admin",
		adminPassowrd: "123",
		
		enteredUserName: "",
		enteredPassword: ""

	})

	const history = useHistory();

	function handleCredentials(evt){
		setState({
			...state,
			[evt.target.name]: evt.target.value
		  });   
	}
	
	//Not Working 
	function handleEnterKey(e){
		e.preventDefault()
		if(e.keyCode === 13){
			if(state.adminUserName===state.enteredUserName && state.adminPassowrd===state.enteredPassword){
				history.push('/admin_dashboard');
			}
		}		
	}

	function handleLogin(e){
		e.preventDefault()
		if(state.adminUserName===state.enteredUserName && state.adminPassowrd===state.enteredPassword){
			history.push('/admin_dashboard');
		}
	}

	return (
		<div className="container-fluid nopad">

			<div className="container_login">

				<div className="wrap_login">

					<form className="login_form ">

						<div className="form_main">

							<div className="login-form-title ">
								<h3>Sign in</h3>
								<p>Welcome to Evoke Management Dashboard</p>
							</div>

							<div className="validate-input m-b-20" >
								<label className="form-label">Username</label>
								<input type="text" className="form-control" onChange={handleCredentials} name="enteredUserName" />
								{/* <span className="validation_msg">Validation Message </span> */}
							</div>

							<div className="validate-input m-b-40">
								<label className="form-label">Password</label>
								<input type="password" className="form-control" onChange={handleCredentials} name="enteredPassword" />
							</div>

							<div className="col-md-12 form_btn_group">
								<button type="button" onClick={handleLogin} onKeyPress={handleEnterKey} className="btn btn-primary btn_blue w-100p">SIGN IN</button>
							</div>

						</div>
						
					</form>
						
					<div className="login_more" >
						{/* <img src="../../src/assets/images/evoke_logo.svg" className="banner_logo"/> */}
					</div>
						
				</div>

			</div>
		
		</div>

	)
}

export default Login
