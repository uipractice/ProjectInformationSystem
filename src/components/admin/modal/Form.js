import React from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import "./Container.css";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();

function Form({ closeModal }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleReset = () => {
    reset();
  };

  function onSubmitHandle(data) {
    const postState = {
      projectNameByIT: data.projectNameByIT,
      projectManager: data.projectManager,
      email: data.email,
      practice: data.practice,
      status: "Pending",
      deleteReason: "",
    };

    axios
      .post("http://localhost:5000/clientInfo/email", postState)
      .then((res) => {
        if (res.data === "success") {
          closeModal();
          toast.success("Data Saved Successfully !", {
            autoClose: 2000,
          });
          console.log(postState);

          setTimeout(() => {
            window.location.reload();
          }, 2000);
          
        } else {
          toast.error("Data Saved FAILED !", {
            autoClose: 2000,
          });
          console.log(postState);
        }
      })

      .catch((err) => console.log(err.response));
  }

  return (
    <form onSubmit={handleSubmit(onSubmitHandle)}>
      <div className="row">
        <div className="form-group col-md-6">
          <label htmlFor="projectNameByIT">Project Name</label>
          <input
            type="text"
            className="form-control"
            {...register("projectNameByIT", {
              required: "Enter the Project Name!",
            })}
          />
          {errors.projectNameByIT && (
            <small className="text-denger">
              {errors.projectNameByIT.message}
            </small>
          )}
        </div>

        <div className="form-group col-md-6">
          <label htmlFor="projectManager">Project Manager</label>
          <input
            type="text"
            className="form-control"
            {...register("projectManager", {
              required: "Enter the Manger Name!",
            })}
          />
          {errors.projectManager && (
            <small className="text-denger">
              {errors.projectManager.message}
            </small>
          )}
        </div>
      </div>

      <div className="form-group col-md-12">
        <label>Email address</label>
        <input
          type="email"
          className="form-control"
          placeholder=" "
          {...register("email", {
            required: "Enter the Email Id, you want to send the mail to!",
          })}
        />
        {errors.email && (
          <small className="text-denger">{errors.email.message}</small>
        )}
      </div>

      <div className="form-group col-md-6">
        <label>Practice Name </label>
        <select
          className="form-control"
          {...register("practice", { required: "Choose the Practice Team" })}
        >
          <option value=""></option>
          <option value="QA Practice">QA Practice</option>
          <option value="Oracle Practice">Oracle Practice</option>
          <option value="Java Practice">Java Practice</option>
          <option value="Microsoft Practice">Microsoft Practice</option>
          <option value="Other">Other Practice</option>
        </select>
        {errors.practice && (
          <small className="text-denger">{errors.practice.message}</small>
        )}
      </div>

      <div className="form-group row share">
        <div className="col-md-6"></div>
        <div className="col-md-6">
          <button
            className="form-control btn btn-primary"
            onClick={handleReset}
          >
            Reset
          </button>
          <button
            className="form-control btn btn-primary share-btn"
            type="submit"
          >
            Share
          </button>
        </div>
      </div>
    </form>
  );
}
export default Form;
