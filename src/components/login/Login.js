import React from "react";
import { useHistory } from "react-router-dom";
import "./Login.css";
import "../../index.css";
import { useForm } from "react-hook-form";

function Login() {
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const adminUserName = "admin";
  const adminPassowrd = "123";

  const history = useHistory();

  function handleLogin(data) {
    if (
      adminUserName === data.enteredUserName &&
      adminPassowrd === data.enteredPassword
    ) {
      const token = "123456abcdef";
      sessionStorage.setItem("auth-token", token);
      history.push("/admin");
    } else {
      // {
      //   data.enteredUserName !== "admin" ||
      //     data.enteredUserName !== "12345" && (
      //       <small className="text-denger">
      //         <span>Enter the correct User name</span>
      //       </small>
      //     );
      // }
      alert("Please enter the correct user or password");
    }
  }

  return (
    <div className="container-fluid nopad">
      <div className="container_login">
        <div className="wrap_login">
          <form className="login_form" onSubmit={handleSubmit(handleLogin)}>
            <div className="form_main">
              <div className="login-form-title ">
                <h3>Sign in</h3>
                <p>Welcome to Project Management System</p>
              </div>

              <div className="validate-input m-b-20">
                <label className="form-label">Username</label>
                <input
                  type="text"
                  className="form-control"
                  {...register("enteredUserName", {
                    required: "Enter the User Name!",
                  })}
                />
                {errors.enteredUserName && (
                  <small className="text-denger">
                    {errors.enteredUserName.message}
                  </small>
                )}
              </div>

              <div className="validate-input m-b-40">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  className="form-control"
                  {...register("enteredPassword", {
                    required: "Enter the User Password!",
                  })}
                />
                {errors.enteredPassword && (
                  <small className="text-denger">
                    {errors.enteredPassword.message}
                  </small>
                )}
              </div>

              <div className="col-md-12 form_btn_group">
                <button
                  type="submit"
                  className="btn btn-primary btn_blue w-100p"
                >
                  SIGN IN
                </button>
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
