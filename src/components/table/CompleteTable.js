import React, { useState, useEffect } from 'react';
import DeleteImg from '../../assets/images/delete.svg';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import UpDownImg from '../../assets/images/sorting.svg';
import {
  useTable,
  useSortBy,
  useGlobalFilter,
  usePagination,
} from 'react-table';
import { format } from 'date-fns';
import './table.css';
import GlobalFilter from './GlobalFilter';

import rightIcon from '../../assets/images/right-icon.svg';
import leftIcon from '../../assets/images/left-icon.svg';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getApiUrl } from '../utils/helper';

toast.configure();

Modal.setAppElement('#root');
const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));
function CompleteTable({ data }) {
  const [filteredData, setFilteredData] = useState([]);
  const [searchValue, setSearchValue] = useState();

  const [rowOriginal, setRowOriginal] = useState({});

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [noRecords, setNoRecords] = useState(false);

  const [enteredValue, setEnteredValue] = useState('');
  const [filterValue,setFilterValue]=useState('Active')

  const classes = useStyles();

  useEffect(() => {
    setDefaultFilterData();
  }, [data]);

  const setDefaultFilterData = () => {
    if (data.length) {
      let filterResult = data.filter((row) => row.status !== 'Deleted');
      setFilteredData(addSerialNo(filterResult));
    }
  };

  const addSerialNo = (dataArr = [], tableFilter = false) => {
    return dataArr.map((value, index) => ({
      ...(tableFilter ? value.original : value),
      serial: index + 1,
    }));
  };

  function handleSelectedStatus(selectedState) {
    setFilterValue(selectedState);
    setEnteredValue('');
    setSearchValue('');
    let filterResult;
    if (selectedState === 'Active')
      filterResult = data.filter((row) => row.status !== 'Deleted');
    else if (selectedState === 'All Project') filterResult = data;
    else filterResult = data.filter((row) => row.status === selectedState);

    setFilteredData(addSerialNo(filterResult));
    if(filterResult.length > 0){
      setNoRecords(false);
    }else{
      setNoRecords(true);
    }
  }

  function handleInputChange(evt) {
    const value = evt.target.value.replace(/[^a-zA-Z0-9 ]/g, '');
    if (value.match(/[a-zA-Z0-9]+([\s]+)*$/)) {
      setRowOriginal({
        ...rowOriginal,
        deleteReason: value,
      });
    } else {
      setRowOriginal({
        ...rowOriginal,
        deleteReason: '',
      });
    }
  }

  const handleUpdateStatus = (e) => {
    e.preventDefault();
    rowOriginal.status = 'Deleted';
    const id = rowOriginal._id;
    axios
      .post(getApiUrl(`clientInfo/deleteStatus/${id}`), rowOriginal)
      .then((res) => {
        toast.warn('Record has been marked DELETED !', {
          autoClose: 2900,
        });
        setIsModalOpen(false);
        console.log(res.data);
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      })
      .catch((err) => console.log(err.response));
  };
  const customSorting = (c1, c2) => {
    return c1.localeCompare(c2);
  };
  const columns = React.useMemo(
    () => [
      {
        Header: 'PROJECT NAME',
        accessor: 'projectNameByIT',
        width: 231,
        sortType: (a, b) => {
          return customSorting(
            a.original.projectNameByIT,
            b.original.projectNameByIT
          );
        },
        Cell: ({ row }) => {
          return (
            <Link
              to={{
                pathname: `/view/${row.original._id}`,
                state: {
                  projectNameByIT: row.original.projectNameByIT,
                  projectManager: row.original.projectManager,
                  email: row.original.email,
                  practice: row.original.practice,
                  status: row.original.status,
                  id: row.original._id,
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
                  deleteReason: row.original.deleteReason,
                  reshareReason: row.original.reshareReason,
                  uploadedFiles: row.original.uploadedFiles,
                },
              }}
              title={row.original.projectNameByIT}
            >
              {row.original.projectNameByIT}
            </Link>
          );
        },
        sticky: 'left',
      },
      {
        Header: 'PROJECT MANAGER',
        accessor: 'projectManager',
        width: 230,
        sticky: 'left',
        sortType: (a, b) => {
          return customSorting(
            a.original.projectManager,
            b.original.projectManager
          );
        },
      },
      {
        Header: 'PRACTICE NAME',
        accessor: 'practice',
        sticky: 'left',
        width: 200,
        sortType: (a, b) => {
          return customSorting(a.original.practice, b.original.practice);
        },
      },
      {
        Header: 'ASSIGN DATE',
        accessor: 'createdAt',
        width: 167,
        sortType: (a, b) => {
          return customSorting(a.original.createdAt, b.original.createdAt);
        },
        Cell: ({ value }) => {
          return format(new Date(value), 'dd/MM/yyyy');
        },
      },
      {
        Header: 'UPDATED DATE',
        accessor: 'updatedAt',
        width: 187,
        sortType: (a, b) => {
          return customSorting(a.original.updatedAt, b.original.updatedAt);
        },
        Cell: ({ value }) => {
          return format(new Date(value), 'dd/MM/yyyy');
        },
      },
      {
        Header: 'STATUS',
        accessor: 'status',
        width: 150,
        sortType: (a, b) => {
          if (a.original.status === undefined) {
            a.original['status'] = '';
          }
          if (b.original.status === undefined) {
            b.original['status'] = '';
          }
          return customSorting(a.original.status, b.original.status);
        },
      },
      {
        Header: 'ACTION',
        width: 120,
        Cell: ({ row }) => (
          <a
            {...(row.original.status === 'Deleted'
              ? { className: 'delete-icon disableDeleteBtn' }
              : { className: 'delete-icon ' })}
            onClick={(e) => {
              setRowOriginal({
                ...row.original,
                deleteReason: '',
              });
              setIsModalOpen(true);
            }}
          >
            <img src={DeleteImg} alt='Evoke Technologies' />
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
    gotoPage,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    prepareRow,
    state,
    setGlobalFilter,
    rows: filteredTableData,
  } = useTable(
    {
      columns,
      data: filteredData,
      initialState: {
        pageSize: 5,
        sortBy: [
          {
            id: 'updatedAt',
            desc: true,
          },
        ],
      },
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const { globalFilter, pageIndex, pageSize } = state;

  var start, end;
  if (pageIndex === 0) {
    start = 1;
    end = filteredData.length > pageSize ? pageSize : filteredData.length;
  } else {
    start = pageIndex * pageSize + 1;
    end =
      filteredData.length >= (pageIndex + 1) * pageSize
        ? (pageIndex + 1) * pageSize
        : filteredData.length;
  }

  useEffect(() => {
    if (filteredTableData.length && globalFilter && searchValue){
      setFilteredData(addSerialNo(filteredTableData, true));
      setNoRecords(false);
      setEnteredValue('')
    } else if (searchValue === ''){
      setFilteredData(
        addSerialNo(data.filter((item) => item.status !== 'Deleted'))
      );
      handleSelectedStatus(filterValue);
      setEnteredValue('')
      setNoRecords(false);
    }
      if(filteredTableData.length === 0 && searchValue) {
        setNoRecords(true);
      }else{
        setNoRecords(false);
      }
  }, [searchValue]);

  return (
    <div>
      <br></br>
      <div className='filter-row'>
        <h5>PROJECT DETAILS</h5>
        <div>
          <FormControl className={classes.formControl}>
            <Select
              // defaultValue='Active'
              onChange={(e) => {
                handleSelectedStatus(e.target.value);
              }}
              displayEmpty
              value={filterValue}
              className={classes.selectEmpty}
              inputProps={{ 'aria-label': 'Without label' }}
            >
              <MenuItem value='Active'>Active</MenuItem>
              <MenuItem value='Pending'>Pending</MenuItem>
              <MenuItem value='Submitted'>Submitted</MenuItem>
              <MenuItem value='Approved'>Approved</MenuItem>
              <MenuItem value='Deleted'>Deleted</MenuItem>
              <MenuItem value='All Project'>All Projects</MenuItem>
            </Select>
          </FormControl>
          <GlobalFilter
            setFilter={(value) => {
              setGlobalFilter(value);
              setSearchValue(value);
            }}
          />
        </div>
      </div>

      <div>
        <Modal
          isOpen={isModalOpen}
          shouldCloseOnOverlayClick={false}
          onRequestClose={() => {
            setIsModalOpen(false);
          }}
          className='modalDesign deleteModal'
        >
          <h2>Are you sure?</h2>
          <button
            className='_modal-close'
            onClick={() => {
              setIsModalOpen(false);
            }}
          >
            <svg className='_modal-close-icon' viewBox='0 0 40 40'>
              <path d='M 10,10 L 30,30 M 30,10 L 10,30' />
            </svg>
          </button>
          <form>
            <p>Please enter the reason to delete the record.</p>
            <textarea
              type='text'
              autoFocus={true}
              style={{ color: 'black' }}
              onChange={handleInputChange}
              name='deleteReason'
              value={rowOriginal.deleteReason}
            />
            <br></br>
            <span style={{ fontSize: '10px' }}>
              Note: *Allows only alphabetics and numerics
            </span>
            <p className='descr'>
              {' '}
              Take a deep breath! <br />
              Because if deleted once, it is gone forever.
            </p>
            <br></br>

            <div className='row'>
              <div className='col-md-6 text-right padding0'>
                <button
                  className='form-control btn btn-primary'
                  onClick={() => {
                    setIsModalOpen(false);
                  }}
                >
                  Cancel
                </button>
              </div>
              <div className='col-md-6'>
                {rowOriginal.deleteReason ? (
                  <button
                    onClick={handleUpdateStatus}
                    className='form-control btn btn-primary delete-btn'
                  >
                    Delete
                  </button>
                ) : (
                  <button
                    className='form-control btn btn-primary delete-btn'
                    disabled
                  >
                    Delete
                  </button>
                )}
              </div>
            </div>
          </form>
        </Modal>
      </div>

      <div className='table-responsive grid tableFixHead'>
        <table {...getTableProps()} className='table table-striped '>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th
                    {...column.getHeaderProps(
                      column.getSortByToggleProps({
                        title: undefined,
                        style: {
                          minWidth: column.minWidth,
                          width: column.width,
                        },
                      })
                    )}
                  >
                    {column.render('Header')}
                    <span>
                      {column.isSorted &&
                        (column.isSortedDesc ? (
                          <img src={UpDownImg} alt='up' />
                        ) : (
                          <img src={UpDownImg} alt='down' />
                        ))}
                    </span>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {!noRecords ? page.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    let style = {};
                    style = { textAlign: 'left' };
                    if (cell.column.id === 'status') {
                      if (cell.value === 'Pending') {
                        style = { color: '#F16A21', textAlign: 'left' };
                      } else if (cell.value === 'Submitted') {
                        style = { color: '#0066FF', textAlign: 'left' };
                      } else if (cell.value === 'Completed') {
                        style = { color: '#13BC86', textAlign: 'left' };
                      } else if (cell.value === 'Approved') {
                        style = { color: 'green', textAlign: 'left' };
                      }
                    }
                    return (
                      <td {...cell.getCellProps({ style })}>
                        {cell.render('Cell')}
                      </td>
                    );
                  })}
                </tr>
              );
            }): <tr style={{textAlign: 'center'}}><span>No Records found</span></tr>}
          </tbody>
        </table>
        <div className='table-pagination'>
         {!noRecords && <span className='paginate'>
            <b>{start}</b> to <b>{end}</b> of <b>{filteredData.length}</b>
          </span>}
          {/* <label>Rows per page:</label>
        <select
          value={pageSize}
          onChange={(e) => setPageSize(Number(e.target.value))}
          className='pageNum'
        >
          {[7, 15, 25, 50, 100].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              {pageSize}
            </option>
          ))}
        </select> */}
         {!noRecords && <span>
            Page{' '}
            <strong>
              {pageIndex + 1} of {pageOptions.length}
            </strong>{' '}
          </span>}
          {!noRecords && <div className='prev-next'>
            <button onClick={() => previousPage()} disabled={!canPreviousPage}>
              <img src={leftIcon} alt='prev' />
            </button>{' '}
            <button onClick={() => nextPage()} disabled={!canNextPage}>
              <img src={rightIcon} alt='next' />
            </button>{' '}
          </div>}
          {!noRecords && <input className='pagination-search'
          type= 'number'
           onChange={(e) => {
            const value= e.target.value-1;
            const enteredValue = e.target.value.match(/^([1-9]\d*)?$/)['input'] ? e.target.value : ''; 
            if(pageOptions.length > value){
              gotoPage(value);
              setEnteredValue(enteredValue);
              setNoRecords(false);
            }else{
              setEnteredValue(e.target.value);
              setNoRecords(true);
            }
          } }
          value={enteredValue}
          />}
        </div>
      </div>
    </div>
  );
}

export default CompleteTable;
