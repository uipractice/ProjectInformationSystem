import React, { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import "./Login.css";
import "../../index.css";
import AuthServices from "../../services/AuthServices";
import { saveAuthToken } from "../utils/authToken";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { saveUser } from "../utils/userDetails";

import showPassword from '../../assets/images/show-password.svg'
import hidePassword from '../../assets/images/hide-password.svg'

toast.configure();

function Login() {
  const inputRef = useRef(null);
  const [passwordImage, setPasswordImage] = useState(showPassword)

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const [user, setUser] = React.useState({
    userName: "",
    password: "",
  });

  const history = useHistory();

  function handleCredentials(evt) {
    if (evt.target.name == "userName") {
      let lastChar = evt.target.value.charAt(evt.target.value.length - 1)
      if (lastChar === '@') {
        setUser({
          ...user,
          [evt.target.name]: evt.target.value + 'evoketechnologies.com',
        });
      }
      else {
        setUser({
          ...user,
          [evt.target.name]: evt.target.value,
        });
      }
    }
    else {
      setUser({
        ...user,
        [evt.target.name]: evt.target.value,
      });
    }
  }

  function handlePasswordVisibility() {
    var x = document.getElementById("password");
    if (x.type === "password") {
      x.type = "text";
      setPasswordImage(hidePassword)
    } else {
      x.type = "password";
      setPasswordImage(showPassword)
    }
  }

  function handleLogin(e) {
    e.preventDefault();
    setUser({
      ...user,
      userName: "",
      password: "",
    });
    AuthServices.login(user)
      .then((res) => {
        if (res.data.accessToken) {
          saveAuthToken(res.data.accessToken)
          saveUser(JSON.stringify(res.data.user))
          if (res.data.user.status == "InActive") {
            toast.error("Account Inactive", {
              autoClose: 2000,
            });
          }
          else if (res.data.user.password == "123") {
            toast.info("Please Change the password", {
              autoClose: 2000,
            });
            history.push("/reset-password");
          }
          else {
            history.push("/dashboard");
          }

        } else {
          toast.error(res.data.message + ` ${"!!"}`, {
            autoClose: 2000,
          });
        }
      })
      .catch((error) => {
        console.log("login", error);
        setUser({
          ...user,
          userName: "",
          password: "",
        });
      });
  }

  function SubmitButton() {
    if (user.userName && user.password) {
      return (
        <button className="btn btn-primary btn_blue w-100p" type="submit">
          SIGN IN
        </button>
      );
    } else {
      return (
        <button className="btn btn-primary btn_blue w-100p" disabled>
          SIGN IN
        </button>
      );
    }
  }

  return (
    <div className="container-fluid nopad">
      <div className="container_login">
        <div className="wrap_login">
          <form className="login_form" onSubmit={handleLogin}>
            <div className="form_main">
              <div className="login-form-title ">
                <h3>Sign in</h3>
                <p>Welcome to Project Information System</p>
              </div>

              <div className="validate-input m-b-20">
                <label className="form-label">Username</label>
                <input
                  ref={inputRef}
                  type="text"
                  className="form-control"
                  onChange={handleCredentials}
                  name="userName"
                  value={user.userName}
                />
              </div>

              <div className="validate-input form-password m-b-40">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  className="form-control"
                  onChange={handleCredentials}
                  name="password"
                  value={user.password}
                  id="password"
                />
                <img src={passwordImage} onClick={() => { handlePasswordVisibility() }} />
              </div>

              <div className="col-md-12 form_btn_group">
                <SubmitButton />
              </div>
            </div>
          </form>

          <div className="login_more"></div>
        </div>
      </div>
    </div>
  );
}

export default Login;
