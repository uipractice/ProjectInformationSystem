import React, { useState, useEffect } from 'react';
import DeleteImg from '../../../assets/images/delete.svg';
import axios from 'axios';
import Modal from 'react-modal';
import Edit from '../../../assets/images/edit-icon1.svg'
import {
  useTable,
  useSortBy,
  useGlobalFilter,
  usePagination,
} from 'react-table';
import '../../table/table.css';


import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getApiUrl } from '../../utils/helper';
import { exp3 } from '../../constants/regex';
import { addSerialNo } from '../../common/commonFunctions'
import DeleteRow from '../../common/DeleteRow';
import Table from '../../common/Table';

toast.configure();

Modal.setAppElement('#root');

function CompleteTable({ data, getEditForm }) {
  const [filteredData, setFilteredData] = useState([]);
  const searchValue = ''
  const [rowOriginal, setRowOriginal] = useState({});

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [noRecords, setNoRecords] = useState(false);

  useEffect(() => {
    setDefaultUserFilterData();
  }, [data]);

  const setDefaultUserFilterData = () => {
    if (data.length) {
      let filterResult = data.filter((row) => row.status !== 'Deleted');
      setFilteredData(addSerialNo(filterResult));
    }
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

  const { globalFilter } = state;

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
      <DeleteRow
        isModalOpen={isModalOpen}
        setIsModalOpen={() => setIsModalOpen()}
        handleInputChange={(e) => handleInputChange(e)}
        handleUpdateStatus={(e) => handleUpdateStatus(e)}
        deleteReason={rowOriginal.deleteReason}
      />
      <div className='table-responsive grid tableFixHead'>
        <Table
          noRecords={noRecords}
          filteredTableData={filteredTableData}
          columns={columns}
          filteredData={filteredData}
          type={'user'}
          setNoRecords={() => setNoRecords()}
        />
      </div>
    </div>
  );
}

export default CompleteTable;
