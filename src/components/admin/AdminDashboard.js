import React, { useState, useEffect } from "react";
import RowHeaderValue from "./RowHeaderValue";
import ShareButtonSection from "./ShareButtonSection";
import CompleteTable from "../table/CompleteTable";
import axios from "axios";
import IconSubmitted from "../../assets/images/Icon_submitted.svg"
import IconPending from "../../assets/images/Icon_Pending.svg"
import IconApproved from "../../assets/images/Icon_approved.svg"
import IconProjects from "../../assets/images/Icon_Projects.svg"

import Logo from "../../assets/images/eoke_logo.svg";
// import User from "../../assets/images/user.svg"

import { Redirect, useHistory } from "react-router-dom";

export default function AdminDashboard() {
  function handleLogout() {
    sessionStorage.removeItem("auth-token");
    checkAuth();
  }

  const history = useHistory();

  const checkAuth = () => {
    if (!sessionStorage.getItem("auth-token")) {
      history.push("/");
    } else {
      const authToken = "123456abcdef";
      if (sessionStorage.getItem("auth-token") === authToken) {
        return <Redirect to="/admin_dashboard" />;
      } else {
        history.push("/");
      }
    }
  };
  checkAuth();

  const [data, setData] = useState([]);
  const [totalCount, setTotalCount] = useState("");
  const [pendingCount, setPendingCount] = useState("");
  const [submittedCount, setSubmittedCount] = useState("");
  const [completedCount, setCompletedCount] = useState("");

  useEffect(() => {
    axios("http://localhost:5000/clientInfo/")
      .then((res) => {
        setData(res.data);
        setTotalCount(res.data.length);
        setPendingCount(
          res.data.reduce(function (n, person) {
            return n + (person.status === "Pending");
          }, 0)
        );
        setSubmittedCount(
          res.data.reduce(function (n, person) {
            return n + (person.status === "Submitted");
          }, 0)
        );

        setCompletedCount(
          res.data.reduce(function (n, person) {
            return n + (person.status === "Completed");
          }, 0)
        );
        // console.log(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  // var pendingCount = res.data.reduce(function (n, person) {
  //   return n + (person.status === "Pending");
  // }, 0);
  // console.log(pendingCount);

  return (
    <div>
      <div className="navbar navbar-dark sticky-top flex-md-nowrap p-0 shadow header_nav">
        <a
          className="navbar-brand col-md-3 col-lg-2 me-0 px-3"
          href="https://www.evoketechnologies.com/"
        >
          <img src={Logo} alt="Evoke Technologies" />
        </a>

        <ul className="navbar-nav px-3">
          <li className="nav-item text-nowrap">
            <button onClick={handleLogout}> Logout</button>
          </li>
        </ul>
      </div>

      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12 ms-sm-auto col-lg-12">
            <ShareButtonSection />

            <div className="row">
              <RowHeaderValue projectStatus="Projects" iconImg={IconSubmitted} count={totalCount} />
              <RowHeaderValue projectStatus="Pending" iconImg={IconPending} count={pendingCount} />
              <RowHeaderValue projectStatus="Submitted" iconImg={IconApproved} count={submittedCount} />
              <RowHeaderValue projectStatus="Completed" iconImg={IconProjects} count={completedCount} />
            </div>

            <CompleteTable data={data} />
          </div>
        </div>
      </div>
    </div>
  );
}
