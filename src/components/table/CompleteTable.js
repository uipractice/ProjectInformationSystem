import React from "react";
import DeleteImg from "../../assets/images/delete.svg";
import {
  useTable,
  useSortBy,
  useGlobalFilter,
  usePagination,
} from "react-table";
// import axios from "axios"
import { format } from "date-fns";
import "./table.css";
import GlobalFilter from "./GlobalFilter";

function CompleteTable({ data }) {
  // const [data, setData] = useState([])

  // useEffect(() => {
  //   axios("http://localhost:5000/clientInfo/")
  //     .then((res) => {
  //       setData(res.data);
  //       console.log(res.data);
  //     })
  //     .catch((err) => console.log(err));
  // }, []);

  

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
        // accessor: "projectNameByIT",
        Cell: ({ row }) => {
          return (
            <div>
              <a
                href="#/"
                onClick={(e) => {
                  console.log(row.original);
                }}
              >
                {row.original.projectNameByIT}
              </a>
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
        Cell: ({row}) => (
          <a
            href="#/"
            onClick={(e) => {
              console.log(row.original);
            }}
          >
            <img src={DeleteImg} alt="Evoke Technologies" />
          </a>
        ),
      },
    ],
    []
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
        <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
      </div>

      <select name="hall" id="hall">
        <option> Pending </option>
        {/* <option selected> Filter All </option> */}
        <option> Completed </option>
        <option> Submitted </option>
        <option> Active </option>
        <option> Deleted </option>
      </select>

      <br></br>
      <br></br>
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
                      } else if (cell.value === "Completed"){
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
          {[7, 10, 20, 30, 50].map((pageSize) => (
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
            {"<"}
          </button>{" "}
          <button onClick={() => nextPage()} disabled={!canNextPage}>
            {">"}
          </button>{" "}
        </div>
      </div>
    </>
  );
}

export default CompleteTable;
