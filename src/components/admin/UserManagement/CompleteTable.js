import React, { useState, useEffect } from 'react';
import DeleteImg from '../../../assets/images/delete.svg';
import axios from 'axios';
import Modal from 'react-modal';
import { makeStyles } from '@material-ui/core/styles';
import UpDownImg from '../../../assets/images/sorting.svg';
import Edit from '../../../assets/images/edit-icon1.svg'
import {
  useTable,
  useSortBy,
  useGlobalFilter,
  usePagination,
} from 'react-table';
import '../../table/table.css';

import rightIcon from '../../../assets/images/right-icon.svg';
import leftIcon from '../../../assets/images/left-icon.svg';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getApiUrl } from '../../utils/helper';
import { exp3 } from '../../constants/regex'

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
function CompleteTable({ data, getEditForm }) {
  const [filteredData, setFilteredData] = useState([]);
  const searchValue = ''
  const [rowOriginal, setRowOriginal] = useState({});

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [noRecords, setNoRecords] = useState(false);

  const [enteredValue, setEnteredValue] = useState('');

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

  function handleInputChange(evt) {
    const value = evt.target.value.replace(/[^a-zA-Z0-9 ]/g, '');
    if (value.match(exp3)) {
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
    const id = rowOriginal._id;
    axios
      .delete(getApiUrl(`users/deleteUser/${id}`))
      .then((res) => {
        toast.error('User has been marked DELETED !', {
          autoClose: 2900,
        });
        setIsModalOpen(false);
        setTimeout(() => {
          window.location.reload(false);
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
        Header: 'NAME',
        accessor: 'userName',
        width: 231,
        sortType: (a, b) => {
          return customSorting(
            a.original.userName,
            b.original.userName
          );
        },
        sticky: 'left',
      },
      {
        Header: 'USER ID/EMAIL ADDRESS',
        accessor: 'userId',
        width: 230,
        sticky: 'left',
        sortType: (a, b) => {
          return customSorting(
            a.original.userId,
            b.original.userId
          );
        },
      },
      {
        Header: 'ROLE',
        accessor: 'role',
        sticky: 'left',
        width: 200,
        sortType: (a, b) => {
          return customSorting(a.original.role, b.original.role);
        },
      },
      {
        Header: 'Practice',
        accessor: 'practice',
        sticky: 'left',
        width: 200,
        sortType: (a, b) => {
          return customSorting(a.original.practice, b.original.practice);
        },
      },
      {
        Header: 'Practice Name',
        accessor: 'practiceName',
        sticky: 'left',
        width: 200,
        sortType: (a, b) => {
          return customSorting(a.original.practiceName, b.original.practiceName);
        },
      },
      {
        Header: 'Date Created',
        accessor: 'createdAt',
        width: 10,
        isVisible: "false"
      },
      {
        Header: 'Password',
        accessor: 'password',
        width: 10,
        isVisible: "false"
      },
      {
        Header: 'Permission Set',
        accessor: 'pset',
        width: 10,
        isVisible: "false"
      },
      {
        Header: 'CONTACT NO',
        accessor: 'contactNumber',
        sticky: 'left',
        width: 200,
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
          <div>
            <img
              className={`p-2 pointer ${row.original.status === 'deleted' ? 'disableEditBtn' : ''
                }`}
              src={Edit}
              alt='Evoke Technologies'
              height='31px'
              onClick={() => {
                getEditForm(row);
              }}
            />
            <img
              className={`p-2 pointer ${row.original.status === 'deleted' ? 'disableDeleteBtn' : ''
                }`}
              src={DeleteImg}
              alt='Evoke Technologies'
              onClick={() => {
                setRowOriginal({
                  ...row.original,
                  deleteReason: '',
                });
                setIsModalOpen(true);
              }}
            />
          </div>
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
    rows: filteredTableData,
  } = useTable(
    {
      columns,
      data: filteredData,
      initialState: {
        pageSize: 5,
        hiddenColumns: ['createdAt', 'password', 'pset', 'practiceName'],
        sortBy: [
          {
            id: 'createdAt',
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
    if (filteredTableData.length && globalFilter && searchValue)
      setFilteredData(addSerialNo(filteredTableData, true));
    else if (searchValue === '')
      setFilteredData(
        addSerialNo(data.filter((item) => item.status !== 'Deleted'))
      );
  }, []);

  return (
    <div class="col-md-12 ms-sm-auto col-lg-12 custom-scroll">
      <br></br>
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

                    return (
                      <td {...cell.getCellProps({ style })}>
                        {cell.render('Cell')}
                      </td>
                    );
                  })}
                </tr>
              );
            }) : <tr style={{ textAlign: 'center' }}><span>No Records found</span></tr>}
          </tbody>
        </table>
        <div className='table-pagination'>
          {!noRecords && <span className='paginate'>
            <b>{start}</b> to <b>{end}</b> of <b>{filteredData.length}</b>
          </span>}
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
          <input className='pagination-search'
            type='number'
            onChange={(e) => {
              const value = e.target.value - 1;
              const enteredInputValue = e.target.value.match(/^([1-9]\d*)?$/)['input'] ? e.target.value : '';
              if (pageOptions.length > value) {
                gotoPage(value);
                setEnteredValue(enteredInputValue);
                setNoRecords(false);
              } else {
                setEnteredValue(e.target.value);
                setNoRecords(true);
              }
            }}
            value={enteredValue}
          />
        </div>
      </div>
    </div>
  );
}

export default CompleteTable;
