import React, { useState} from "react";
import DeleteImg from "../../assets/images/delete.svg";
import axios from "axios";
import { Link } from "react-router-dom";
import Modal from "react-modal";
import {
  useTable,
  useSortBy,
  useGlobalFilter,
  usePagination,
} from "react-table";
import { format } from "date-fns";
import "./table.css";
import GlobalFilter from "./GlobalFilter";

import rightIcon from "../../assets/images/right-icon.svg";
import leftIcon from "../../assets/images/left-icon.svg";

Modal.setAppElement("#root");
function CompleteTable({ data }) {

  // const [isModalOpen, setIsModalOpen] = useState(false);
  // const [isDeleteConfirm, setIsDeleteConfirm] = useState(false);

  const [stateD, setStateD] = useState({

    isModalOpen: false,
    isDeleteConfirm: false,
  });

  const[rowOriginal, setRowOriginal] = useState({})

  function handleUpdateStatus(row) {
    row.original.status = "Deleted";
    const updateStatus = row.original;
    const id = row.original._id;

    console.log(updateStatus.status);
    console.log(updateStatus);
    console.log(id);

    axios
      .post("http://localhost:5000/clientInfo/delete/" + id, updateStatus)
      .then((res) => {
        console.log(res.data);
        window.location.reload();
        // setIsModalOpen(false);
      })
      .catch((err) => console.log(err.response));
  }

  data.forEach((value, index) => {
    value.serial = index + 1;
  });

  const columns = React.useMemo(
    () => [
      {
        Header: "SL.NO",
        accessor: "serial",
        filterable: false,
      },

      {
        Header: "PROJECT NAME",
        Cell: ({ row }) => {
          return (
            <div>
              <Link
                to={{
                  pathname: `/formv/${row.original._id}`,
                  state: {
                    projectNameByIT: row.original.projectNameByIT,
                    projectManager: row.original.projectManager,
                    email: row.original.email,
                    practice: row.original.practice,
                    status: row.original.status,

                    projectName: row.original.projectName,
                    securityMeasure: row.original.securityMeasure,
                    informIT: row.original.informIT,
                    workStationSelected: row.original.workStationSelected,
                    devTypeSelected: row.original.devTypeSelected,
                    allowedWebsite: row.original.allowedWebsite,
                    isNDAsigned: row.original.isNDAsigned,
                    isGDPRcompliance: row.original.isGDPRcompliance,
                    isCyberSecConducted: row.original.isCyberSecConducted,
                    securityBreach: row.original.securityBreach,
                    isDisasterInsuCovered: row.original.isDisasterInsuCovered,
                    disasterDetails: row.original.disasterDetails,
                    showInsuranceDetails: row.original.showInsuranceDetails,
                    isIsolatedEnvReq: row.original.isIsolatedEnvReq,
                    isolationDetails: row.original.isolationDetails,
                    showIsolatedDetails: row.original.showIsolatedDetails,
                    isDLPreq: row.original.isDLPreq,
                    isClientEmailProvided: row.original.isClientEmailProvided,
                  },
                }}
              >
                {row.original.projectNameByIT}
              </Link>
            </div>
          );
        },
        sticky: "left",
      },
      {
        Header: "PROJECT MANAGER",
        accessor: "projectManager",
        sticky: "left",
      },
      {
        Header: "PRACTICE NAME",
        accessor: "practice",
        sticky: "left",
      },
      {
        Header: "ASSIGN DATE",
        accessor: "createdAt",
        Cell: ({ value }) => {
          return format(new Date(value), "dd/MM/yyyy");
        },
        maxWidth: 200,
        minWidth: 80,
        width: 100,
      },
      {
        Header: "SUBMITTED DATE",
        accessor: "updatedAt",
        Cell: ({ value }) => {
          return format(new Date(value), "dd/MM/yyyy");
        },
      },
      {
        Header: "STATUS",
        accessor: "status",
      },
      {
        Header: "ACTION",
        Cell: ({ row }) => (
          <a
            href="#/"
            onClick={(e) => {
              let rowData = row.original;
              setRowOriginal(rowData)
              setStateD({
                ...stateD,
                isModalOpen: true,
              });
              console.log("After model is opened");
              console.log(rowData);

              if (stateD.isDeleteConfirm) {
                console.log("Delete is clicked & working");
                handleUpdateStatus(row);
                console.log(rowData);
                // window.location.reload();
              }
            }}
          >
            <img src={DeleteImg} alt="Evoke Technologies" />
          </a>
        ),
      },
    ],
    [stateD]
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    setPageSize,
    prepareRow,
    state,
    setGlobalFilter,
  } = useTable({ columns, data }, useGlobalFilter, useSortBy, usePagination);

  const { globalFilter, pageIndex, pageSize } = state;

  return (
    <>
      <br></br>
      <div className="filter-row">
        <h5>PROJECTS DETAILS</h5>
        <div>
          <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
          <select name="hall" id="hall">
            <option> Pending </option>
            {/* <option selected> Filter All </option> */}
            <option> Completed </option>
            <option> Submitted </option>
            <option> Active </option>
            <option> Deleted </option>
          </select>
        </div>
      </div>

      <div>
        <Modal
          isOpen={stateD.isModalOpen}
          onRequestClose={() => {
            setStateD({
              isModalOpen: false,
            });
          }}
          className="modalDesign"
        >
          <h2>Are you sure?</h2>
          <p>Please enter the reason to delete the record.</p>

          <input type="text" />
          <br></br>
          <p>
            {" "}
            Do you really want to delete the records? This process cannot be
            undone.
          </p>
          <br></br>

          <div className="row">
            <div className="col-md-2">
              <button
                className="form-control btn btn-primary"
                onClick={() => {
                  setStateD({
                    ...stateD,
                    isModalOpen: false,
                  });
                }}
              >
                Cancel
              </button>
            </div>
            <div className="col-md-2">
              <button
                className="form-control btn btn-primary"
                onClick={() => {
                  console.log("Delete is clicked but not sure if api call is made");
                  setStateD({
                    // ...stateD,
                    isDeleteConfirm: true,
                    // isModalOpen: true,
                  });

                }}
              >
                Delete
              </button>
            </div>
          </div>
        </Modal>
      </div>

      <div className="table-responsive grid tableFixHead">
        <table {...getTableProps()} className="table table-striped ">
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    //   style={{
                    //     borderBottom: "solid 3px red",
                    //     color: "black",
                    //     fontWeight: "bold",
                    //   }}
                  >
                    {column.render("Header")}
                    <span>
                      {column.isSorted
                        ? column.isSortedDesc
                          ? " 🔽"
                          : " 🔼"
                        : ""}
                    </span>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    let style = {};
                    style = { textAlign: "center" };
                    if (cell.column.id === "status") {
                      if (cell.value === "Pending") {
                        style = { color: "#F16A21", textAlign: "center" };
                      } else if (cell.value === "Submitted") {
                        style = { color: "#0066FF", textAlign: "center" };
                      } else if (cell.value === "Completed") {
                        style = { color: "#13BC86", textAlign: "center" };
                      }
                    }
                    return (
                      <td {...cell.getCellProps({ style })}>
                        {cell.render("Cell")}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="table-pagination">
        <label>Rows/Page:</label>
        <select
          value={pageSize}
          onChange={(e) => setPageSize(Number(e.target.value))}
          className="pageNum"
        >
          {[6, 10, 20, 30, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              {pageSize}
            </option>
          ))}
        </select>
        <span>
          Page{" "}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{" "}
        </span>
        <div className="prev-next">
          <button onClick={() => previousPage()} disabled={!canPreviousPage}>
            <img src={leftIcon} alt="prev" />
          </button>{" "}
          <button onClick={() => nextPage()} disabled={!canNextPage}>
            <img src={rightIcon} alt="next" />
          </button>{" "}
        </div>
      </div>
    </>
  );
}

export default CompleteTable;
