import React from "react"
import { useTable, useSortBy, useGlobalFilter, usePagination } from "react-table"
// import axios from "axios"
import { format } from "date-fns"
import "./table.css"
import GlobalFilter from "./GlobalFilter"
import rightIcon from "../../assets/images/right-icon.svg"
import leftIcon from "../../assets/images/left-icon.svg"

function CompleteTable({data}){
  
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
        accessor: "projectNameByIT",
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
        maxWidth: 200,
        minWidth: 80,
        width: 100,
      },
      {
        Header: "STATUS",
        accessor: "status",
        maxWidth: 300,
        minWidth: 180,
        width: 200,
      },
      {
        Header: "ACTION",
        accessor: "workStationSelected",
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
    // gotoPage,
    // pageCount,
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
                  //     background: "aliceblue",
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
                  return (
                    <td
                      {...cell.getCellProps()}
                      style={{
                        paddingLeft: "20px",
                        textAlign: "center",
                        //   border: "solid 1px gray",
                        //   background: "papayawhip",
                      }}
                    >
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
      <div class="table-pagination">
      <label>Rows per page:</label>
        <select
          value={pageSize}
          onChange={(e) => setPageSize(Number(e.target.value))}
          className= "pageNum"
        >
          {[10, 20, 30].map((pageSize) => (
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
        {/* <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {"<<"}
        </button>{" "} */}
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          <img src={leftIcon} alt="prev" />
        </button>{" "}
        <button onClick={() => nextPage()} disabled={!canNextPage}>
        <img src={rightIcon} alt="next" />
        </button>{" "}
        {/* <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {">>"}
        </button>{" "} */}
        </div>
        {/* <span>
          | Go to page:{" "}
          <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={(e) => {
              const pageNumber = e.target.value
                ? Number(e.target.value) - 1
                : 0;
              gotoPage(pageNumber);
            }}
            style={{ width: "50px" }}
          />
        </span>{" "} */}
        
      </div>
    </>
  );
};

export default CompleteTable;